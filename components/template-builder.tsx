'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
        <div className="p-4 text-red-600 bg-red-50 rounded-lg">{error}</div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Template Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Template Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Website Redesign Brief"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this template for?"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Sections</h2>
          <Button type="button" variant="outline" onClick={addSection}>
            Add Section
          </Button>
        </div>

        {sections.map((section, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">
                  Section {index + 1}
                </span>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveSection(index, 'up')}
                    disabled={index === 0}
                  >
                    ↑
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveSection(index, 'down')}
                    disabled={index === sections.length - 1}
                  >
                    ↓
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSection(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Section Title</Label>
                  <Input
                    value={section.title}
                    onChange={(e) => updateSection(index, 'title', e.target.value)}
                    placeholder="e.g., Project Goals"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Question for Client</Label>
                  <Input
                    value={section.description}
                    onChange={(e) => updateSection(index, 'description', e.target.value)}
                    placeholder="e.g., What are you trying to achieve?"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Helper Text</Label>
                  <Textarea
                    value={section.helper_text}
                    onChange={(e) => updateSection(index, 'helper_text', e.target.value)}
                    placeholder="Provide guidance to help the client answer"
                    rows={2}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`required-${index}`}
                    checked={section.is_required}
                    onChange={(e) => updateSection(index, 'is_required', e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor={`required-${index}`}>Required section</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : template ? 'Update Template' : 'Create Template'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
