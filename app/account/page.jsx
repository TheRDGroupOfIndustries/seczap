import { redirect } from "next/navigation";

export default async function AdminPage() {
  redirect("/account/dashboard");
  return <div>AdminPage</div>;
}
