import { NextResponse } from "next/server";
import connect from "@/utils/db";
import ContactUs from "@/models/ContactUs";

export const GET = async (request, { params }) => {
  try {
    const { email } = params;

    if (!email) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }

    await connect();
    const userRecords = await ContactUs.find({ email }).sort({ createdAt: -1 });

    if (!userRecords || userRecords.length === 0) {
      return NextResponse.json(
        { success: false, message: "No records found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: userRecords },
      { status: 200 }
    );
  } catch (error) {
    console.error("Help Desk Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
};
