import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Login from "@/components/auth/form/Login";
import Register from "@/components/auth/form/Register";
import ForgetPassword from "@/components/auth/form/ForgetPassword";

export default function AuthFormPage({ params }) {
  const session = getServerSession();
  // if (session) redirect("/");
  return params.form === "sign-in" ? (
    <Login />
  ) : params.form === "forget-password" ? (
    <ForgetPassword />
  ) : (
    <Register />
  );
}
