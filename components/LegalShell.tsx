import Link from "next/link";
import { getActiveMarket } from "@/lib/markets";

export function LegalShell({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
}) {
  const market = getActiveMarket();

  return (
    <main className="hero-sky min-h-screen px-5 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-3 text-white">
          <span className="font-[family-name:var(--font-fraunces)] text-2xl">
            travel.co
          </span>
          <span className="text-sm text-white/70">{market.countryName}</span>
        </Link>

        <article className="ticket mt-8 rounded-[28px] px-6 py-8 sm:px-10">
          <h1 className="font-[family-name:var(--font-fraunces)] text-3xl">
            {title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#10231c]/75">{intro}</p>
          <div className="mt-8 space-y-6">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-base font-semibold">{section.heading}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#10231c]/75">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
