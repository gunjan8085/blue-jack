import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');

  const userToken = request.cookies.get('auth_token')?.value;
  const adminToken = request.cookies.get('admin_token')?.value;

  if (isDashboardPage && !userToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (isAdminPage && !adminToken && !request.nextUrl.pathname.includes('/admin/login')) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (isAuthPage && userToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/:path*', '/dashboard/:path*', '/admin/:path*'],
};
