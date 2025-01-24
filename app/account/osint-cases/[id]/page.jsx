import OSINTCasesDetail from "@/components/account/sections/admin/osnitCase/OSINTCasesDetail";

export default async function AccountSectionsDetailPage({ params }) {
  const { id } = await params;
  return <OSINTCasesDetail id={id} />;
}
