import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { emailTransporter } from "../../core";

export const POST = async (request) => {
  const { name, email, password, otp, checkOtpCode } = await request.json();

  // console.log(
  //   name,
  //   email,
  //   password,
  //   otp, checkOtpCode
  // );

  await connect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new NextResponse("Error : User already exists!", { status: 400 });
  }
  let otpCode = checkOtpCode || "";

  if (otp.trim() == "") {
    otpCode = Math.floor(1000 + Math.random() * 9000);
    const body = `<h1 style="color: #333; font-family: 'Arial', sans-serif;">Heya ${name}!!</h1>
    <span style="color: #ccc; font-size: 18px; font-family: 'Arial', sans-serif;">Here's an OTP for your email verification <b style="color: #2fff00;">${otpCode}</b><br /></span>`;

    await emailTransporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "SecZap - Verify Email",
      text: "Email Verification",
      html: body,
    });

    return new NextResponse(JSON.stringify(otpCode), {
      status: 201,
      message: "Otp has been sent to your email for verification.",
      data: otpCode,
    });
  }

  console.log(otp, " -> ", checkOtpCode);

  if (otp == checkOtpCode) {
    const hashPassword = await bcrypt.hash(password, 5); // converting password into hash-code

    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    try {
      await newUser.save();
      return new NextResponse("User Registered successfully!", {
        status: 200,
      });
    } catch (error) {
      return new NextResponse("Internal Server Error : ", error, {
        status: 500,
      });
    }
  }
};
