import { Resend } from 'resend'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY not configured - emails will not be sent')
    return null
  }
  return new Resend(apiKey)
}

export async function sendBriefInvite(
  clientEmail: string,
  clientName: string,
  projectName: string,
  agencyName: string,
  accessToken: string
) {
  const resend = getResendClient()
  if (!resend) {
    console.log('Email would be sent to:', clientEmail)
    return null
  }

  const questionnaireUrl = `${APP_URL}/respond/${accessToken}`

  const { data, error } = await resend.emails.send({
    from: 'Briefly <onboarding@resend.dev>',
    to: clientEmail,
    subject: `${agencyName} needs your input on ${projectName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a1a1a;">Hi ${clientName},</h1>

        <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
          ${agencyName} has invited you to provide a creative brief for <strong>${projectName}</strong>.
        </p>

        <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
          Click the button below to start the questionnaire. It should only take about 10-15 minutes.
        </p>

        <div style="text-align: center; margin: 32px 0;">
          <a href="${questionnaireUrl}"
             style="background-color: #0066ff; color: white; padding: 14px 28px;
                    text-decoration: none; border-radius: 6px; font-weight: 500;
                    display: inline-block;">
            Start Questionnaire
          </a>
        </div>

        <p style="color: #888; font-size: 14px;">
          Or copy this link: ${questionnaireUrl}
        </p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">

        <p style="color: #888; font-size: 12px;">
          Sent via Briefly
        </p>
      </div>
    `
  })

  if (error) {
    console.error('Failed to send email:', error)
    throw error
  }

  return data
}

export async function sendBriefCompleteNotification(
  agencyEmail: string,
  agencyName: string,
  clientName: string,
  projectName: string,
  briefId: string
) {
  const resend = getResendClient()
  if (!resend) {
    console.log('Email would be sent to:', agencyEmail)
    return null
  }

  const briefUrl = `${APP_URL}/briefs/${briefId}`

  const { data, error } = await resend.emails.send({
    from: 'Briefly <onboarding@resend.dev>',
    to: agencyEmail,
    subject: `Brief completed: ${projectName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a1a1a;">Brief Completed!</h1>

        <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
          Great news! <strong>${clientName}</strong> has completed and approved the creative brief for <strong>${projectName}</strong>.
        </p>

        <div style="text-align: center; margin: 32px 0;">
          <a href="${briefUrl}"
             style="background-color: #0066ff; color: white; padding: 14px 28px;
                    text-decoration: none; border-radius: 6px; font-weight: 500;
                    display: inline-block;">
            View Brief
          </a>
        </div>

        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">

        <p style="color: #888; font-size: 12px;">
          Sent via Briefly
        </p>
      </div>
    `
  })

  if (error) {
    console.error('Failed to send email:', error)
    throw error
  }

  return data
}
