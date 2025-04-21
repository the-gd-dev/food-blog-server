import { Schema, model } from "mongoose";
const RevokedTokenSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const RevokedToken = model("RevokedToken", RevokedTokenSchema);
