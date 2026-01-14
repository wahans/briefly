'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { TemplateSection, BriefResponse } from '@/types'

interface BriefReviewProps {
  brief: {
    id: string
    projectName: string
    clientName: string
    status: string
    summary: string
    approvedAt: string | null
  }
  accessToken: string
  sections: TemplateSection[]
  responses: BriefResponse[]
}

export function BriefReview({
  brief,
  accessToken,
  sections,
  responses,
}: BriefReviewProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isApproved = brief.status === 'approved'

  async function handleApprove() {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/approve/${accessToken}`, {
        method: 'POST',
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to approve brief')
      }

      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">{brief.projectName}</h1>
          <p className="text-gray-600 mt-1">Creative Brief for Review</p>
          {isApproved && (
            <Badge className="mt-4 bg-green-100 text-green-800">
              Approved on {new Date(brief.approvedAt!).toLocaleDateString()}
            </Badge>
          )}
        </div>

        {error && (
          <div className="p-4 text-red-600 bg-red-50 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Executive Summary */}
        {brief.summary && (
          <Card>
            <CardHeader>
              <CardTitle>Executive Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {brief.summary}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section) => {
            const response = responses.find((r) => r.section_id === section.id)
            if (!response) return null

            return (
              <Card key={section.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                  {section.description && (
                    <CardDescription>{section.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {response.ai_expanded ? (
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {response.ai_expanded}
                    </p>
                  ) : (
                    <p className="text-gray-700">{response.client_answer}</p>
                  )}

                  <details className="text-sm">
                    <summary className="cursor-pointer text-gray-500 hover:text-gray-700">
                      View original answer
                    </summary>
                    <p className="mt-2 p-3 bg-gray-50 rounded text-gray-600">
                      {response.client_answer}
                    </p>
                  </details>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Approval section */}
        {!isApproved && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle>Ready to Approve?</CardTitle>
              <CardDescription>
                Review the brief above. Once approved, the agency will be notified
                and can begin work on your project.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Button
                onClick={() => router.push(`/respond/${accessToken}`)}
                variant="outline"
                disabled={loading}
              >
                Edit Answers
              </Button>
              <Button onClick={handleApprove} disabled={loading} className="flex-1">
                {loading ? 'Approving...' : 'Approve Brief'}
              </Button>
            </CardContent>
          </Card>
        )}

        {isApproved && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="py-6 text-center">
              <h3 className="text-lg font-medium text-green-800 mb-2">
                Brief Approved!
              </h3>
              <p className="text-green-700">
                Thank you! The agency has been notified and will be in touch soon.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
