'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface NavProps {
  user: {
    email: string
    agencyName?: string
  }
}

export function Nav({ user }: NavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/templates', label: 'Templates' },
    { href: '/briefs', label: 'Briefs' },
  ]

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const initials = user.agencyName
    ? user.agencyName.slice(0, 2).toUpperCase()
    : user.email.slice(0, 2).toUpperCase()

  return (
    <nav className="border-b border-[var(--black)] bg-[var(--cream)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="font-editorial text-[28px] font-bold text-[var(--black)]">
              Briefly
            </Link>
            <div className="hidden sm:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-label transition-colors ${
                    pathname === item.href || pathname.startsWith(item.href + '/')
                      ? 'text-[var(--coral)]'
                      : 'text-[var(--black)] hover:text-[var(--coral)]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-[var(--coral)] text-white font-body text-sm font-medium">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border border-[var(--black)]" align="end">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-[var(--black)]">{user.agencyName || 'My Agency'}</p>
                  <p className="text-xs text-[var(--gray)]">{user.email}</p>
                </div>
                <DropdownMenuSeparator className="bg-[var(--black)]" />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-[var(--coral)] hover:bg-[var(--cream)]">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
