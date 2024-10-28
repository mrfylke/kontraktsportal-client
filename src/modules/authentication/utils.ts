const PUBLIC_FILE = /\.(.*)$/;

export const isPublicFile = (pathname: string): boolean => {
  return (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/sign-in' ||
    PUBLIC_FILE.test(pathname)
  );
};
