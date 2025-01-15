import { Schema, models, model } from "mongoose";

const osintCaseSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    caseType: {
      type: String,
      required: true,
      enum: [
        "social-media-intelligence",
        "public-data-analysis",
        "brand-protection",
        "competitive-intelligence",
      ],
    },
    dataSorce: {
      google: { type: Boolean, required: false },
      linkedIn: { type: Boolean, required: false },
      twitter: { type: Boolean, required: false },
      whois: { type: Boolean, required: false },
    },
    target: { type: String, required: true },
    budget: {
      currency: {
        type: String,
        required: true,
        enum: ["₹", "$"],
      },
      amount: { type: Number, required: true },
    },
    priority: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"],
    },
    keywords: [{ type: String, required: false }],
    extraNotes: { type: String, required: false },
    caseDocument: {
      name: { type: String, required: false },
      size: { type: String, required: false },
      url: { type: String, required: false },
    },
  },
  { timestamps: true }
);

const OSINTCase = models.OSINTCase || model("OSINTCase", osintCaseSchema);
export default OSINTCase;
