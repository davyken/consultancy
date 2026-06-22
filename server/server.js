import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

// Models
import { Member } from './models/Member.js';
import { Service } from './models/Service.js';
import { Project } from './models/Project.js';
import { Partner } from './models/Partner.js';
import { Testimonial } from './models/Testimonial.js';
import { Comment } from './models/Comment.js';
import { HeroSlide } from './models/HeroSlide.js';
import { Contact } from './models/Contact.js';
import { Stat } from './models/Stat.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/greatrift_consultancy';

app.use(cors());
app.use(express.json());

// ── Database Connection ──────────────────────────────────────────────────────
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('✅ Connected to MongoDB');
    await seedDatabase();
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
};

// Middleware to ensure DB is connected
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// ── Seed logic ────────────────────────────────────────────────────────────────
async function seedDatabase() {
  console.log('🔍 Checking database state...');
  
  const counts = {
    members: await Member.countDocuments(),
    services: await Service.countDocuments(),
    projects: await Project.countDocuments(),
    partners: await Partner.countDocuments(),
    testimonials: await Testimonial.countDocuments(),
    comments: await Comment.countDocuments(),
    heroSlides: await HeroSlide.countDocuments(),
    contact: await Contact.countDocuments(),
    stats: await Stat.countDocuments()
  };

  console.log('📊 Current counts:', counts);

  const seedData = {
    // ... (rest of the seed data is already in the file)
    members: [
      { name: "Vanesa Zoh Takuh", role: "Managing Director", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face", bio: "Leading Great Rift Consultancy with vision and dedication to empower clients worldwide.", email: "vanesa@greatriftconsultancy.com" },
      { name: "Barrister Ako Therex", role: "Legal Consultant", image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop&crop=face", bio: "Expert legal counsel specializing in immigration law and international business regulations.", email: "ako@greatriftconsultancy.com" },
      { name: "Pearl Yaje", role: "HR / Admission Officer", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face", bio: "Coordinating admissions and human resources with dedication and professionalism.", email: "pearl@greatriftconsultancy.com" },
      { name: "Besong Agbor", role: "Business Development Manager – USA", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face", bio: "Driving business growth and partnerships across the United States market.", email: "besong@greatriftconsultancy.com" },
      { name: "Achuo Anang Stanislaus", role: "Civil Engineer Consultant", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face", bio: "Providing expert civil engineering consultation for real estate and infrastructure projects.", email: "achuo@greatriftconsultancy.com" },
      { name: "Derick Chungong Neba", role: "Port Operator", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face", bio: "Managing port logistics and operations to ensure seamless shipping and cargo handling.", email: "derick@greatriftconsultancy.com" },
      { name: "Meyanwi Berenice N", role: "Sales Representative / Language Instructor", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face", bio: "Multilingual instructor specializing in IELTS, TEF, DELF, and DAF preparatory courses.", email: "berenice@greatriftconsultancy.com" }
    ],
    services: [
      { title: "Immigration Services", icon: "Globe", description: "We offer expert guidance and support throughout the immigration process, assisting individuals with documentation, application procedures, and legal requirements.", color: "#1a3a5c" },
      { title: "Logistics Services", icon: "Truck", description: "At GreatRift, we take pride in offering a comprehensive range of logistics services aimed at facilitating seamless operations across borders.", color: "#0d7e79" },
      { title: "Real Estate Services", icon: "Building2", description: "We are committed to providing comprehensive real estate services tailored to meet the diverse needs of our clients, from property search to acquisition.", color: "#2563a8" },
      { title: "Financial Aid & Scholarships", icon: "GraduationCap", description: "We offer specialized financial aid services to help students secure funding through loans and scholarships, making their dream of studying abroad a reality.", color: "#e8a020" },
      { title: "Language Services", icon: "Languages", description: "Your premier destination for language preparatory services — IELTS, Duolingo, TEF, DAF, and DELF. We've got you covered with comprehensive preparatory classes.", color: "#7c3aed" },
      { title: "Flight Booking Services", icon: "Plane", description: "Booking your flights has never been easier. Our dedicated team of travel experts assists you every step of the way, finding perfect flight options for your needs.", color: "#059669" }
    ],
    projects: [
      { title: "Student Visa Program – Canada", category: "Immigration", description: "Successfully assisted 150+ students in securing Canadian study visas with a 98% success rate.", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop", year: "2023", status: "Completed" },
      { title: "Real Estate Portfolio – Yaoundé", category: "Real Estate", description: "Facilitated property acquisitions worth over 500M FCFA for diaspora clients returning to Cameroon.", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop", year: "2023", status: "Ongoing" },
      { title: "Scholarship Connect Initiative", category: "Education", description: "Connected 80 students with international scholarships across Europe and North America.", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop", year: "2024", status: "Ongoing" },
      { title: "Logistics Partnership – Port of Douala", category: "Logistics", description: "Established a strategic logistics corridor between Cameroon and European markets.", image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&h=400&fit=crop", year: "2023", status: "Completed" },
      { title: "IELTS Preparatory Program", category: "Language", description: "Trained 200+ candidates in IELTS, TEF, and DELF with an average band score improvement of 1.5.", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop", year: "2024", status: "Ongoing" },
      { title: "USA Business Expansion", category: "Business", description: "Opened new partnerships in the USA market, connecting Cameroonian businesses with American investors.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop", year: "2024", status: "Ongoing" }
    ],
    partners: [
      { name: "Global Education Network", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop", website: "#" },
      { name: "Africa Real Estate Alliance", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop", website: "#" },
      { name: "Cameron Immigration Bureau", logo: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=100&fit=crop", website: "#" },
      { name: "Trans-Atlantic Logistics", logo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=200&h=100&fit=crop", website: "#" },
      { name: "Language Institute of Cameroon", logo: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=200&h=100&fit=crop", website: "#" },
      { name: "International Scholarship Fund", logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=100&fit=crop", website: "#" }
    ],
    testimonials: [
      { name: "Marie-Claire Nkeng", country: "Now in Canada", rating: 5, text: "Great Rift Consultancy made my dream of studying in Canada a reality. Their team guided me through every step of the visa process with patience and expertise. I couldn't have done it without them!", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face", service: "Immigration" },
      { name: "Emmanuel Tabi", country: "Now in Germany", rating: 5, text: "The IELTS preparation classes were exceptional. My instructor was knowledgeable and dedicated. I passed with a band 7 on my first attempt!", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", service: "Language Services" },
      { name: "Christelle Biya", country: "Yaoundé, Cameroon", rating: 5, text: "I was looking for a property investment in Yaoundé and Great Rift's real estate team found me the perfect option within my budget. Professional, transparent and fast!", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face", service: "Real Estate" }
    ],
    comments: [
      { author: "John Mbah", text: "Excellent consultancy! Their immigration team is top-notch.", date: "2024-03-15", edited: false },
      { author: "Amelia Fokou", text: "Very professional service. Highly recommend for scholarship applications.", date: "2024-04-01", edited: false }
    ],
    heroSlides: [
      { title: "Build Your Digital Presence", subtitle: "Modern websites, web & mobile apps built with cutting-edge technology for businesses in Cameroon and beyond.", cta: "Explore IT Services", bg: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&h=900&fit=crop" },
      { title: "Invest in Land in Cameroon", subtitle: "Residential, commercial and agricultural plots in Yaoundé, Buea, Bamenda — all with verified land titles.", cta: "View Listings", bg: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&h=900&fit=crop" },
      { title: "Your Trusted Partner", subtitle: "Great Rift Consultancy — IT solutions and real estate services you can count on.", cta: "Contact Us", bg: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&h=900&fit=crop" }
    ],
    contact: { phone1: "+237 671 323 248", phone2: "+237 655 049 061", email: "info@greatriftconsultancy.com", address: "Yaoundé Cameroon, Montée Centre", facebook: "https://web.facebook.com/profile.php?id=61561484548746", instagram: "https://www.instagram.com/greatriftconsultancy/", whatsapp: "237671323248" },
    stats: [{ value: 2451, label: "Clients Served" }, { value: 2300, label: "Visas Processed" }, { value: 2780, label: "Consultations" }, { value: 2984, label: "Happy Families" }]
  };

  if (counts.members === 0) {
    console.log('🌱 Seeding members...');
    await Member.insertMany(seedData.members);
  }
  if (counts.services === 0) {
    console.log('🌱 Seeding services...');
    await Service.insertMany(seedData.services);
  }
  if (counts.projects === 0) {
    console.log('🌱 Seeding projects...');
    await Project.insertMany(seedData.projects);
  }
  if (counts.partners === 0) {
    console.log('🌱 Seeding partners...');
    await Partner.insertMany(seedData.partners);
  }
  if (counts.testimonials === 0) {
    console.log('🌱 Seeding testimonials...');
    await Testimonial.insertMany(seedData.testimonials);
  }
  if (counts.comments === 0) {
    console.log('🌱 Seeding comments...');
    await Comment.insertMany(seedData.comments);
  }
  if (counts.heroSlides === 0) {
    console.log('🌱 Seeding hero slides...');
    await HeroSlide.insertMany(seedData.heroSlides);
  }
  if (counts.contact === 0) {
    console.log('🌱 Seeding contact info...');
    await Contact.create(seedData.contact);
  }
  if (counts.stats === 0) {
    console.log('🌱 Seeding stats...');
    await Stat.insertMany(seedData.stats);
  }

  console.log('✅ Seeding check complete!');
}

// ── API routes ────────────────────────────────────────────────────────────────

// Members
app.get('/api/members', async (_, res) => res.json(await Member.find().sort({ createdAt: -1 })));
app.post('/api/members', async (req, res) => {
  const member = await new Member(req.body).save();
  res.status(201).json(member);
});
app.put('/api/members/:id', async (req, res) => {
  const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(member);
});
app.delete('/api/members/:id', async (req, res) => {
  await Member.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Services
app.get('/api/services', async (_, res) => res.json(await Service.find()));
app.post('/api/services', async (req, res) => {
  const service = await new Service(req.body).save();
  res.status(201).json(service);
});
app.put('/api/services/:id', async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(service);
});
app.delete('/api/services/:id', async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Projects
app.get('/api/projects', async (_, res) => res.json(await Project.find().sort({ createdAt: -1 })));
app.post('/api/projects', async (req, res) => {
  const project = await new Project(req.body).save();
  res.status(201).json(project);
});
app.put('/api/projects/:id', async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(project);
});
app.delete('/api/projects/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Partners
app.get('/api/partners', async (_, res) => res.json(await Partner.find()));
app.post('/api/partners', async (req, res) => {
  const partner = await new Partner(req.body).save();
  res.status(201).json(partner);
});
app.put('/api/partners/:id', async (req, res) => {
  const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(partner);
});
app.delete('/api/partners/:id', async (req, res) => {
  await Partner.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Comments
app.get('/api/comments', async (_, res) => res.json(await Comment.find().sort({ createdAt: -1 })));
app.post('/api/comments', async (req, res) => {
  const data = { ...req.body, date: new Date().toISOString().split('T')[0] };
  const comment = await new Comment(data).save();
  res.status(201).json(comment);
});
app.put('/api/comments/:id', async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, { ...req.body, edited: true }, { new: true });
  res.json(comment);
});
app.delete('/api/comments/:id', async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Testimonials
app.get('/api/testimonials', async (_, res) => res.json(await Testimonial.find().sort({ createdAt: -1 })));
app.post('/api/testimonials', async (req, res) => {
  const t = await new Testimonial(req.body).save();
  res.status(201).json(t);
});
app.delete('/api/testimonials/:id', async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Hero Slides
app.get('/api/hero-slides', async (_, res) => res.json(await HeroSlide.find()));
app.post('/api/hero-slides', async (req, res) => {
  const slide = await new HeroSlide(req.body).save();
  res.status(201).json(slide);
});
app.put('/api/hero-slides/:id', async (req, res) => {
  const slide = await HeroSlide.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(slide);
});
app.delete('/api/hero-slides/:id', async (req, res) => {
  await HeroSlide.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Contact
app.get('/api/contact', async (_, res) => res.json(await Contact.findOne() || {}));
app.put('/api/contact', async (req, res) => {
  let contact = await Contact.findOne();
  if (contact) {
    contact = await Contact.findByIdAndUpdate(contact._id, req.body, { new: true });
  } else {
    contact = await new Contact(req.body).save();
  }
  res.json(contact);
});

// Stats
app.get('/api/stats', async (_, res) => res.json(await Stat.find()));
app.post('/api/stats', async (req, res) => {
  const stat = await new Stat(req.body).save();
  res.status(201).json(stat);
});
app.put('/api/stats/:id', async (req, res) => {
  const stat = await Stat.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(stat);
});
app.delete('/api/stats/:id', async (req, res) => {
  await Stat.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// ── Serve frontend in production ───────────────────────────────────────────────
const distPath = path.join(__dirname, '..', 'dist');
if (existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// ── Start server ──────────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production' || process.env.VITE_DEV === 'true') {
  app.listen(PORT, () => {
    console.log(`🚀 Backend server running at http://localhost:${PORT}`);
  });
}

export default app;
