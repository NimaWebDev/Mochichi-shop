import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  const { data: { session } } = await supabase.auth.getSession()

  if (request.nextUrl.pathname.startsWith('/panelAdmin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      // بررسی وجود کاربر در جدول users
      const { data: userData, error } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', session.user.id)
        .single()

      // اگر کاربر وجود نداشت یا ادمین نبود
      if (error || !userData?.is_admin) {
        return NextResponse.redirect(new URL('/', request.url))
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/panelAdmin/:path*']
}