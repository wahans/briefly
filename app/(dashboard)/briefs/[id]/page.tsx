import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { CopyLinkButton } from '@/components/copy-link-button'
import type { TemplateSection, BriefResponse } from '@/types'

export default async function BriefDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

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
    .eq('id', id)
    .eq('user_id', user!.id)
    .single()

  if (!brief) {
    notFound()
  }

  const statusStyles: Record<string, string> = {
    pending: 'bg-[var(--gray)]',
    in_progress: 'bg-[var(--coral)]',
    completed: 'bg-[var(--black)]',
    approved: 'bg-green-600',
  }

  const template = brief.template as { name: string; sections: TemplateSection[] } | null
  const sections = template?.sections?.sort((a, b) => a.order_index - b.order_index) || []
  const responses = brief.responses as BriefResponse[]

  const questionnaireUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/respond/${brief.access_token}`

  return (
    <div className="space-y-10">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <h1 className="headline-lg">{brief.project_name}</h1>
            <span className={`label-tag ${statusStyles[brief.status] || 'bg-[var(--gray)]'}`}>
              {brief.status.replace('_', ' ')}
            </span>
          </div>
          <p className="text-[var(--black)]">
            Client: <span className="font-medium">{brief.client_name}</span> ({brief.client_email})
          </p>
          <p className="text-sm text-[var(--gray)] mt-1">
            Template: {template?.name || 'None'} · Sent {new Date(brief.created_at).toLocaleDateString()}
          </p>
        </div>
        <Link href="/briefs">
          <button className="btn-secondary">Back to Briefs</button>
        </Link>
      </div>

      <div className="bg-white border border-[var(--black)]">
        <div className="border-b border-[var(--black)] p-6">
          <h2 className="headline-md">Questionnaire Link</h2>
          <p className="text-[var(--gray)] mt-1">Share this link with your client</p>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4">
            <code className="flex-1 p-4 bg-[var(--cream)] border border-[var(--black)] text-sm break-all font-mono">
              {questionnaireUrl}
            </code>
            <CopyLinkButton url={questionnaireUrl} />
          </div>
        </div>
      </div>

      {responses.length > 0 ? (
        <div className="space-y-8">
          <h2 className="headline-md">Brief Content</h2>

          {brief.generated_content?.summary && (
            <div className="bg-[var(--black)] text-white p-8">
              <p className="nav-label text-gray-400 mb-4">Executive Summary</p>
              <p className="text-lg leading-relaxed whitespace-pre-wrap">
                {brief.generated_content.summary}
              </p>
            </div>
          )}

          {sections.map((section) => {
            const response = responses.find(r => r.section_id === section.id)
            if (!response) return null

            return (
              <div key={section.id} className="bg-white border border-[var(--black)]">
                <div className="border-b border-[var(--black)] p-6">
                  <h3 className="font-editorial text-xl">{section.title}</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <p className="nav-label text-[var(--gray)] mb-2">
                      Client&apos;s Answer
                    </p>
                    <p className="text-[var(--black)]">{response.client_answer}</p>
                  </div>
                  {response.ai_expanded && (
                    <div className="pt-6 border-t border-[var(--black)]">
                      <p className="nav-label text-[var(--coral)] mb-2">
                        AI-Enhanced Brief Content
                      </p>
                      <p className="text-[var(--black)] whitespace-pre-wrap leading-relaxed">
                        {response.ai_expanded}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white border border-[var(--black)] py-16 text-center">
          <h3 className="headline-md mb-2">
            Waiting for client response
          </h3>
          <p className="text-[var(--gray)]">
            Your client hasn&apos;t started the questionnaire yet
          </p>
        </div>
      )}
    </div>
  )
}
