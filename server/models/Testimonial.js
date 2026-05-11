import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String },
  rating: { type: Number, default: 5 },
  text: { type: String, required: true },
  avatar: { type: String },
  service: { type: String }
}, { timestamps: true });

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
