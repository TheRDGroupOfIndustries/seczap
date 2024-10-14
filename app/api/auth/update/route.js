import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const PUT = async (request) => {
  const { name, email, password } = await request.json();

  await connect();

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return new NextResponse("Error: User doesn't exist!", { status: 400 });
  }

  if (name) {
    if (existingUser.name !== name) {
      existingUser.name = name;
    }
  }

  if (password) {
    const newHashPassword = await bcrypt.hash(password, 5);
    existingUser.password = newHashPassword;
  }

  try {
    await existingUser.save();
    return new NextResponse(
      `Updated ${name ? "name" : "password"} successfully!`,
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse("Error updating user!", { status: 500 });
  }
};
