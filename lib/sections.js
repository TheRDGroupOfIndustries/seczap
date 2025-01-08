import Dashboard from "@/components/account/sections/Dashboard";
import OSINTAnalysis from "@/components/account/sections/OSINTAnalysis";
import Scan from "@/components/account/sections/Scan";
import Settings from "@/components/account/sections/Settings";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoScan } from "react-icons/io5";
import { TbBoxMargin } from "react-icons/tb";
import { AiOutlineSetting } from "react-icons/ai";

export const adminSections = [
  {
    id: "dashboard",
    head: "Dashboard",
    href: "/account/dashboard",
    icon: LuLayoutDashboard,
    sectionNode: Dashboard,
  },
  {
    id: "scan",
    head: "Scan",
    href: "/account/scan",
    icon: IoScan,
    sectionNode: Scan,
  },
  {
    id: "osint-analysis",
    head: "OSINT Analysis",
    href: "/account/osint-analysis",
    icon: TbBoxMargin,
    sectionNode: OSINTAnalysis,
  },
  {
    id: "settings",
    head: "Settings",
    href: "/account/settings",
    icon: AiOutlineSetting,
    sectionNode: Settings,
  },
];
