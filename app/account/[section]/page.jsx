import { adminSections } from "@/lib/sections";

export default async function AdminSectionPage({ params }) {
  const { section } = await params;
  return (
    <>
      <div className="w-full h-full overflow-hidden">
        {adminSections.map(
          (sec) => section === sec.id && <sec.sectionNode key={sec.id} />
        )}
      </div>
    </>
  );
}
