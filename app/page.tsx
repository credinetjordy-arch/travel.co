export const dynamic = "force-dynamic";

const destinations = [
  { city: "Rio de Janeiro", code: "GIG" },
  { city: "São Paulo", code: "GRU" },
  { city: "Salvador", code: "SSA" },
  { city: "Recife", code: "REC" },
  { city: "Fortaleza", code: "FOR" },
  { city: "Florianópolis", code: "FLN" },
];

export default function HomePage() {
  const hasRedirect = Boolean(process.env.REDIRECT_URL);

  return (
    <main className="hero-sky relative min-h-screen overflow-hidden px-5 py-8 sm:px-8 sm:py-12">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-10 top-16 h-40 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-52 w-52 rounded-full bg-amber-200/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col">
        <header className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#e4b84a] text-[#10231c] shadow-lg">
              <PlaneIcon />
            </span>
            <div>
              <p className="font-[family-name:var(--font-fraunces)] text-2xl tracking-tight">
                travel.co
              </p>
              <p className="text-xs uppercase tracking-[0.22em] text-white/70">
                Passagens aéreas
              </p>
            </div>
          </div>
          <p className="hidden text-sm text-white/70 sm:block">Brasil</p>
        </header>

        <section className="my-auto grid items-center gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="text-white">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-amber-100">
              Ofertas exclusivas
            </p>
            <h1 className="font-[family-name:var(--font-fraunces)] text-4xl leading-[1.1] sm:text-6xl">
              As melhores ofertas de passagens aéreas do Brasil
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
              A travel.co reúne promoções de voos nacionais e internacionais
              para você viajar agora. Clique abaixo e acesse as ofertas do
              momento.
            </p>
          </div>

          <article className="ticket relative rounded-[28px] px-6 py-8 sm:px-8">
            <div className="ticket-notch absolute -left-3 top-1/2 -translate-y-1/2" />
            <div className="ticket-notch absolute -right-3 top-1/2 -translate-y-1/2" />

            <div className="flex items-start justify-between border-b border-dashed border-[#10231c]/15 pb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#1c7a4a]">
                  Cartão de embarque
                </p>
                <p className="mt-1 font-[family-name:var(--font-fraunces)] text-2xl">
                  Ofertas do dia
                </p>
              </div>
              <span className="plane text-3xl">✈️</span>
            </div>

            <div className="grid grid-cols-3 gap-3 py-6 text-sm">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#10231c]/50">
                  De
                </p>
                <p className="mt-1 text-xl font-semibold">BR</p>
              </div>
              <div className="text-center">
                <p className="text-xs uppercase tracking-widest text-[#10231c]/50">
                  Para
                </p>
                <p className="mt-1 text-xl font-semibold">Mundo</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest text-[#10231c]/50">
                  Classe
                </p>
                <p className="mt-1 text-xl font-semibold">Promo</p>
              </div>
            </div>

            {hasRedirect ? (
              <a
                href="/api/go"
                className="cta group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#1c7a4a] px-5 py-4 text-lg font-semibold text-white shadow-[0_12px_30px_rgba(28,122,74,0.35)] transition hover:bg-[#17663e]"
              >
                Ver ofertas agora
                <span className="cta-plane transition-transform">→</span>
              </a>
            ) : (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800">
                REDIRECT_URL não configurada. Defina a variável de ambiente
                para ativar o redirecionamento.
              </p>
            )}

            <p className="mt-4 text-center text-xs text-[#10231c]/55">
              Você será encaminhado para as ofertas disponíveis neste momento.
            </p>
          </article>
        </section>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {destinations.map((destination) => (
            <li
              key={destination.code}
              className="rounded-2xl border border-white/10 bg-white/8 px-3 py-3 text-white backdrop-blur-sm"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-amber-200">
                {destination.code}
              </p>
              <p className="mt-1 text-sm">{destination.city}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

function PlaneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16Z"
        fill="currentColor"
      />
    </svg>
  );
}
