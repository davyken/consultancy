# Great Rift Consultancy Website

A fully featured React + Vite website for Great Rift Consultancy NGO.

## 🚀 Quick Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build
```

Open http://localhost:5173 in your browser.

---

## 🔐 Admin Dashboard

- **URL**: `/admin/login`
- **Password**: `admin123`
- **Dashboard**: `/admin`

### Admin features:
- ✅ Add / Edit / Delete Team Members
- ✅ Add / Edit / Delete Services
- ✅ Add / Edit / Delete Projects
- ✅ Add / Edit / Delete Partners
- ✅ Delete Comments (users can add & edit their own)
- ✅ Delete Testimonials
- ✅ Configure AI Chatbot API Key (Anthropic)

---

## 🤖 AI Chatbot Setup

1. Go to `/admin` → **Settings**
2. Paste your Anthropic API key (`sk-ant-...`)
3. Click **Save API Key**
4. The chatbot (bottom-left corner) is now active!

Get an API key at: https://console.anthropic.com

---

## 💬 WhatsApp Button

The floating WhatsApp button (bottom-right) uses the number: **+237 671 323 248**

To change it: edit `src/data/initialData.js` → `contact.whatsapp`

---

## 📄 Pages

| Route | Page |
|-------|------|
| `/` | Home (hero carousel, stats, previews) |
| `/about` | About Us (vision, mission, timeline) |
| `/services` | All 6 services with details |
| `/team` | All team members |
| `/projects` | Projects with filter by category |
| `/partners` | Partners grid |
| `/testimonials` | Client testimonials + add form |
| `/contact` | Contact form + map |
| `/admin/login` | Admin login |
| `/admin` | Admin dashboard |

---

## 🎨 Color Palette (International NGO)

- **Primary Navy**: `#1a3a5c`
- **Blue**: `#2563a8`
- **Teal**: `#0d7e79`
- **Gold Accent**: `#e8a020`

---

## 💾 Data Storage

All data is stored in `localStorage` — no backend needed. Data persists across sessions. The admin can CRUD all content from the dashboard.

---

## 📦 Tech Stack

- React 18
- React Router v6
- Vite 5
- Lucide React (icons)
- CSS Variables (custom design system)
- LocalStorage (persistence)
- Anthropic API (chatbot)
- WhatsApp Web API (chat button)

---

## 🌍 Contact Info (from original site)

- **Phone**: +237 671 323 248 / +237 655 049 061
- **Email**: info@greatriftconsultancy.com
- **Address**: Yaoundé Cameroon, Montée Centre
- **Facebook**: https://web.facebook.com/profile.php?id=61561484548746
- **Instagram**: https://www.instagram.com/greatriftconsultancy/
