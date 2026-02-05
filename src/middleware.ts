import { NextResponse, NextRequest } from "next/server";


export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    // 1. Define Public Paths (Everyone can see these)
    const isPublicPath = path === '/login' || path === '/signup'
    
    // 2. Get the token from cookies
    const token = request.cookies.get('token')?.value || ''
    
    // RULE 1: If user is Logged In and tries to go to Login page -> Send to Dashboard
  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.nextUrl))
    }
    
    // RULE 2: If user is NOT Logged In and tries to go to Admin pages -> Send to Login
  // We check if the path starts with "/admin"
  if (!isPublicPath && !token && path.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
    
    return NextResponse.next()

}


//this tells Next.js which paths to run the middleware on
export const config = {
    matcher: [
        '/login',
        '/signup',
        '/admin/:path*'
    ]
}