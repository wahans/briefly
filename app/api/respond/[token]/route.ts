import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { expandBriefAnswer } from '@/lib/anthropic'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params
  const supabase = createAdminClient()

  // Get brief by token
  const { data: brief } = await supabase
    .from('briefs')
    .select('id, project_name, status')
    .eq('access_token', token)
    .single()

  if (!brief) {
    return NextResponse.json({ error: 'Brief not found' }, { status: 404 })
  }

  if (brief.status === 'approved') {
    return NextResponse.json({ error: 'Brief already approved' }, { status: 400 })
  }

  const body = await request.json()
  const { section_id, answer } = body

  if (!section_id || !answer) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Get section info
  const { data: section } = await supabase
    .from('template_sections')
    .select('title, description')
    .eq('id', section_id)
    .single()

  if (!section) {
    return NextResponse.json({ error: 'Section not found' }, { status: 404 })
  }

  // AI expand the answer
  let ai_expanded: string | null = null
  try {
    ai_expanded = await expandBriefAnswer(
      section.title,
      section.description,
      answer,
      brief.project_name
    )
  } catch (error) {
    console.error('AI expansion failed:', error)
    // Continue without AI expansion
  }

  // Check if response already exists
  const { data: existingResponse } = await supabase
    .from('brief_responses')
    .select('id')
    .eq('brief_id', brief.id)
    .eq('section_id', section_id)
    .single()

  if (existingResponse) {
    // Update existing response
    const { error } = await supabase
      .from('brief_responses')
      .update({
        client_answer: answer,
        ai_expanded,
      })
      .eq('id', existingResponse.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  } else {
    // Create new response
    const { error } = await supabase
      .from('brief_responses')
      .insert({
        brief_id: brief.id,
        section_id,
        client_answer: answer,
        ai_expanded,
      })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }

  return NextResponse.json({ success: true })
}
