import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('templates')
    .select(`*, sections:template_sections(*)`)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { name, description, sections } = body

  // Create template
  const { data: template, error: templateError } = await supabase
    .from('templates')
    .insert({
      user_id: user.id,
      name,
      description,
    })
    .select()
    .single()

  if (templateError) {
    return NextResponse.json({ error: templateError.message }, { status: 500 })
  }

  // Create sections
  if (sections && sections.length > 0) {
    const sectionsToInsert = sections.map((section: {
      title: string
      description: string
      helper_text: string
      is_required: boolean
      order_index: number
    }) => ({
      template_id: template.id,
      title: section.title,
      description: section.description,
      helper_text: section.helper_text,
      is_required: section.is_required,
      order_index: section.order_index,
    }))

    const { error: sectionsError } = await supabase
      .from('template_sections')
      .insert(sectionsToInsert)

    if (sectionsError) {
      // Rollback template creation
      await supabase.from('templates').delete().eq('id', template.id)
      return NextResponse.json({ error: sectionsError.message }, { status: 500 })
    }
  }

  return NextResponse.json(template, { status: 201 })
}
