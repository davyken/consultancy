import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: String },
  edited: { type: Boolean, default: false }
}, { timestamps: true });

export const Comment = mongoose.model('Comment', commentSchema);
