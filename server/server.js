import express from 'express';
import cors from 'cors';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'greatrift.json');

// ── Seed data ─────────────────────────────────────────────────────────────────
const seedData = {
  members: [
    { id: 1, name: "Vanesa Zoh Takuh", role: "Managing Director", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face", bio: "Leading Great Rift Consultancy with vision and dedication to empower clients worldwide.", email: "vanesa@greatriftconsultancy.com" },
    { id: 2, name: "Barrister Ako Therex", role: "Legal Consultant", image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop&crop=face", bio: "Expert legal counsel specializing in immigration law and international business regulations.", email: "ako@greatriftconsultancy.com" },
    { id: 3, name: "Pearl Yaje", role: "HR / Admission Officer", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face", bio: "Coordinating admissions and human resources with dedication and professionalism.", email: "pearl@greatriftconsultancy.com" },
    { id: 4, name: "Besong Agbor", role: "Business Development Manager – USA", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face", bio: "Driving business growth and partnerships across the United States market.", email: "besong@greatriftconsultancy.com" },
    { id: 5, name: "Achuo Anang Stanislaus", role: "Civil Engineer Consultant", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face", bio: "Providing expert civil engineering consultation for real estate and infrastructure projects.", email: "achuo@greatriftconsultancy.com" },
    { id: 6, name: "Derick Chungong Neba", role: "Port Operator", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face", bio: "Managing port logistics and operations to ensure seamless shipping and cargo handling.", email: "derick@greatriftconsultancy.com" },
    { id: 7, name: "Meyanwi Berenice N", role: "Sales Representative / Language Instructor", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face", bio: "Multilingual instructor specializing in IELTS, TEF, DELF, and DAF preparatory courses.", email: "berenice@greatriftconsultancy.com" }
  ],
  services: [
    { id: 1, title: "Immigration Services", icon: "Globe", description: "We offer expert guidance and support throughout the immigration process, assisting individuals with documentation, application procedures, and legal requirements.", color: "#1a3a5c" },
    { id: 2, title: "Logistics Services", icon: "Truck", description: "At GreatRift, we take pride in offering a comprehensive range of logistics services aimed at facilitating seamless operations across borders.", color: "#0d7e79" },
    { id: 3, title: "Real Estate Services", icon: "Building2", description: "We are committed to providing comprehensive real estate services tailored to meet the diverse needs of our clients, from property search to acquisition.", color: "#2563a8" },
    { id: 4, title: "Financial Aid & Scholarships", icon: "GraduationCap", description: "We offer specialized financial aid services to help students secure funding through loans and scholarships, making their dream of studying abroad a reality.", color: "#e8a020" },
    { id: 5, title: "Language Services", icon: "Languages", description: "Your premier destination for language preparatory services — IELTS, Duolingo, TEF, DAF, and DELF. We've got you covered with comprehensive preparatory classes.", color: "#7c3aed" },
    { id: 6, title: "Flight Booking Services", icon: "Plane", description: "Booking your flights has never been easier. Our dedicated team of travel experts assists you every step of the way, finding perfect flight options for your needs.", color: "#059669" }
  ],
  projects: [
    { id: 1, title: "Student Visa Program – Canada", category: "Immigration", description: "Successfully assisted 150+ students in securing Canadian study visas with a 98% success rate.", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop", year: "2023", status: "Completed" },
    { id: 2, title: "Real Estate Portfolio – Yaoundé", category: "Real Estate", description: "Facilitated property acquisitions worth over 500M FCFA for diaspora clients returning to Cameroon.", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop", year: "2023", status: "Ongoing" },
    { id: 3, title: "Scholarship Connect Initiative", category: "Education", description: "Connected 80 students with international scholarships across Europe and North America.", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop", year: "2024", status: "Ongoing" },
    { id: 4, title: "Logistics Partnership – Port of Douala", category: "Logistics", description: "Established a strategic logistics corridor between Cameroon and European markets.", image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&h=400&fit=crop", year: "2023", status: "Completed" },
    { id: 5, title: "IELTS Preparatory Program", category: "Language", description: "Trained 200+ candidates in IELTS, TEF, and DELF with an average band score improvement of 1.5.", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop", year: "2024", status: "Ongoing" },
    { id: 6, title: "USA Business Expansion", category: "Business", description: "Opened new partnerships in the USA market, connecting Cameroonian businesses with American investors.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop", year: "2024", status: "Ongoing" }
  ],
  partners: [
    { id: 1, name: "Global Education Network", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop", website: "#" },
    { id: 2, name: "Africa Real Estate Alliance", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop", website: "#" },
    { id: 3, name: "Cameron Immigration Bureau", logo: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=100&fit=crop", website: "#" },
    { id: 4, name: "Trans-Atlantic Logistics", logo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=200&h=100&fit=crop", website: "#" },
    { id: 5, name: "Language Institute of Cameroon", logo: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=200&h=100&fit=crop", website: "#" },
    { id: 6, name: "International Scholarship Fund", logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=100&fit=crop", website: "#" }
  ],
  testimonials: [
    { id: 1, name: "Marie-Claire Nkeng", country: "Now in Canada", rating: 5, text: "Great Rift Consultancy made my dream of studying in Canada a reality. Their team guided me through every step of the visa process with patience and expertise. I couldn't have done it without them!", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face", service: "Immigration" },
    { id: 2, name: "Emmanuel Tabi", country: "Now in Germany", rating: 5, text: "The IELTS preparation classes were exceptional. My instructor was knowledgeable and dedicated. I passed with a band 7 on my first attempt!", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", service: "Language Services" },
    { id: 3, name: "Christelle Biya", country: "Yaoundé, Cameroon", rating: 5, text: "I was looking for a property investment in Yaoundé and Great Rift's real estate team found me the perfect option within my budget. Professional, transparent and fast!", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face", service: "Real Estate" }
  ],
  comments: [
    { id: 1, author: "John Mbah", text: "Excellent consultancy! Their immigration team is top-notch.", date: "2024-03-15", edited: false },
    { id: 2, author: "Amelia Fokou", text: "Very professional service. Highly recommend for scholarship applications.", date: "2024-04-01", edited: false }
  ],
  heroSlides: [
    { id: 1, title: "Crafting Your Global Story", subtitle: "Trusted Partner for Immigration, Education & Real Estate", cta: "Explore Our Services", bg: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=1600&h=900&fit=crop" },
    { id: 2, title: "Navigate with Confidence", subtitle: "Expert guidance across immigration, logistics, and financial aid", cta: "Meet Our Team", bg: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&h=900&fit=crop" },
    { id: 3, title: "Empowering Global Journeys", subtitle: "Over 2,000 clients successfully served across 20+ countries", cta: "Our Projects", bg: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&h=900&fit=crop" }
  ],
  contact: { id: 1, phone1: "+237 671 323 248", phone2: "+237 655 049 061", email: "info@greatriftconsultancy.com", address: "Yaoundé Cameroon, Montée Centre", facebook: "https://web.facebook.com/profile.php?id=61561484548746", instagram: "https://www.instagram.com/greatriftconsultancy/", whatsapp: "237671323248" },
  stats: [{ id: 1, value: 2451, label: "Clients Served" }, { id: 2, value: 2300, label: "Visas Processed" }, { id: 3, value: 2780, label: "Consultations" }, { id: 4, value: 2984, label: "Happy Families" }]
};

// ── Load or initialize data ────────────────────────────────────────────────────
let store;
async function loadStore() {
  try {
    await mkdir(DATA_DIR, { recursive: true });
    const content = await readFile(DATA_FILE, 'utf-8');
    store = JSON.parse(content);
  } catch {
    store = JSON.parse(JSON.stringify(seedData));
    await saveStore();
  }
}

async function saveStore() {
  await writeFile(DATA_FILE, JSON.stringify(store, null, 2));
}

await loadStore();
console.log('✅ Data store loaded');

// ── Helper: generate next ID ─────────────────────────────────────────────────
function nextId(arr) {
  if (arr.length === 0) return 1;
  return Math.max(...arr.map(i => i.id)) + 1;
}

// ── API routes ────────────────────────────────────────────────────────────────

// Members
app.get('/api/members', (_, res) => res.json(store.members));
app.post('/api/members', async (req, res) => {
  const member = { ...req.body, id: nextId(store.members) };
  store.members.push(member);
  await saveStore();
  res.status(201).json(member);
});
app.put('/api/members/:id', async (req, res) => {
  const idx = store.members.findIndex(m => m.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  store.members[idx] = { ...store.members[idx], ...req.body, id: parseInt(req.params.id) };
  await saveStore();
  res.json(store.members[idx]);
});
app.delete('/api/members/:id', async (req, res) => {
  store.members = store.members.filter(m => m.id !== parseInt(req.params.id));
  await saveStore();
  res.status(204).send();
});

// Services
app.get('/api/services', (_, res) => res.json(store.services));
app.post('/api/services', async (req, res) => {
  const service = { ...req.body, id: nextId(store.services) };
  store.services.push(service);
  await saveStore();
  res.status(201).json(service);
});
app.put('/api/services/:id', async (req, res) => {
  const idx = store.services.findIndex(s => s.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  store.services[idx] = { ...store.services[idx], ...req.body, id: parseInt(req.params.id) };
  await saveStore();
  res.json(store.services[idx]);
});
app.delete('/api/services/:id', async (req, res) => {
  store.services = store.services.filter(s => s.id !== parseInt(req.params.id));
  await saveStore();
  res.status(204).send();
});

// Projects
app.get('/api/projects', (_, res) => res.json(store.projects));
app.post('/api/projects', async (req, res) => {
  const project = { ...req.body, id: nextId(store.projects) };
  store.projects.push(project);
  await saveStore();
  res.status(201).json(project);
});
app.put('/api/projects/:id', async (req, res) => {
  const idx = store.projects.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  store.projects[idx] = { ...store.projects[idx], ...req.body, id: parseInt(req.params.id) };
  await saveStore();
  res.json(store.projects[idx]);
});
app.delete('/api/projects/:id', async (req, res) => {
  store.projects = store.projects.filter(p => p.id !== parseInt(req.params.id));
  await saveStore();
  res.status(204).send();
});

// Partners
app.get('/api/partners', (_, res) => res.json(store.partners));
app.post('/api/partners', async (req, res) => {
  const partner = { ...req.body, id: nextId(store.partners) };
  store.partners.push(partner);
  await saveStore();
  res.status(201).json(partner);
});
app.put('/api/partners/:id', async (req, res) => {
  const idx = store.partners.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  store.partners[idx] = { ...store.partners[idx], ...req.body, id: parseInt(req.params.id) };
  await saveStore();
  res.json(store.partners[idx]);
});
app.delete('/api/partners/:id', async (req, res) => {
  store.partners = store.partners.filter(p => p.id !== parseInt(req.params.id));
  await saveStore();
  res.status(204).send();
});

// Comments
app.get('/api/comments', (_, res) => res.json(store.comments));
app.post('/api/comments', async (req, res) => {
  const comment = { ...req.body, id: nextId(store.comments), date: new Date().toISOString().split('T')[0], edited: false };
  store.comments.push(comment);
  await saveStore();
  res.status(201).json(comment);
});
app.put('/api/comments/:id', async (req, res) => {
  const idx = store.comments.findIndex(c => c.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  store.comments[idx] = { ...store.comments[idx], text: req.body.text, edited: true };
  await saveStore();
  res.json(store.comments[idx]);
});
app.delete('/api/comments/:id', async (req, res) => {
  store.comments = store.comments.filter(c => c.id !== parseInt(req.params.id));
  await saveStore();
  res.status(204).send();
});

// Testimonials
app.get('/api/testimonials', (_, res) => res.json(store.testimonials));
app.post('/api/testimonials', async (req, res) => {
  const t = { ...req.body, id: nextId(store.testimonials) };
  store.testimonials.push(t);
  await saveStore();
  res.status(201).json(t);
});
app.delete('/api/testimonials/:id', async (req, res) => {
  store.testimonials = store.testimonials.filter(t => t.id !== parseInt(req.params.id));
  await saveStore();
  res.status(204).send();
});

// Hero Slides
app.get('/api/hero-slides', (_, res) => res.json(store.heroSlides));
app.post('/api/hero-slides', async (req, res) => {
  const slide = { ...req.body, id: nextId(store.heroSlides) };
  store.heroSlides.push(slide);
  await saveStore();
  res.status(201).json(slide);
});
app.put('/api/hero-slides/:id', async (req, res) => {
  const idx = store.heroSlides.findIndex(s => s.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  store.heroSlides[idx] = { ...store.heroSlides[idx], ...req.body, id: parseInt(req.params.id) };
  await saveStore();
  res.json(store.heroSlides[idx]);
});
app.delete('/api/hero-slides/:id', async (req, res) => {
  store.heroSlides = store.heroSlides.filter(s => s.id !== parseInt(req.params.id));
  await saveStore();
  res.status(204).send();
});

// Contact
app.get('/api/contact', (_, res) => res.json(store.contact));
app.put('/api/contact', async (req, res) => {
  store.contact = { ...store.contact, ...req.body, id: 1 };
  await saveStore();
  res.json(store.contact);
});

// Stats
app.get('/api/stats', (_, res) => res.json(store.stats));
app.post('/api/stats', async (req, res) => {
  const stat = { ...req.body, id: nextId(store.stats) };
  store.stats.push(stat);
  await saveStore();
  res.status(201).json(stat);
});
app.put('/api/stats/:id', async (req, res) => {
  const idx = store.stats.findIndex(s => s.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  store.stats[idx] = { ...store.stats[idx], ...req.body, id: parseInt(req.params.id) };
  await saveStore();
  res.json(store.stats[idx]);
});
app.delete('/api/stats/:id', async (req, res) => {
  store.stats = store.stats.filter(s => s.id !== parseInt(req.params.id));
  await saveStore();
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
app.listen(PORT, () => {
  console.log(`🚀 Backend server running at http://localhost:${PORT}`);
});
