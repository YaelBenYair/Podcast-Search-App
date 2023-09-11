import mongoose from "mongoose";

const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isAdmin: { type: Boolean, default: false },
  likes: [
    {
      podcast: { type: mongoose.Schema.Types.ObjectId, ref: "PodCast" },
    },
  ],
});

export default mongoose.model("User", User);
