'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Template, TemplateSection } from '@/types'

interface TemplateSectionInput {
  id?: string
  title: string
  description: string
  helper_text: string
  is_required: boolean
  order_index: number
}

interface TemplateBuilderProps {
  template?: Template & { sections: TemplateSection[] }
}

const defaultSections: Omit<TemplateSectionInput, 'order_index'>[] = [
  {
    title: 'Project Overview',
    description: 'What is this project about?',
    helper_text: 'Describe the project in a few sentences. What are you trying to achieve?',
    is_required: true,
  },
  {
    title: 'Target Audience',
    description: 'Who is this project for?',
    helper_text: 'Describe your ideal customer or user. Demographics, behaviors, needs.',
    is_required: true,
  },
  {
    title: 'Goals & Objectives',
    description: 'What does success look like?',
    helper_text: 'List specific, measurable goals you want to achieve.',
    is_required: true,
  },
  {
    title: 'Deliverables',
    description: 'What do you need us to create?',
    helper_text: 'List all the assets, materials, or outputs you expect.',
    is_required: true,
  },
  {
    title: 'Timeline',
    description: 'When do you need this completed?',
    helper_text: 'Include any key milestones or hard deadlines.',
    is_required: true,
  },
  {
    title: 'Budget',
    description: 'What is your budget range?',
    helper_text: 'Provide a range or maximum budget for this project.',
    is_required: false,
  },
  {
    title: 'Brand Guidelines',
    description: 'Do you have existing brand guidelines?',
    helper_text: 'Share any colors, fonts, tone of voice, or style requirements.',
    is_required: false,
  },
]

export function TemplateBuilder({ template }: TemplateBuilderProps) {
  const router = useRouter()
  const [name, setName] = useState(template?.name || '')
  const [description, setDescription] = useState(template?.description || '')
  const [sections, setSections] = useState<TemplateSectionInput[]>(
    template?.sections.map((s, i) => ({
      id: s.id,
      title: s.title,
      description: s.description || '',
      helper_text: s.helper_text || '',
      is_required: s.is_required,
      order_index: i,
    })) || defaultSections.map((s, i) => ({ ...s, order_index: i }))
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function addSection() {
    setSections([
      ...sections,
      {
        title: '',
        description: '',
        helper_text: '',
        is_required: true,
        order_index: sections.length,
      },
    ])
  }

  function updateSection(index: number, field: keyof TemplateSectionInput, value: string | boolean) {
    const updated = [...sections]
    updated[index] = { ...updated[index], [field]: value }
    setSections(updated)
  }

  function removeSection(index: number) {
    setSections(sections.filter((_, i) => i !== index).map((s, i) => ({ ...s, order_index: i })))
  }

  function moveSection(index: number, direction: 'up' | 'down') {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === sections.length - 1)
    ) {
      return
    }
    const newIndex = direction === 'up' ? index - 1 : index + 1
    const updated = [...sections]
    const temp = updated[index]
    updated[index] = updated[newIndex]
    updated[newIndex] = temp
    setSections(updated.map((s, i) => ({ ...s, order_index: i })))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const url = template ? `/api/templates/${template.id}` : '/api/templates'
      const method = template ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, sections }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save template')
      }

      router.push('/templates')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="p-4 text-[var(--coral)] bg-red-50 border border-[var(--coral)]">{error}</div>
      )}

      <div className="bg-white border border-[var(--black)]">
        <div className="border-b border-[var(--black)] p-6">
          <h2 className="headline-md">Template Details</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="nav-label text-[var(--black)]">Template Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Website Redesign Brief"
              className="editorial-input"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="nav-label text-[var(--black)]">Description (optional)</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this template for?"
              rows={2}
              className="w-full bg-transparent border-b border-[var(--black)] p-3 font-body text-base focus:outline-none focus:border-[var(--coral)] resize-none"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="headline-md">Sections</h2>
          <button type="button" className="btn-secondary" onClick={addSection}>
            Add Section
          </button>
        </div>

        {sections.map((section, index) => (
          <div key={index} className="bg-white border border-[var(--black)]">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <span className="label-tag">
                  Section {index + 1}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => moveSection(index, 'up')}
                    disabled={index === 0}
                    className="w-8 h-8 border border-[var(--black)] text-[var(--black)] hover:bg-[var(--black)] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSection(index, 'down')}
                    disabled={index === sections.length - 1}
                    className="w-8 h-8 border border-[var(--black)] text-[var(--black)] hover:bg-[var(--black)] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    className="px-3 h-8 border border-[var(--coral)] text-[var(--coral)] hover:bg-[var(--coral)] hover:text-white transition-colors text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="nav-label text-[var(--black)]">Section Title</label>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSection(index, 'title', e.target.value)}
                    placeholder="e.g., Project Goals"
                    className="editorial-input"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="nav-label text-[var(--black)]">Question for Client</label>
                  <input
                    type="text"
                    value={section.description}
                    onChange={(e) => updateSection(index, 'description', e.target.value)}
                    placeholder="e.g., What are you trying to achieve?"
                    className="editorial-input"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="nav-label text-[var(--black)]">Helper Text</label>
                  <textarea
                    value={section.helper_text}
                    onChange={(e) => updateSection(index, 'helper_text', e.target.value)}
                    placeholder="Provide guidance to help the client answer"
                    rows={2}
                    className="w-full bg-transparent border-b border-[var(--black)] p-3 font-body text-base focus:outline-none focus:border-[var(--coral)] resize-none"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={`required-${index}`}
                    checked={section.is_required}
                    onChange={(e) => updateSection(index, 'is_required', e.target.checked)}
                    className="w-5 h-5 border-2 border-[var(--black)] accent-[var(--coral)]"
                  />
                  <label htmlFor={`required-${index}`} className="font-body text-sm text-[var(--black)]">Required section</label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 pt-4 border-t border-[var(--black)]">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : template ? 'Update Template' : 'Create Template'}
        </button>
        <button type="button" className="btn-secondary" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  )
}
