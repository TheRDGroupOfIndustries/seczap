import Account from "@/components/account/layout/Account";

export const metadata = {
  title: "SecZap - Account",
};

export default function AccountLayout({ children }) {
  return <Account>{children}</Account>;
}
