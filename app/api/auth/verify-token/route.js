import connect from "@/utils/db";
import User from "@/models/User";
import crypto from "crypto";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { token } = await request.json();

    await connect();

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordTokenExpiry: { $gt: Date.now() },
    });

    // console.log(token, user);

    if (!user) {
      return new NextResponse("Invalid token or has expired", {
        status: 400,
      });
    }

    return new NextResponse(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
};
