import { notFound, redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { BriefReview } from '@/components/brief-review'
import type { TemplateSection, BriefResponse } from '@/types'

export default async function ReviewPage({
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

  // If not completed yet, redirect to questionnaire
  if (brief.status === 'pending' || brief.status === 'in_progress') {
    redirect(`/respond/${token}`)
  }

  const template = brief.template as {
    name: string
    sections: TemplateSection[]
  } | null

  const sortedSections = template?.sections?.sort(
    (a, b) => a.order_index - b.order_index
  ) || []

  return (
    <BriefReview
      brief={{
        id: brief.id,
        projectName: brief.project_name,
        clientName: brief.client_name,
        status: brief.status,
        summary: (brief.generated_content as { summary?: string })?.summary || '',
        approvedAt: brief.approved_at,
      }}
      accessToken={token}
      sections={sortedSections}
      responses={(brief.responses as BriefResponse[]) || []}
    />
  )
}
