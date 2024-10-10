import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  const { name, email, password } = await request.json();

  // console.log(
  //   name,
  //   email,
  //   password,
  //
  // );

  await connect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new NextResponse("Error : User already exists!", { status: 400 });
  }

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
};
