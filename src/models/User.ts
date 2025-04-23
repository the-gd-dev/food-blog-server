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

UserSchema.set("toJSON", {
  transform: function (_, ret) {
    ret._id = ret._id.toString();
    return ret._id;
  },
});

export const User = model("User", UserSchema);
