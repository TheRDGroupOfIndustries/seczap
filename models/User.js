import { Schema, models, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      unique: true,
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: "/user.png",
    },
    password: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    integrationsAuth: {
      type: [
        {
          type: String,
          enum: ["google", "github", "jira", "slack", "email-password"],
        },
      ],
      required: true,
      default: ["email-password"],
    },
    subscription: {
      type: String,
      required: true,
      default: "free",
    },

    resetPasswordToken: {
      type: String,
      trim: true,
      required: false,
    },
    resetPasswordTokenExpiry: {
      type: Date,
      required: false,
    },
    settings: {
      theme: {
        type: String,
        required: true,
        default: "dark",
      },
      emailNotification: {
        type: Boolean,
        required: true,
        default: false,
      },

      language: {
        type: String,
        required: true,
        default: "en",
      },
      timeZone: {
        type: String,
        required: true,
        default: "Asia/Kolkata",
      },
      securityLevel: {
        type: String,
        enum: ["standard", "high", "maximum"],
        required: true,
        default: "standard",
      },
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);
export default User;
