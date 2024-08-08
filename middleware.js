import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req) {
  const cookies = req.headers.get('cookie') || '';
  const tokenMatch = cookies.match(/token=([^;]*)/);
  const token = tokenMatch ? tokenMatch[1] : null;
  const { pathname } = req.nextUrl;

  console.log('Requested Path:', pathname);
  console.log('Token:', token);

  if ((pathname.startsWith('/home') || pathname.startsWith('/pos') || pathname.startsWith('/settings')) && !token) {
    console.log('No token found, redirecting to /');
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (token) {
    try {
      console.log('Verifying token...');
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      console.log('Token verified, proceeding to next...');
      return NextResponse.next();
    } catch (err) {
      console.error('Invalid token:', err.message);
      console.log('Redirecting to /');
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ['/home/:path*', '/pos/:path*', '/settings/:path*'],
};
