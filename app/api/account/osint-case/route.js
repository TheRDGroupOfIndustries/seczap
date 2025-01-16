import { NextResponse } from "next/server";
import connect from "@/utils/db";
import OSINTCase from "@/models/OSINTCase";

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const order = searchParams.get("order") || "desc";

    await connect();

    const skip = (page - 1) * limit;
    const totalRecords = await OSINTCase.countDocuments();

    const allRecords = await OSINTCase.find({})
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit);

    if (!allRecords) {
      return NextResponse.json(
        { success: false, message: "No records found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: allRecords,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalRecords / limit),
        totalRecords,
        hasMore: page * limit < totalRecords,
      },
    }, { status: 200 });

  } catch (error) {
    console.error("Error in help desk route:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
