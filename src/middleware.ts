import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the token from cookies or localStorage (cookies are preferred for SSR)
  const token = request.cookies.get('authToken')?.value;
  
  // Check if the user is trying to access protected routes
  const isAuthRoute = request.nextUrl.pathname === '/';
  
  // Check if the user is trying to access auth pages
  const isLoginPage = request.nextUrl.pathname === '/login';
  const isSignupPage = request.nextUrl.pathname === '/signup';
  
  // If trying to access protected route without being logged in
  if (isAuthRoute && !token) {
    return NextResponse.redirect(new URL('/signup', request.url));
  }
  
  // If trying to access login/signup pages while logged in
  if ((isLoginPage || isSignupPage) && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/login', '/signup'],
};