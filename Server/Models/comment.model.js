import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: new Date()
    },
    updatedAt: {
      type: Date,
      default: new Date()
    }
  },
  {
    timestamps: true
  }
);
const commentModel = mongoose.model("Comment", commentSchema);

export default commentModel;
