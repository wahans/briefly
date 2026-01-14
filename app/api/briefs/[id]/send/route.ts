import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendBriefInvite } from '@/lib/resend'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get brief with profile info
  const { data: brief, error: briefError } = await supabase
    .from('briefs')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (briefError || !brief) {
    return NextResponse.json({ error: 'Brief not found' }, { status: 404 })
  }

  // Get agency profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('agency_name')
    .eq('id', user.id)
    .single()

  const agencyName = profile?.agency_name || 'An agency'

  try {
    await sendBriefInvite(
      brief.client_email,
      brief.client_name,
      brief.project_name,
      agencyName,
      brief.access_token
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to send email:', error)
    // Return success anyway - email sending shouldn't block the flow
    // In production, you might want to queue this for retry
    return NextResponse.json({ success: true, warning: 'Email may not have been sent' })
  }
}
