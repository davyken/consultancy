import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String },
  bio: { type: String },
  email: { type: String }
}, { timestamps: true });

export const Member = mongoose.model('Member', memberSchema);
