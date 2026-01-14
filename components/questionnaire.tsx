'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { TemplateSection, BriefResponse } from '@/types'

interface QuestionnaireProps {
  briefId: string
  accessToken: string
  projectName: string
  sections: TemplateSection[]
  existingResponses: BriefResponse[]
}

export function Questionnaire({
  briefId,
  accessToken,
  projectName,
  sections,
  existingResponses,
}: QuestionnaireProps) {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(() => {
    // Start from first unanswered section
    const answeredIds = new Set(existingResponses.map(r => r.section_id))
    const firstUnanswered = sections.findIndex(s => !answeredIds.has(s.id))
    return firstUnanswered === -1 ? sections.length : firstUnanswered
  })
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [responses, setResponses] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {}
    existingResponses.forEach(r => {
      map[r.section_id] = r.client_answer
    })
    return map
  })

  const currentSection = sections[currentIndex]
  const isComplete = currentIndex >= sections.length
  const progress = Math.round((Object.keys(responses).length / sections.length) * 100)

  async function handleNext() {
    if (!currentSection) return
    if (!answer.trim() && currentSection.is_required) {
      setError('This section requires an answer')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/respond/${accessToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section_id: currentSection.id,
          answer: answer.trim(),
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save response')
      }

      setResponses(prev => ({ ...prev, [currentSection.id]: answer.trim() }))
      setAnswer('')
      setCurrentIndex(prev => prev + 1)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function handleComplete() {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brief_id: briefId }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to generate brief')
      }

      router.push(`/review/${accessToken}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  function handleBack() {
    if (currentIndex > 0) {
      const prevSection = sections[currentIndex - 1]
      setAnswer(responses[prevSection.id] || '')
      setCurrentIndex(prev => prev - 1)
    }
  }

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Almost done!</CardTitle>
            <CardDescription>
              You&apos;ve answered all the questions. Click below to generate your brief.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <div className="p-4 text-red-600 bg-red-50 rounded-lg">{error}</div>
            )}

            <div className="bg-gray-100 rounded-lg p-4 space-y-2">
              <h3 className="font-medium">Your Answers</h3>
              {sections.map((section) => (
                <div key={section.id} className="text-sm">
                  <span className="font-medium">{section.title}:</span>{' '}
                  <span className="text-gray-600">
                    {responses[section.id]?.slice(0, 100)}
                    {(responses[section.id]?.length || 0) > 100 ? '...' : ''}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setCurrentIndex(0)}
                disabled={loading}
              >
                Review Answers
              </Button>
              <Button onClick={handleComplete} disabled={loading} className="flex-1">
                {loading ? 'Generating Brief...' : 'Generate Brief'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{projectName}</span>
            <span>{progress}% complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <Card>
          <CardHeader>
            <div className="text-sm text-gray-500 mb-2">
              Question {currentIndex + 1} of {sections.length}
            </div>
            <CardTitle className="text-xl">{currentSection.title}</CardTitle>
            {currentSection.description && (
              <CardDescription className="text-base">
                {currentSection.description}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {currentSection.helper_text && (
              <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
                💡 {currentSection.helper_text}
              </div>
            )}

            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                {error}
              </div>
            )}

            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              rows={6}
              className="text-base"
              autoFocus
            />

            {!currentSection.is_required && (
              <p className="text-sm text-gray-500">This question is optional</p>
            )}

            <div className="flex gap-4 pt-4">
              {currentIndex > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={loading}
                >
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Saving...' : currentIndex === sections.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
