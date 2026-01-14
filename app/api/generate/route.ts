import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { generateBriefSummary } from '@/lib/anthropic'

export async function POST(request: Request) {
  const supabase = createAdminClient()
  const body = await request.json()
  const { brief_id } = body

  if (!brief_id) {
    return NextResponse.json({ error: 'Missing brief_id' }, { status: 400 })
  }

  // Get brief with responses
  const { data: brief } = await supabase
    .from('briefs')
    .select(`
      *,
      template:templates(
        sections:template_sections(*)
      ),
      responses:brief_responses(*)
    `)
    .eq('id', brief_id)
    .single()

  if (!brief) {
    return NextResponse.json({ error: 'Brief not found' }, { status: 404 })
  }

  const template = brief.template as { sections: { id: string; title: string; order_index: number }[] } | null
  const responses = brief.responses as { section_id: string; ai_expanded: string }[]

  if (!template || !responses.length) {
    return NextResponse.json({ error: 'No responses to generate from' }, { status: 400 })
  }

  // Build sections content for summary
  const sortedSections = template.sections.sort((a, b) => a.order_index - b.order_index)
  const sectionsWithContent = sortedSections
    .map(section => {
      const response = responses.find(r => r.section_id === section.id)
      if (!response) return null
      return {
        title: section.title,
        content: response.ai_expanded || '',
      }
    })
    .filter(Boolean) as { title: string; content: string }[]

  // Generate executive summary
  let summary = ''
  try {
    summary = await generateBriefSummary(brief.project_name, sectionsWithContent)
  } catch (error) {
    console.error('Summary generation failed:', error)
  }

  // Update brief with generated content and status
  const { error: updateError } = await supabase
    .from('briefs')
    .update({
      status: 'completed',
      completed_at: new Date().toISOString(),
      generated_content: { summary },
    })
    .eq('id', brief_id)

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
