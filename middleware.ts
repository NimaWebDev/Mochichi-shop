// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/panelAdmin')) {
    const auth = req.headers.get('authorization');

    if (!auth) {
      // اگه لاگین نکرده، بفرست به صفحه لاگین
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/login';
      return NextResponse.redirect(loginUrl);
    }

    const base64 = auth.split(' ')[1];
    const [user, pass] = atob(base64).split(':');

    if (user !== 'YOUR_USERNAME' || pass !== 'YOUR_PASSWORD') {
      // اگه یوزرنیم یا پسورد اشتباه بود، هم می‌تونی ریدایرکت کنی
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/login';
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/panelAdmin', '/panelAdmin/', '/panelAdmin/:path*'],
};
