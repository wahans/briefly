import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function BriefsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: briefs } = await supabase
    .from('briefs')
    .select(`
      *,
      template:templates(name)
    `)
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  const statusStyles: Record<string, string> = {
    pending: 'bg-[var(--gray)]',
    in_progress: 'bg-[var(--coral)]',
    completed: 'bg-[var(--black)]',
    approved: 'bg-green-600',
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="headline-lg">Briefs</h1>
          <p className="text-[var(--gray)] mt-2">Track and manage client briefs</p>
        </div>
        <Link href="/briefs/new">
          <button className="btn-primary">Send New Brief</button>
        </Link>
      </div>

      {briefs && briefs.length > 0 ? (
        <div className="space-y-4">
          {briefs.map((brief) => (
            <Link key={brief.id} href={`/briefs/${brief.id}`}>
              <div className="bg-white border border-[var(--black)] p-6 hover:bg-[var(--cream)] transition-colors group">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <h3 className="font-editorial text-xl text-[var(--black)] group-hover:text-[var(--coral)] transition-colors">
                        {brief.project_name}
                      </h3>
                      <span className={`label-tag ${statusStyles[brief.status] || 'bg-[var(--gray)]'}`}>
                        {brief.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--black)]">
                      {brief.client_name} <span className="text-[var(--gray)]">({brief.client_email})</span>
                    </p>
                    <p className="text-xs text-[var(--gray)]">
                      Template: {(brief.template as { name: string } | null)?.name || 'None'} · Sent {new Date(brief.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-[var(--coral)] text-2xl font-editorial">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[var(--black)] py-16 text-center">
          <h3 className="headline-md mb-2">No briefs yet</h3>
          <p className="text-[var(--gray)] mb-6">
            Send your first brief to a client to get started
          </p>
          <Link href="/briefs/new">
            <button className="btn-primary">Send Brief</button>
          </Link>
        </div>
      )}
    </div>
  )
}
