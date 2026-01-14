'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--cream)] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="font-editorial text-[28px] font-bold text-[var(--black)]">
            Briefly
          </Link>
        </div>
        <div className="bg-white border border-[var(--black)]">
          <div className="border-b border-[var(--black)] p-6 text-center">
            <h1 className="headline-md">Welcome back</h1>
            <p className="text-[var(--gray)] mt-1">Sign in to your account</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
              {error && (
                <div className="p-4 text-[var(--coral)] bg-red-50 border border-[var(--coral)]">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label htmlFor="email" className="nav-label text-[var(--black)]">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="editorial-input"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="nav-label text-[var(--black)]">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="editorial-input"
                  required
                />
              </div>
            </div>
            <div className="border-t border-[var(--black)] p-6 space-y-4">
              <button
                type="submit"
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
              <p className="text-sm text-[var(--gray)] text-center">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-link">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
