import ReactCountUp from "@/components/ui/countUp";
import { GiCycle } from "react-icons/gi";
import { FaFolder } from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";

const Total = () => {
  const totalTabs = [
    {
      id: "1",
      head: "Active Scans",
      value: 2458,
      icon: GiCycle,
      href: "/account/malware-scan",
      color: "cyan",
      desc: "3 malware detected",
    },
    {
      id: "2",
      head: "OSINT Cases",
      value: 47,
      icon: FaFolder,
      href: "/account/osint-cases",
      color: "blue",
      desc: "15 pending reviews",
    },
    {
      id: "3",
      head: "Threat Level",
      value: 42,
      icon: IoWarning,
      href: "/account/malware-scan",
      color: "yellow",
      desc: "2 critical alerts",
    },
  ];

  return (
    <>
      <div className="w-full h-fit grid grid-cols-1 md:grid-cols-3 gap-4 py-1 overflow-hidden">
        {totalTabs.map((t, index) => (
          <div
            key={index}
            className="w-full h-fit animate-slide-down flex justify-between flex-col gap-2 md:gap-4 bg-background p-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:translate-x-1.5 ease-in-out duration-300 overflow-hidden"
          >
            <div className="w-full h-fit flex-between gap-2">
              <h4 className="text-xl font-semibold">{t.head}</h4>
              <t.icon color={t.color} size={20} />
            </div>
            <ReactCountUp
              amt={t.value}
              duration={1.5}
              className="w-fit text-xl md:text-2xl lg:text-3xl font-bold select-text"
            />
            <span className="text-gray-700 dark:text-zinc-400">{t.desc}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Total;
