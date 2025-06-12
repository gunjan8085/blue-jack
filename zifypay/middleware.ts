import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isBusinessPage = request.nextUrl.pathname.startsWith('/for-business');
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');
  
  // Get token from cookies
  const token = request.cookies.get('auth_token')?.value;

  // If trying to access business or dashboard pages without auth, redirect to login
  if ((isBusinessPage || isDashboardPage) && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If already logged in and trying to access auth pages, redirect to dashboard
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/:path*', '/for-business/:path*', '/dashboard/:path*'],
}; 