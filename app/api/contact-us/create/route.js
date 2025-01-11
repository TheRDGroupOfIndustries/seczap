import { NextResponse } from "next/server";
import connect from "@/utils/db";
import ContactUs from "@/models/ContactUs";
import { transporter } from "../../core";

export const POST = async (request) => {
  try {
    const { user_id, name, email, message } = await request.json();
    await connect();

    const newContactUs = ContactUs({
      user_id: user_id || null,
      name,
      email,
      message,
    });

    const savedNewContactUs = await newContactUs.save();

    if (!savedNewContactUs) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to save contact form submission, please try again.",
        },
        { status: 500 }
      );
    }

    const mailOptionsToSelf = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">
          ${message}
        </p>
      `,
    };

    const mailOptionsToUser = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: `Thank you for contacting us, ${name}!`,
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you as soon as possible. Here’s a summary of your message:</p>
        <p><strong>Message:</strong></p>
        <p style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">
          ${message}
        </p>
        <p>Best regards,<br>Seczap</p>
      `,
    };

    await Promise.all([
      transporter.sendMail(mailOptionsToSelf),
      transporter.sendMail(mailOptionsToUser),
    ]);

    return NextResponse.json(
      {
        success: true,
        message: "Contact form submitted and emails sent successfully!",
        data: savedNewContactUs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact form submission:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to process contact form submission.",
      },
      { status: 500 }
    );
  }
};
