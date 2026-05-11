import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String },
  description: { type: String },
  image: { type: String },
  year: { type: String },
  status: { type: String }
}, { timestamps: true });

export const Project = mongoose.model('Project', projectSchema);
