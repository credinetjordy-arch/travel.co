import { LegalShell } from "@/components/LegalShell";
import { getActiveMarket } from "@/lib/markets";

export const dynamic = "force-dynamic";

export default function TermsPage() {
  const market = getActiveMarket();

  return (
    <LegalShell
      title={market.termsTitle}
      intro={market.termsIntro}
      sections={market.termsSections}
    />
  );
}
