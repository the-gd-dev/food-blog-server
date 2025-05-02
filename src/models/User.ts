import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: null },
    bio: { type: String, default: null },
    niche: { type: String, default: null },
    location: { type: String, default: null },
    social: {
      instagram: { type: String },
      youtube: { type: String },
      twitter: { type: String },
    },
    recipesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const User = model("User", UserSchema);
