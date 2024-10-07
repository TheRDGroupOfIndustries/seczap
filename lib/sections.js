import Dashboard from "@/components/admin/sections/Dashboard";
import OSINTAnalysis from "@/components/admin/sections/OSINTAnalysis";
import Scan from "@/components/admin/sections/Scan";
import Settings from "@/components/admin/sections/Settings";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoScan } from "react-icons/io5";
import { TbBoxMargin } from "react-icons/tb";
import { AiOutlineSetting } from "react-icons/ai";

export const adminSections = [
  {
    id: "dashboard",
    head: "Dashboard",
    href: "/admin/dashboard",
    icon: LuLayoutDashboard,
    sectionNode: Dashboard,
  },
  {
    id: "scan",
    head: "Scan",
    href: "/admin/scan",
    icon: IoScan,
    sectionNode: Scan,
  },
  {
    id: "osint-analysis",
    head: "OSINT Analysis",
    href: "/admin/osint-analysis",
    icon: TbBoxMargin,
    sectionNode: OSINTAnalysis,
  },
  {
    id: "settings",
    head: "Settings",
    href: "/admin/settings",
    icon: AiOutlineSetting,
    sectionNode: Settings,
  },
];
