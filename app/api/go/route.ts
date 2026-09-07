import { NextResponse } from "next/server";

export function GET(request: Request) {
  const redirectUrl = process.env.REDIRECT_URL?.trim();

  if (!redirectUrl) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    return NextResponse.redirect(new URL(redirectUrl).toString(), 302);
  } catch {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
