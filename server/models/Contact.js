import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  phone1: { type: String },
  phone2: { type: String },
  email: { type: String },
  address: { type: String },
  facebook: { type: String },
  instagram: { type: String },
  whatsapp: { type: String }
}, { timestamps: true });

export const Contact = mongoose.model('Contact', contactSchema);
