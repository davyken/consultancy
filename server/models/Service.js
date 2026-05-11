import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String },
  description: { type: String },
  color: { type: String }
}, { timestamps: true });

export const Service = mongoose.model('Service', serviceSchema);
