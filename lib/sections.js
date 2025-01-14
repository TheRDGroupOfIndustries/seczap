import Dashboard from "@/components/account/sections/Dashboard";
import OSINTAnalysis from "@/components/account/sections/OSINTAnalysis";
import MalwareScan from "@/components/account/sections/MalwareScan";
import Helpdesk from "@/components/account/sections/Helpdesk";
import Settings from "@/components/account/sections/Settings";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoScan } from "react-icons/io5";
import { TbBoxMargin } from "react-icons/tb";
import { TfiHeadphoneAlt } from "react-icons/tfi";
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
    id: "malware-scan",
    head: "Malware Scan",
    href: "/account/malware-scan",
    icon: IoScan,
    sectionNode: MalwareScan,
  },
  {
    id: "osint-cases",
    head: "OSINT Cases",
    href: "/account/osint-cases",
    icon: TbBoxMargin,
    sectionNode: OSINTAnalysis,
  },
  {
    id: "helpdesk",
    head: "Helpdesk",
    href: "/account/helpdesk",
    icon: TfiHeadphoneAlt,
    sectionNode: Helpdesk,
  },
  {
    id: "settings",
    head: "Settings",
    href: "/account/settings",
    icon: AiOutlineSetting,
    sectionNode: Settings,
  },
];
