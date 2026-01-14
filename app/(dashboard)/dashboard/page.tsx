import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [
    { count: templateCount },
    { count: briefCount },
    { data: recentBriefs }
  ] = await Promise.all([
    supabase.from('templates').select('*', { count: 'exact', head: true }).eq('user_id', user!.id),
    supabase.from('briefs').select('*', { count: 'exact', head: true }).eq('user_id', user!.id),
    supabase
      .from('briefs')
      .select('*, template:templates(name)')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false })
      .limit(5)
  ])

  const statusStyles: Record<string, string> = {
    pending: 'bg-[var(--gray)] text-white',
    in_progress: 'bg-[var(--coral)] text-white',
    completed: 'bg-[var(--black)] text-white',
    approved: 'bg-green-600 text-white',
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="headline-lg">Dashboard</h1>
        <p className="text-[var(--gray)] mt-2 font-body">Welcome back to Briefly</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white border border-[var(--black)] p-6">
          <p className="nav-label text-[var(--gray)] mb-2">Templates</p>
          <p className="font-editorial text-5xl text-[var(--black)]">{templateCount || 0}</p>
          <Link href="/templates" className="text-link text-sm mt-4 inline-block">
            View templates →
          </Link>
        </div>

        <div className="bg-white border border-[var(--black)] p-6">
          <p className="nav-label text-[var(--gray)] mb-2">Total Briefs</p>
          <p className="font-editorial text-5xl text-[var(--black)]">{briefCount || 0}</p>
          <Link href="/briefs" className="text-link text-sm mt-4 inline-block">
            View briefs →
          </Link>
        </div>

        <div className="bg-[var(--black)] p-6 text-white">
          <p className="nav-label text-gray-400 mb-4">Quick Actions</p>
          <div className="flex flex-col gap-3">
            <Link href="/templates/new">
              <button className="btn-primary w-full">New Template</button>
            </Link>
            <Link href="/briefs/new">
              <button className="w-full bg-transparent border border-white text-white font-body text-[13px] font-medium uppercase tracking-wider py-3.5 px-7 hover:bg-white hover:text-[var(--black)] transition-colors">
                Send Brief
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[var(--black)]">
        <div className="border-b border-[var(--black)] p-6">
          <h2 className="headline-md">Recent Briefs</h2>
          <p className="text-[var(--gray)] mt-1">Track your latest client briefs</p>
        </div>
        <div className="p-6">
          {recentBriefs && recentBriefs.length > 0 ? (
            <div className="space-y-4">
              {recentBriefs.map((brief) => (
                <Link
                  key={brief.id}
                  href={`/briefs/${brief.id}`}
                  className="flex items-center justify-between p-4 border border-[var(--black)] hover:bg-[var(--cream)] transition-colors"
                >
                  <div>
                    <p className="font-medium text-[var(--black)]">{brief.project_name}</p>
                    <p className="text-sm text-[var(--gray)]">
                      {brief.client_name} · {(brief.template as { name: string } | null)?.name || 'No template'}
                    </p>
                  </div>
                  <span className={`label-tag ${statusStyles[brief.status] || 'bg-[var(--gray)]'}`}>
                    {brief.status.replace('_', ' ')}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[var(--gray)] mb-4">No briefs yet</p>
              <Link href="/briefs/new">
                <button className="btn-primary">Send your first brief</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
