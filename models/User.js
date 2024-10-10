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
  },
  { timestamps: true }
);

export default models.User || model("User", userSchema);
