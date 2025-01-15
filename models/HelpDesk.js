import { Schema, models, model } from "mongoose";

const helpDeskSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      // unique: true,
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"],
    },
    message: {
      type: String,
      required: true,
    },
    attachments: [
      {
        name: { type: String, required: false },
        size: { type: String, required: false },
        url: { type: String, required: false },
      },
    ],
  },
  { timestamps: true }
);

const HelpDesk = models.HelpDesk || model("HelpDesk", helpDeskSchema);
export default HelpDesk;
