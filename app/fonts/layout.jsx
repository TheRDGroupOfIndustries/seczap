import { redirect } from "next/navigation";

export const metadata = {
  title: "SecZap - welcome Admin",
};

export default function AdminMainLayout() {
  redirect("/admin/dashboard");
  return <>Admin</>;
}
