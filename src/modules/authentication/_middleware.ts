import { auth } from './auth';

const PUBLIC_FILE = /\.(.*)$/;

export const authMiddleware = auth((req) => {
  const { pathname } = req.nextUrl;

  // Don't redirect for static files, Next.js API routes, and the sign-in page
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/sign-in' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  if (!req.auth) {
    const newUrl = new URL('/sign-in', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
