import { notFound, redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { Questionnaire } from '@/components/questionnaire'
import type { TemplateSection, BriefResponse } from '@/types'

export default async function RespondPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const supabase = createAdminClient()

  const { data: brief } = await supabase
    .from('briefs')
    .select(`
      *,
      template:templates(
        name,
        sections:template_sections(*)
      ),
      responses:brief_responses(*)
    `)
    .eq('access_token', token)
    .single()

  if (!brief) {
    notFound()
  }

  // If already approved, redirect to review page
  if (brief.status === 'approved') {
    redirect(`/review/${token}`)
  }

  const template = brief.template as {
    name: string
    sections: TemplateSection[]
  } | null

  if (!template || !template.sections.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Template not available
          </h1>
          <p className="text-gray-600">
            This brief&apos;s template is no longer available.
          </p>
        </div>
      </div>
    )
  }

  const sortedSections = template.sections.sort(
    (a, b) => a.order_index - b.order_index
  )

  // Update brief status to in_progress if it's pending
  if (brief.status === 'pending') {
    await supabase
      .from('briefs')
      .update({ status: 'in_progress' })
      .eq('id', brief.id)
  }

  return (
    <Questionnaire
      briefId={brief.id}
      accessToken={token}
      projectName={brief.project_name}
      sections={sortedSections}
      existingResponses={(brief.responses as BriefResponse[]) || []}
    />
  )
}
