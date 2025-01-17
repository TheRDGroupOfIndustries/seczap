import { NextResponse } from "next/server";
import connect from "@/utils/db";
import OSINTCase from "@/models/OSINTCase";
import { emailTransporter } from "@/app/api/core";

export const POST = async (request) => {
  try {
    const {
      user_id,
      caseType,
      dataSorce,
      target,
      budget,
      priority,
      keywords,
      extraNotes,
      caseDocument,
    } = await request.json();

    // validating required fields
    if (
      !user_id ||
      !caseType ||
      !target ||
      !budget?.currency ||
      !budget?.amount ||
      !priority
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // validating enum values
    if (!["₹", "$"].includes(budget?.currency)) {
      return NextResponse.json(
        { success: false, message: "Invalid currency type" },
        { status: 400 }
      );
    }

    if (
      ![
        "social-media-intelligence",
        "public-data-analysis",
        "brand-protection",
        "competitive-intelligence",
      ].includes(caseType)
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid case type" },
        { status: 400 }
      );
    }

    if (!["low", "medium", "high"].includes(priority)) {
      return NextResponse.json(
        { success: false, message: "Invalid priority level" },
        { status: 400 }
      );
    }

    await connect();

    const newOSINTCase = new OSINTCase({
      user_id,
      caseType,
      dataSorce: {
        google: !!dataSorce?.google,
        linkedIn: !!dataSorce?.linkedIn,
        twitter: !!dataSorce?.twitter,
        whois: !!dataSorce?.whois,
      },
      target,
      budget,
      priority,
      keywords: Array.isArray(keywords) ? keywords : [],
      extraNotes: extraNotes || "",
      caseDocument: caseDocument || { name: "", size: "", url: "" },
    });

    const savedCase = await newOSINTCase.save();

    if (!savedCase) {
      return NextResponse.json(
        { success: false, message: "Failed to create OSINT case" },
        { status: 500 }
      );
    }

    await emailTransporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `New OSINT Case: ${caseType} (Priority: ${priority})`,
      html: `
        <h2>New OSINT Case Created</h2>
        <p><strong>Case Type:</strong> ${caseType}</p>
        <p><strong>Target:</strong> ${target}</p>
        <p><strong>Budget:</strong> ${budget.currency}${budget.amount}</p>
        <p><strong>Priority:</strong> ${priority}</p>
        <p><strong>Keywords:</strong> ${keywords?.join(", ") || "None"}</p>
        <p><strong>Data Sources:</strong></p>
        <ul>${Object.entries(dataSorce || {})
          .filter(([_, value]) => value)
          .map(([key]) => `<li>${key}</li>`)
          .join("")}
        </ul>
        ${
          extraNotes ?
            `
          <p><strong>Extra Notes:</strong></p>
          <p style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">${extraNotes}</p>
        `
          : ""
        }
        ${
          caseDocument?.name ?
            `
          <p><strong>Attached Document:</strong></p>
          <p>${caseDocument.name} (${caseDocument.size})</p>
        `
          : ""
        }
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: "OSINT case created successfully!",
        data: savedCase,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in OSINT case creation:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create OSINT case",
      },
      { status: 500 }
    );
  }
};
