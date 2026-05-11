import mongoose from 'mongoose';

const heroSlideSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  cta: { type: String },
  bg: { type: String }
}, { timestamps: true });

export const HeroSlide = mongoose.model('HeroSlide', heroSlideSchema);
