import { auth } from './auth';
import { isPublicFile } from './utils';

export const authMiddleware = auth((req) => {
  const { pathname } = req.nextUrl;

  // Don't redirect for static files, Next.js API routes, and the sign-in page
  if (isPublicFile(pathname)) return;

  if (!req.auth) {
    const newUrl = new URL('/sign-in', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
