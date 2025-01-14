import { NextResponse } from "next/server";
import connect from "@/utils/db";
import HelpDesk from "@/models/HelpDesk";
import { emailTransporter } from "@/app/api/core";

export const POST = async (request) => {
  try {
    const { user_id, name, email, subject, priority, message, attachments } =
      await request.json();
    await connect();

    const newHelpDesk = HelpDesk({
      user_id,
      name,
      email,
      subject,
      priority,
      message,
      attachments,
    });

    const savedHelpDesk = await newHelpDesk.save();

    if (!savedHelpDesk) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to save help desk ticket, please try again.",
        },
        { status: 500 }
      );
    }

    const attachmentsList = attachments?.length
      ? `<p><strong>Attachments:</strong></p>
         <ul>${attachments.map((file) => `<li>${file.name} (${file.size})</li>`).join("")}</ul>`
      : "";

    const mailOptionsToSelf = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `New Help Desk Ticket: ${subject} (Priority: ${priority})`,
      html: `
        <h2>New Help Desk Ticket</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Priority:</strong> ${priority}</p>
        <p><strong>Message:</strong></p>
        <p style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">
          ${message}
        </p>
        ${attachmentsList}
      `,
    };

    const mailOptionsToUser = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: `Help Desk Ticket Received: ${subject}`,
      html: `
        <h2>Your Help Desk Ticket Has Been Received</h2>
        <p>Dear ${name},</p>
        <p>We have received your help desk ticket and will address it according to its priority level. Here's a summary of your ticket:</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Priority:</strong> ${priority}</p>
        <p><strong>Message:</strong></p>
        <p style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">
          ${message}
        </p>
        ${attachmentsList}
        <p>We will get back to you as soon as possible.</p>
        <p>Best regards,<br>Seczap Support Team</p>
      `,
    };

    await Promise.all([
      emailTransporter.sendMail(mailOptionsToSelf),
      emailTransporter.sendMail(mailOptionsToUser),
    ]);

    return NextResponse.json(
      {
        success: true,
        message:
          "Help desk ticket created and notifications sent successfully!",
        data: savedHelpDesk,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in help desk ticket creation:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to process help desk ticket.",
      },
      { status: 500 }
    );
  }
};
