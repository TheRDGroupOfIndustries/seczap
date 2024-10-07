import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Admin from "@/components/admin/layout/Admin";

export const metadata = {
  title: "SecZap - Admin",
};

export default function AdminLayout({ children }) {
  const session = getServerSession();
  if (!session) redirect("/");
  return <Admin>{children}</Admin>;
}
