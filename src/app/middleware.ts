import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/panelAdmin')) {
    const auth = req.headers.get('authorization');

    if (!auth) {
      return new Response('Unauthorized', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
      });
    }

    const base64 = auth.split(' ')[1];
    const [user, pass] = atob(base64).split(':');

    if (user !== 'nimatajik39@gmail.com' || pass !== 'nima1234') {
      return new Response('Unauthorized', { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/panelAdmin/:path*'],
};
