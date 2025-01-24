import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Account from "@/components/account/layout/Account";

export const metadata = {
  title: "SecZap - Account",
};

export default function AccountLayout({ children }) {
  const session = getServerSession();
  if (!session) redirect("/");
  return <Account>{children}</Account>;
}
