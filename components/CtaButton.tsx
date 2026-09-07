"use client";

export default function CtaButton({
  cta,
}: {
  cta: string;
}) {
  const handleClick = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Purchase", {
        value: 0,
        currency: "USD",
      });
    }
  };

  return (
    <a
      href="/api/go"
      onClick={handleClick}
      className="cta group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#1c7a4a] px-5 py-4 text-lg font-semibold text-white shadow-[0_12px_30px_rgba(28,122,74,0.35)] transition hover:bg-[#17663e]"
    >
      {cta}
      <span className="cta-plane transition-transform">→</span>
    </a>
  );
}
