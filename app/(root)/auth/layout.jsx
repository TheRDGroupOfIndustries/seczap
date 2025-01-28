import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Auth from "@/components/auth/Auth";

export const metadata = {
  title: "SECZAP - Auth",
};

export default function AuthLayout({ children }) {
  const session = getServerSession();
  // if (session && session !== "undefined") redirect("/");
  return <Auth>{children}</Auth>;
}
