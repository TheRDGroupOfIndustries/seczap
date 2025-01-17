import { NextResponse } from "next/server";
import connect from "@/utils/db";
import OSINTCase from "@/models/OSINTCase";
import mongoose from "mongoose";

export const GET = async (request, { params }) => {
  try {
    const { id } = await params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid OSINT Case ID" },
        { status: 400 }
      );
    }

    await connect();
    const osintCaseRecords = await OSINTCase.findById(id).populate(
      "user_id",
      "name email image role subscription"
    );

    if (!osintCaseRecords) {
      return NextResponse.json(
        { success: false, message: "OSINT Case not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: osintCaseRecords,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("OSINT Case Error:", {
      message: error.message,
      stack: error.stack,
      id: params?.id,
    });

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
};
