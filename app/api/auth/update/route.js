import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const PUT = async (request) => {
  try {
    const { email, name, password, settings } = await request.json();
    console.log(email, name, password, settings);

    await connect();

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return new NextResponse("Error: User doesn't exist!", { status: 400 });
    }

    let updatedFields = [];

    if (name && existingUser.name !== name) {
      existingUser.name = name;
      updatedFields.push("name");
    }

    if (password) {
      existingUser.password = await bcrypt.hash(password, 5);
      if (!existingUser.integrationsAuth.includes("email-password")) {
        existingUser.integrationsAuth.push("email-password");
      }
      updatedFields.push("password");
    }

    if (settings) {
      const validSettings = [
        "theme",
        "emailNotification",
        "language",
        "timeZone",
        "securityLevel",
      ];
      const settingsUpdates = Object.keys(settings).filter(
        (key) =>
          validSettings.includes(key) &&
          existingUser.settings[key] !== settings[key]
      );

      if (settingsUpdates.length > 0) {
        settingsUpdates.forEach((key) => {
          existingUser.settings[key] = settings[key];
        });
        updatedFields.push("settings");
      }
    }

    await existingUser.save();

    return new NextResponse(
      `Updated ${updatedFields.join(", ")} successfully!`,
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse("Error updating user!", { status: 500 });
  }
};
