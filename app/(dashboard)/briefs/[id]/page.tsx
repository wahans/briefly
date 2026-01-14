import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    approved: 'bg-purple-100 text-purple-800',
  }

  const template = brief.template as { name: string; sections: TemplateSection[] } | null
  const sections = template?.sections?.sort((a, b) => a.order_index - b.order_index) || []
  const responses = brief.responses as BriefResponse[]

  const questionnaireUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/respond/${brief.access_token}`

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{brief.project_name}</h1>
            <Badge className={statusColors[brief.status] || ''}>
              {brief.status.replace('_', ' ')}
            </Badge>
          </div>
          <p className="text-gray-600">
            Client: {brief.client_name} ({brief.client_email})
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Template: {template?.name || 'None'} &middot;
            Sent {new Date(brief.created_at).toLocaleDateString()}
          </p>
        </div>
        <Link href="/briefs">
          <Button variant="outline">Back to Briefs</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Questionnaire Link</CardTitle>
          <CardDescription>Share this link with your client</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <code className="flex-1 p-3 bg-gray-100 rounded text-sm break-all">
              {questionnaireUrl}
            </code>
            <Button
              variant="outline"
              onClick={() => navigator.clipboard.writeText(questionnaireUrl)}
            >
              Copy
            </Button>
          </div>
        </CardContent>
      </Card>

      {responses.length > 0 ? (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Brief Content</h2>

          {brief.generated_content?.summary && (
            <Card>
              <CardHeader>
                <CardTitle>Executive Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {brief.generated_content.summary}
                </p>
              </CardContent>
            </Card>
          )}

          {sections.map((section) => {
            const response = responses.find(r => r.section_id === section.id)
            if (!response) return null

            return (
              <Card key={section.id}>
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Client&apos;s Answer
                    </p>
                    <p className="text-gray-700">{response.client_answer}</p>
                  </div>
                  {response.ai_expanded && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        AI-Enhanced Brief Content
                      </p>
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {response.ai_expanded}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="py-16 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Waiting for client response
            </h3>
            <p className="text-gray-500">
              Your client hasn&apos;t started the questionnaire yet
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
