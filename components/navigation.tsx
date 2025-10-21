'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: '홈' },
  { href: '/simulator', label: '풍차돌리기 시뮬레이터' },
  { href: '/calculator', label: '이자 계산기' },
  { href: '/compare', label: '적금 비교' },
  { href: '/dashboard', label: '내 포트폴리오' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link href="/" className="flex flex-shrink-0 items-center">
              <span className="text-2xl font-bold text-blue-600">💨 풍차</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
                    pathname === item.href
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <Link
              href="/auth/signin"
              className="text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              로그인
            </Link>
            <Link
              href="/auth/signup"
              className="ml-4 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
