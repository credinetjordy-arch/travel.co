import { NextResponse } from "next/server";

export function GET() {
  const redirectUrl = process.env.REDIRECT_URL;

  if (!redirectUrl) {
    return NextResponse.json(
      { error: "REDIRECT_URL não configurada" },
      { status: 500 },
    );
  }

  return NextResponse.redirect(redirectUrl, 302);
}
