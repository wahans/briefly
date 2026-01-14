import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendBriefCompleteNotification } from '@/lib/resend'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params
  const supabase = createAdminClient()

  // Get brief with user info
  const { data: brief } = await supabase
    .from('briefs')
    .select(`
      *,
      profile:profiles(email, agency_name)
    `)
    .eq('access_token', token)
    .single()

  if (!brief) {
    return NextResponse.json({ error: 'Brief not found' }, { status: 404 })
  }

  if (brief.status === 'approved') {
    return NextResponse.json({ error: 'Brief already approved' }, { status: 400 })
  }

  if (brief.status !== 'completed') {
    return NextResponse.json({ error: 'Brief must be completed first' }, { status: 400 })
  }

  // Update brief status
  const { error: updateError } = await supabase
    .from('briefs')
    .update({
      status: 'approved',
      approved_at: new Date().toISOString(),
    })
    .eq('id', brief.id)

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  // Send notification to agency
  const profile = brief.profile as { email: string; agency_name: string } | null
  if (profile?.email) {
    try {
      await sendBriefCompleteNotification(
        profile.email,
        profile.agency_name || 'Your agency',
        brief.client_name,
        brief.project_name,
        brief.id
      )
    } catch (error) {
      console.error('Failed to send notification:', error)
      // Don't fail the request if email fails
    }
  }

  return NextResponse.json({ success: true })
}
