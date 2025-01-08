import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Login from "@/components/auth/form/Login";
import Register from "@/components/auth/form/Register";
import ForgetPassword from "@/components/auth/form/ForgetPassword";

export default async function AuthFormPage({ params }) {
  const { form } = await params;
  const session = await getServerSession();

  // if (session) redirect("/");

  return form === "sign-in" ? (
    <Login />
  ) : form === "forget-password" ? (
    <ForgetPassword />
  ) : (
    <Register />
  );
}
