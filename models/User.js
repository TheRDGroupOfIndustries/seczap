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
    // password: {
    //   type: String,
    //   required: true,
    //   default: "$2a$05$mDaH1eQzeGHd0dvj5gLBuuieKb41INVbnzi/nciRWIXM6pDW4A5nS",
    // },
    role: {
      type: String,
      required: true,
      default: "user",
    },
  },
  { timestamps: true }
);

export default models.User || model("User", userSchema);
