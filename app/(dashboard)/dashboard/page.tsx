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

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    approved: 'bg-purple-100 text-purple-800',
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back to Briefly</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Templates</CardDescription>
            <CardTitle className="text-4xl">{templateCount || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/templates">
              <Button variant="link" className="p-0 h-auto">
                View templates
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Briefs</CardDescription>
            <CardTitle className="text-4xl">{briefCount || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/briefs">
              <Button variant="link" className="p-0 h-auto">
                View briefs
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Quick Actions</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Link href="/templates/new">
              <Button className="w-full">New Template</Button>
            </Link>
            <Link href="/briefs/new">
              <Button variant="outline" className="w-full">Send Brief</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Briefs</CardTitle>
          <CardDescription>Track your latest client briefs</CardDescription>
        </CardHeader>
        <CardContent>
          {recentBriefs && recentBriefs.length > 0 ? (
            <div className="space-y-4">
              {recentBriefs.map((brief) => (
                <Link
                  key={brief.id}
                  href={`/briefs/${brief.id}`}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900">{brief.project_name}</p>
                    <p className="text-sm text-gray-500">
                      {brief.client_name} &middot; {(brief.template as { name: string } | null)?.name || 'No template'}
                    </p>
                  </div>
                  <Badge className={statusColors[brief.status] || ''}>
                    {brief.status.replace('_', ' ')}
                  </Badge>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No briefs yet</p>
              <Link href="/briefs/new">
                <Button variant="link">Send your first brief</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
