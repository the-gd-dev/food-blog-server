import { model, Schema } from "mongoose";
const FoodPostSchema = new Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    datePosted: { type: String, default: null },
    foodCategory: { type: String, default: null },
    foodPreference: { type: String, default: null },
  },
  { timestamps: true }
);

export const FoodPost = model("food-posts", FoodPostSchema);
