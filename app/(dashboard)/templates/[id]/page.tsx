import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { TemplateBuilder } from '@/components/template-builder'
import type { Template, TemplateSection } from '@/types'

export default async function EditTemplatePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: template } = await supabase
    .from('templates')
    .select(`
      *,
      sections:template_sections(*)
    `)
    .eq('id', id)
    .eq('user_id', user!.id)
    .single()

  if (!template) {
    notFound()
  }

  const sortedSections = (template.sections as TemplateSection[]).sort(
    (a, b) => a.order_index - b.order_index
  )

  return (
    <div className="space-y-10">
      <div>
        <h1 className="headline-lg">Edit Template</h1>
        <p className="text-[var(--gray)] mt-2">Update your questionnaire template</p>
      </div>
      <TemplateBuilder
        template={{
          ...(template as Template),
          sections: sortedSections,
        }}
      />
    </div>
  )
}
