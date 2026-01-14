import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

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

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    approved: 'bg-purple-100 text-purple-800',
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Briefs</h1>
          <p className="text-gray-600 mt-1">Track and manage client briefs</p>
        </div>
        <Link href="/briefs/new">
          <Button>Send New Brief</Button>
        </Link>
      </div>

      {briefs && briefs.length > 0 ? (
        <div className="space-y-4">
          {briefs.map((brief) => (
            <Link key={brief.id} href={`/briefs/${brief.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900">
                          {brief.project_name}
                        </h3>
                        <Badge className={statusColors[brief.status] || ''}>
                          {brief.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        {brief.client_name} ({brief.client_email})
                      </p>
                      <p className="text-xs text-gray-400">
                        Template: {(brief.template as { name: string } | null)?.name || 'None'} &middot;
                        Sent {new Date(brief.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-gray-400">→</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-16 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No briefs yet</h3>
            <p className="text-gray-500 mb-4">
              Send your first brief to a client to get started
            </p>
            <Link href="/briefs/new">
              <Button>Send Brief</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
