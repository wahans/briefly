import { TemplateBuilder } from '@/components/template-builder'

export default function NewTemplatePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create Template</h1>
        <p className="text-gray-600 mt-1">
          Build a questionnaire template for your clients
        </p>
      </div>
      <TemplateBuilder />
    </div>
  )
}
