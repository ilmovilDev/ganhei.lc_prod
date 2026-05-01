import UnderConstruction from "@/components/shared/under-construction";
import { requireUserOrRedirect } from "@/lib/auth/require-user-or-redirect";

export default async function Earnings() {
  await requireUserOrRedirect();
  return (
    <>
      <UnderConstruction showBack />;
    </>
  );
}
