import { adminSections } from "@/lib/sections";

export default function AdminSectionPage({ params }) {
  return (
    <>
      <div className="w-full full overflow-hidden">
        {adminSections.map(
          (sec) => params.section === sec.id && <sec.sectionNode key={sec.id} />
        )}
      </div>
    </>
  );
}
