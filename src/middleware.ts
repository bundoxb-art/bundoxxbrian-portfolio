import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;

  // Protect /portal/dashboard and /portal/admin
  if (path.startsWith("/portal/dashboard") || path.startsWith("/portal/admin")) {
    if (!user) {
      return NextResponse.redirect(new URL("/portal", request.url));
    }
  }

  // Protect admin — only Brian's email
  if (path.startsWith("/portal/admin")) {
    if (user?.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.redirect(new URL("/portal/dashboard", request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/portal/dashboard", "/portal/admin"],
};