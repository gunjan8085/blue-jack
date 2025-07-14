import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');
  const customerPage = request.nextUrl.pathname.startsWith('/customer');

  const userToken = request.cookies.get('auth_token')?.value;
  const adminToken = request.cookies.get('admin_token')?.value;
  const businessProfile = request.cookies.get('businessProfile')?.value

  if (isDashboardPage && !businessProfile) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (isAdminPage && !adminToken && !request.nextUrl.pathname.includes('/admin/login')) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (customerPage && businessProfile) {
    console.log("Redirecting to customer home page");
    return NextResponse.redirect(new URL('/businesses', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/:path*', '/dashboard/:path*', '/admin/:path*'],
};



