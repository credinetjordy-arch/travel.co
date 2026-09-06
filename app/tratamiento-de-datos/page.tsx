import { LegalShell } from "@/components/LegalShell";
import { getActiveMarket } from "@/lib/markets";

export const dynamic = "force-dynamic";

export default function PrivacyPage() {
  const market = getActiveMarket();

  return (
    <LegalShell
      title={market.privacyTitle}
      intro={market.privacyIntro}
      sections={market.privacySections}
    />
  );
}
