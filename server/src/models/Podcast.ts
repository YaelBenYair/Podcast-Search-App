import mongoose from "mongoose";

const PodCast = new mongoose.Schema({
  name: { type: String, required: true ,index: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  likes: { type: Number, default: 0 },
  episode: [
    {
      name: { type: String, required: true },
      audioUrl: { type: String, required: true },
    },
  ],
});



export default mongoose.model("PodCast", PodCast);
