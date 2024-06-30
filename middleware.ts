import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const handleI18nRouting = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ar"],

  // Used when no locale matches
  defaultLocale: "en",
});

export function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);

  const token = request.cookies.get("token")?.value;
  const locale = request.cookies.get("NEXT_LOCALE")?.value;
  const pathName = request?.nextUrl?.pathname;
  const authRegex = new RegExp(`^/${locale}/auth/.*`);
  const landingRegex = new RegExp(`^/${locale}/.*`);
  const isAuthPath = authRegex.test(pathName);

  if (token && isAuthPath) {
    return Response.redirect(new URL(`/${locale}`, request?.url));
  }

  if (!token && !isAuthPath) {
    return Response.redirect(new URL(`/${locale}/auth/login`, request?.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
