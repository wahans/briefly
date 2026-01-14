import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('templates')
    .select(`*, sections:template_sections(*)`)
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(data)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { name, description, sections } = body

  // Update template
  const { error: templateError } = await supabase
    .from('templates')
    .update({ name, description })
    .eq('id', id)
    .eq('user_id', user.id)

  if (templateError) {
    return NextResponse.json({ error: templateError.message }, { status: 500 })
  }

  // Delete existing sections and recreate
  await supabase.from('template_sections').delete().eq('template_id', id)

  if (sections && sections.length > 0) {
    const sectionsToInsert = sections.map((section: {
      title: string
      description: string
      helper_text: string
      is_required: boolean
      order_index: number
    }) => ({
      template_id: id,
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
      return NextResponse.json({ error: sectionsError.message }, { status: 500 })
    }
  }

  return NextResponse.json({ success: true })
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { error } = await supabase
    .from('templates')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
