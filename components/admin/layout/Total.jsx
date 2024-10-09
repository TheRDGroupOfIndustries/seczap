import ReactCountUp from "@/components/ui/countUp";
import { IoScan } from "react-icons/io5";
import { TbBoxMargin } from "react-icons/tb";
import { IoBugOutline } from "react-icons/io5";

const Total = () => {
  const totalTabs = [
    {
      id: "1",
      head: "Total Scans",
      value: 2458,
      icon: IoScan,
      href: "/admin/scan",
      color: "green",
    },
    {
      id: "2",
      head: "Threats Deteced",
      value: 78,
      icon: TbBoxMargin,
      href: "/admin/scan",
      color: "red",
    },
    {
      id: "3",
      head: "OSINT Analysis",
      value: 42,
      icon: IoBugOutline,
      href: "/admin/osint-analysis",
      color: "yellow",
    },
  ];

  return (
    <>
      <div className="w-full h-fit lg:max-h-[40vh] grid grid-cols-1 md:grid-cols-3 gap-4">
        {totalTabs.map((t, index) => (
          <div
            key={index}
            className="w-full h-fit md:h-32 animate-slide-down flex-between flex-col gap-4 p-4 rounded-lg border border-zinc-300 dark:border-zinc-800/50 border-opacity-30 shadow-lg dark:shadow-muted hover:shadow-xl ease-in-out duration-300 overflow-hidden"
          >
            <div className="w-full h-fit flex items-center gap-2">
              <t.icon color={t.color} size={20} />
              <span className="text-xl font-semibold">{t.head}</span>
            </div>
            <ReactCountUp
              amt={t.value}
              duration={1}
              className="w-full text-xl md:text-2xl lg:text-3xl font-bold"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Total;
