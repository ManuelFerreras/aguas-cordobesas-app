import { Schema, model, models } from "mongoose";

const scoreSchema = new Schema(
  {
    username: String,
    score: Number,
    image: String,
    difficulty: String
  },
  { timestamps: true }
);

export default models.Score || model("Score", scoreSchema);
