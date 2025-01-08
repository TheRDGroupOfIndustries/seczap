import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Auth from "@/components/auth/Auth";

export const metadata = {
  title: "SecZap - Auth",
};

export default function AuthLayout({ children }) {
  const session = getServerSession();
  if (session) redirect("/");
  return <Auth>{children}</Auth>;
}
