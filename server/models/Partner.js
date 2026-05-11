import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  website: { type: String }
}, { timestamps: true });

export const Partner = mongoose.model('Partner', partnerSchema);
