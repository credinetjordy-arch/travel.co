import { NextRequest, NextResponse } from "next/server";
import { getActiveIso } from "@/lib/market";

const COUNTRY_HEADERS = [
  "x-vercel-ip-country",
  "cf-ipcountry",
  "cloudfront-viewer-country",
  "x-country-code",
  "x-geo-country",
  "x-nf-country",
];

function isLocalIp(ip: string) {
  if (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.startsWith("::ffff:127.") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("10.")
  ) {
    return true;
  }

  const privateBlock = ip.match(/^172\.(\d+)\./);
  if (privateBlock) {
    const octet = Number(privateBlock[1]);
    return octet >= 16 && octet <= 31;
  }

  return false;
}

function clientIp(request: NextRequest): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const ip = forwarded.split(",")[0]?.trim();
    if (ip) return ip;
  }

  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();

  return request.headers.get("x-client-ip");
}

function countryFromHeaders(request: NextRequest): string | null {
  for (const header of COUNTRY_HEADERS) {
    const value = request.headers.get(header);
    if (value && value !== "XX" && value !== "T1") {
      return value.toUpperCase();
    }
  }
  return null;
}

async function lookupCountry(ip: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://ipwho.is/${encodeURIComponent(ip)}?fields=country_code,success`,
      { cache: "no-store" },
    );

    if (!response.ok) return null;

    const data = (await response.json()) as {
      success?: boolean;
      country_code?: string;
    };

    if (data.success && data.country_code) {
      return data.country_code.toUpperCase();
    }
  } catch {
    return null;
  }

  return null;
}

const PUBLIC_PATHS = ["/terminos-y-condiciones", "/tratamiento-de-datos"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const redirectUrl = process.env.REDIRECT_URL;

  if (!redirectUrl) {
    return NextResponse.next();
  }

  const override = process.env.GEO_COUNTRY_OVERRIDE?.trim().toUpperCase();
  let country: string | null = override || countryFromHeaders(request);

  if (!country) {
    const ip = clientIp(request);
    if (ip && !isLocalIp(ip)) {
      country = await lookupCountry(ip);
    }
  }

  if (country === getActiveIso()) {
    return NextResponse.redirect(redirectUrl, 302);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!_next/static|_next/image|favicon.ico|robots.txt).*)"],
};
