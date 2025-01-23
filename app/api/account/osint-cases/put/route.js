import { NextResponse } from "next/server";
import connect from "@/utils/db";
import OSINTCase from "@/models/OSINTCase";
import mongoose from "mongoose";

export const PUT = async (request) => {
  try {
    const { id, status } = await request.json();
    console.log("Update OSINT case status:", id, status);

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "ID and status are required" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid case ID format" },
        { status: 400 }
      );
    }

    if (!["pending", "viewed", "in-progress", "completed"].includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Status must be one of: pending, viewed, in-progress, completed",
        },
        { status: 400 }
      );
    }

    await connect();

    const updatedCase = await OSINTCase.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedCase) {
      return NextResponse.json(
        { success: false, message: "OSINT case not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Status updated successfully",
        data: updatedCase,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating OSINT case status:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to update OSINT case status",
      },
      { status: 500 }
    );
  }
};
