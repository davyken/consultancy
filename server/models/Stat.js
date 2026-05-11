import mongoose from 'mongoose';

const statSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  label: { type: String, required: true }
}, { timestamps: true });

export const Stat = mongoose.model('Stat', statSchema);
