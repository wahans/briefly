import { TemplateBuilder } from '@/components/template-builder'

export default function NewTemplatePage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="headline-lg">Create Template</h1>
        <p className="text-[var(--gray)] mt-2">
          Build a questionnaire template for your clients
        </p>
      </div>
      <TemplateBuilder />
    </div>
  )
}
