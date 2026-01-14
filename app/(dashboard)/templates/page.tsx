import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function TemplatesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: templates } = await supabase
    .from('templates')
    .select(`
      *,
      sections:template_sections(count)
    `)
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="headline-lg">Templates</h1>
          <p className="text-[var(--gray)] mt-2">Create and manage your brief templates</p>
        </div>
        <Link href="/templates/new">
          <button className="btn-primary">New Template</button>
        </Link>
      </div>

      {templates && templates.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Link key={template.id} href={`/templates/${template.id}`}>
              <div className="bg-white border border-[var(--black)] p-6 h-full hover:bg-[var(--cream)] transition-colors group">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-editorial text-xl text-[var(--black)] group-hover:text-[var(--coral)] transition-colors">
                    {template.name}
                  </h3>
                  <span className="label-tag">
                    {(template.sections as { count: number }[])?.[0]?.count || 0}
                  </span>
                </div>
                <p className="text-[var(--gray)] text-sm mb-4">
                  {template.description || 'No description'}
                </p>
                <p className="text-xs text-[var(--gray)] border-t border-[var(--black)] pt-4 mt-auto">
                  Created {new Date(template.created_at).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[var(--black)] py-16 text-center">
          <h3 className="headline-md mb-2">No templates yet</h3>
          <p className="text-[var(--gray)] mb-6">
            Create your first template to start collecting briefs
          </p>
          <Link href="/templates/new">
            <button className="btn-primary">Create Template</button>
          </Link>
        </div>
      )}
    </div>
  )
}
