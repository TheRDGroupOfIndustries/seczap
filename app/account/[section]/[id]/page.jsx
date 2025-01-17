import OSINTCasesDetail from "@/components/account/sections/admin/osnitCase/OSINTCasesDetail";

export default async function AccountSectionsDetailPage({ params }) {
  const { section, id } = await params;
  return <OSINTCasesDetail section={section} id={id} />;
}
