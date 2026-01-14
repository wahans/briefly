'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { Template } from '@/types'

export default function NewBriefPage() {
  const router = useRouter()
  const [templates, setTemplates] = useState<Template[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [projectName, setProjectName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/templates')
      .then(res => res.json())
      .then(data => setTemplates(data))
      .catch(console.error)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/briefs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          template_id: selectedTemplate,
          client_name: clientName,
          client_email: clientEmail,
          project_name: projectName,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create brief')
      }

      const brief = await res.json()

      // Send the email
      await fetch(`/api/briefs/${brief.id}/send`, { method: 'POST' })

      router.push('/briefs')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-10 max-w-2xl">
      <div>
        <h1 className="headline-lg">Send New Brief</h1>
        <p className="text-[var(--gray)] mt-2">
          Send a questionnaire to your client
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white border border-[var(--black)]">
          <div className="border-b border-[var(--black)] p-6">
            <h2 className="headline-md">Brief Details</h2>
            <p className="text-[var(--gray)] mt-1">
              Enter client information and select a template
            </p>
          </div>
          <div className="p-6 space-y-6">
            {error && (
              <div className="p-4 text-[var(--coral)] bg-red-50 border border-[var(--coral)]">{error}</div>
            )}

            <div className="space-y-2">
              <label htmlFor="template" className="nav-label text-[var(--black)]">Template</label>
              <select
                id="template"
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full h-12 px-4 border border-[var(--black)] bg-white text-sm font-body focus:outline-none focus:border-[var(--coral)]"
                required
              >
                <option value="">Select a template...</option>
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
              {templates.length === 0 && (
                <p className="text-sm text-[var(--coral)]">
                  No templates found. Create a template first.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="projectName" className="nav-label text-[var(--black)]">Project Name</label>
              <input
                id="projectName"
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., Website Redesign 2024"
                className="editorial-input"
                required
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="clientName" className="nav-label text-[var(--black)]">Client Name</label>
                <input
                  id="clientName"
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="John Smith"
                  className="editorial-input"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="clientEmail" className="nav-label text-[var(--black)]">Client Email</label>
                <input
                  id="clientEmail"
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="john@company.com"
                  className="editorial-input"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t border-[var(--black)]">
              <button
                type="submit"
                disabled={loading || templates.length === 0}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Brief'}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => router.back()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
