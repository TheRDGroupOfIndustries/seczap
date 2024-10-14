import { NextResponse } from "next/server";
import User from "@/models/User";
import connect from "@/utils/db";
import crypto from "crypto";
import { transporter } from "../../core";

export async function POST(request) {
  const { email } = await request.json();

  connect();
  // checking user email
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return new NextResponse("Error : This e-mail doesn't exists!", {
      status: 400,
    });
  }

  if (!existingUser.integrationsAuth.includes("email-password")) {
    return new NextResponse(
      "Error : You haven't sign up with email & password!",
      {
        status: 401,
      }
    );
  }

  // generate random string
  const resetToken = crypto.randomBytes(20).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const passwordResetExpires = Date.now() + 3600000;

  existingUser.resetPasswordToken = passwordResetToken;
  existingUser.resetPasswordTokenExpiry = passwordResetExpires;
  const resetUrl = `${process.env.HOSTNAME}/auth/reset-password/${resetToken}`;

  const body = `<h1 style="color: #333; font-family: 'Arial', sans-serif;">Heya ${
    existingUser.name ?? "name"
  }!!</h1>
  <span style="color: #ccc; font-size: 18px; font-family: 'Arial', sans-serif;">To Reset the password : </span>
  <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #53c28b; color: #fff; text-decoration: none; border-radius: 5px; font-size: 18px;">Click me</a>
  <h3 style="color: #ccc;">And if it wasn't you, then <b>ignore it!</b></h3>
  `;
  //   console.log(resetToken);

  try {
    await existingUser.save();

    // sending email to user
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "SecZap - Reset Password",
      html: body,
    });
    return NextResponse.json({
      status: 200,
      message:
        "Password-Reset email sent successfully. Please check your email!",
      email: data,
    });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({
      status: 400,
      message: "Something went wrong. Please try again!",
    });
  }
}
