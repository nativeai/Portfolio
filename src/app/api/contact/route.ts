import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const bodySchema = z.object({
  name:           z.string().min(1).max(100),
  email:          z.string().email().max(254),
  message:        z.string().min(1).max(5000),
  turnstileToken: z.string().min(1),
})

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const params = new URLSearchParams({
    secret:   process.env.TURNSTILE_SECRET_KEY!,
    response: token,
    remoteip: ip,
  })
  const res  = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method:  'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:    params.toString(),
  })
  const data = await res.json()
  return data.success === true
}

export async function POST(req: NextRequest) {
  // ── 1. Parse + validate input ───────────────────────────────────────────────
  let body: z.infer<typeof bodySchema>
  try {
    body = bodySchema.parse(await req.json())
  } catch {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 })
  }

  const { name, email, message, turnstileToken } = body

  // ── 2. Verify CAPTCHA ───────────────────────────────────────────────────────
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? ''
  const captchaOk = await verifyTurnstile(turnstileToken, ip)
  if (!captchaOk) {
    return NextResponse.json({ error: 'CAPTCHA verification failed' }, { status: 400 })
  }

  // ── 3. Send email ───────────────────────────────────────────────────────────
  const safeName    = escapeHtml(name)
  const safeEmail   = escapeHtml(email)
  const safeMessage = escapeHtml(message)

  const { error } = await resend.emails.send({
    from:    process.env.RESEND_FROM!,
    to:      process.env.RESEND_TO!,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text:    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#C9A84C">New message from your portfolio</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <hr style="border-color:#eee;margin:16px 0"/>
        <p style="white-space:pre-wrap">${safeMessage}</p>
      </div>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
