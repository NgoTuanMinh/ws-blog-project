import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true
    },
    creator: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
  },
  {
    versionKey: false,
    timestamps: true
  }
);
const postModel = mongoose.model("Post", postSchema);

export default postModel;
