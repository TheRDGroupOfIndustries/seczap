import { redirect } from "next/navigation";

export default function AdminPage() {
  redirect("/admin/dashboard");
  return <div>AdminPage</div>;
}
