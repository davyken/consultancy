import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { MapPin, Maximize2, Phone, MessageCircle, ArrowRight, Home, Check, Filter } from 'lucide-react';

const landData = [
  { city: 'Yaoundé', zone: 'Mvan, 7th district', size: '600 m²', price: '8 500 000', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop', type: 'Residential', color: '#1a3a5c' },
  { city: 'Yaoundé', zone: 'Odza, Yaoundé VI', size: '1 200 m²', price: '15 000 000', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop', type: 'Residential / Commercial', color: '#2563a8' },
  { city: 'Yaoundé', zone: 'Bastos, Yaoundé', size: '800 m²', price: '35 000 000', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop', type: 'Commercial', color: '#7c3aed' },
  { city: 'Yaoundé', zone: 'Biyem-Assi, Yaoundé VI', size: '500 m²', price: '6 200 000', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop', type: 'Residential', color: '#059669' },
  { city: 'Buea', zone: 'Great Soppo, Buea', size: '700 m²', price: '5 500 000', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop', type: 'Residential', color: '#0d7e79' },
  { city: 'Buea', zone: 'Molyko, Buea', size: '450 m²', price: '3 800 000', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop', type: 'Residential / Rental', color: '#1a3a5c' },
  { city: 'Buea', zone: 'Buea Town, Centre', size: '900 m²', price: '12 000 000', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&h=400&fit=crop', type: 'Commercial', color: '#e8a020' },
  { city: 'Bamenda', zone: 'Commercial Avenue, Bamenda I', size: '1 000 m²', price: '9 000 000', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop', type: 'Commercial', color: '#2563a8' },
  { city: 'Bamenda', zone: 'Up Station, Bamenda', size: '750 m²', price: '7 000 000', image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop', type: 'Residential', color: '#059669' },
  { city: 'Bamenda', zone: 'Nkwen, Bamenda III', size: '500 m²', price: '4 500 000', image: 'https://images.unsplash.com/photo-1596005554384-d293674c91d7?w=600&h=400&fit=crop', type: 'Residential', color: '#7c3aed' },
  { city: 'Other', zone: 'Bafoussam, West', size: '1 ha', price: '6 000 000', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop', type: 'Agricultural', color: '#059669' },
  { city: 'Other', zone: 'Beach Road, Limbe', size: '650 m²', price: '11 000 000', image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&h=400&fit=crop', type: 'Residential / Tourism', color: '#0d7e79' },
];

const cityColors = {
  Yaoundé: { bg: '#1a3a5c', light: '#e8f0f9' },
  Buea: { bg: '#0d7e79', light: '#e0f5f4' },
  Bamenda: { bg: '#7c3aed', light: '#f0ebfe' },
  Other: { bg: '#e8a020', light: '#fef8e8' },
};

function LandCard({ land, titleText, features }) {
  const [hovered, setHovered] = useState(false);
  const cityColor = cityColors[land.city] || cityColors.Other;

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: 'white', borderRadius: 20, boxShadow: hovered ? 'var(--shadow-lg)' : 'var(--shadow-sm)', transform: hovered ? 'translateY(-6px)' : 'none', transition: 'all 0.35s', overflow: 'hidden' }}
    >
      <div style={{ position: 'relative', height: 210, overflow: 'hidden' }}>
        <img src={land.image} alt={titleText} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', top: 14, left: 14, background: cityColor.bg, color: 'white', padding: '5px 14px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>{land.city}</div>
        <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(255,255,255,0.92)', color: land.color, padding: '5px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700 }}>{land.type}</div>
        <div style={{ position: 'absolute', bottom: 14, left: 14, display: 'flex', alignItems: 'center', gap: 6, color: 'white', fontSize: 14, fontWeight: 600 }}>
          <Maximize2 size={14} /> {land.size}
        </div>
      </div>
      <div style={{ padding: '22px 22px 20px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--primary)', marginBottom: 8, lineHeight: 1.3 }}>{titleText}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--mid-gray)', fontSize: 13, marginBottom: 14 }}>
          <MapPin size={13} color="var(--teal)" /> {land.zone}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
          {features.map((f, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 100, background: cityColor.light, color: cityColor.bg, fontSize: 11, fontWeight: 600 }}>
              <Check size={10} /> {f}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid var(--light-gray)' }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--mid-gray)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>Prix / Price</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 20, color: land.color }}>
              {land.price} <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--mid-gray)' }}>FCFA</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href="https://wa.me/237671323248" target="_blank" rel="noopener noreferrer"
              style={{ width: 40, height: 40, borderRadius: 12, background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.25s', boxShadow: '0 4px 12px rgba(37,211,102,0.3)' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            ><MessageCircle size={18} color="white" /></a>
            <a href="tel:+237671323248"
              style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.25s', boxShadow: '0 4px 12px rgba(26,58,92,0.25)' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            ><Phone size={16} color="white" /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RealEstate() {
  const { t, lang } = useLang();
  const [activeCity, setActiveCity] = useState('all');

  const cityKeys = ['all', 'Yaoundé', 'Buea', 'Bamenda', 'Other'];
  const cityLabels = {
    all: t.re.filterAll,
    Yaoundé: 'Yaoundé',
    Buea: 'Buea',
    Bamenda: 'Bamenda',
    Other: lang === 'fr' ? 'Autres villes' : 'Other cities',
  };

  const filtered = activeCity === 'all' ? landData : landData.filter(l => l.city === activeCity);

  return (
    <div className="page-enter">
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0f3d2b 0%, #0d7e79 50%, #1a3a5c 100%)', padding: '140px 0 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-rule='evenodd'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/svg%3E")` }} />
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'rgba(13,126,121,0.3)', top: -150, right: -50, filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', background: 'rgba(26,58,92,0.3)', bottom: -100, left: 50, filter: 'blur(60px)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 720 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,160,32,0.15)', border: '1px solid rgba(232,160,32,0.4)', borderRadius: 100, padding: '7px 20px', marginBottom: 28 }}>
              <Home size={14} color="var(--accent)" />
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)' }}>{t.re.heroTag}</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 24 }}>
              {t.re.heroTitle}<br /><span style={{ color: 'var(--accent)' }}>{t.re.heroTitleAccent}</span>
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, marginBottom: 40, maxWidth: 580 }}>{t.re.heroDesc}</p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="#listings" className="btn btn-accent">{t.re.heroCta} <ArrowRight size={17} /></a>
              <a href="https://wa.me/237671323248" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: '#25D366', color: 'white', boxShadow: '0 4px 20px rgba(37,211,102,0.35)' }}>
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <section style={{ background: 'white', borderBottom: '1px solid var(--light-gray)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {['50+', '4', '100%', '24h'].map((val, i) => (
              <div key={i} style={{ padding: '36px 24px', textAlign: 'center', borderRight: i < 3 ? '1px solid var(--light-gray)' : 'none' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--teal)', lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--mid-gray)', marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t.re.stats[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Listings */}
      <section id="listings" className="section-pad" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{t.re.listingsTag}</span>
            <h2 className="section-title">{t.re.listingsTitle}</h2>
            <div className="divider" />
            <p className="section-subtitle">{t.re.listingsSubtitle}</p>
          </div>

          {/* City Filter */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48 }}>
            {cityKeys.map(city => {
              const active = activeCity === city;
              const cityColor = cityColors[city];
              return (
                <button key={city} onClick={() => setActiveCity(city)} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 22px', borderRadius: 100,
                  border: '2px solid', borderColor: active ? (cityColor?.bg || 'var(--primary)') : 'var(--light-gray)',
                  background: active ? (cityColor?.bg || 'var(--primary)') : 'white',
                  color: active ? 'white' : 'var(--dark-2)', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.25s',
                }}>
                  {city === 'all' && <Filter size={14} />}
                  {city === 'Yaoundé' && '🏛️'}
                  {city === 'Buea' && '🌋'}
                  {city === 'Bamenda' && '⛰️'}
                  {city === 'Other' && '📍'}
                  {cityLabels[city]}
                </button>
              );
            })}
          </div>

          <div style={{ marginBottom: 28, color: 'var(--mid-gray)', fontSize: 14, fontWeight: 500 }}>
            {filtered.length} {t.re.resultsFound}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {filtered.map((land, i) => {
              const landTranslation = t.re.lands[landData.indexOf(land)] || {};
              return (
                <div key={i} style={{ animation: `fadeInUp 0.5s ${i * 0.07}s both` }}>
                  <LandCard land={land} titleText={landTranslation.title || land.zone} features={landTranslation.features || []} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support services */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{t.re.servicesTag}</span>
            <h2 className="section-title">{t.re.servicesTitle}</h2>
            <div className="divider" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
            {t.re.supportServices.map((s, i) => (
              <div key={i} style={{ background: 'var(--off-white)', borderRadius: 18, padding: '28px 24px', border: '1.5px solid var(--light-gray)', transition: 'all 0.3s', animation: `fadeInUp 0.5s ${i * 0.08}s both` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--teal)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--light-gray)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--primary)', marginBottom: 10 }}>{s.title}</h4>
                <p style={{ color: 'var(--mid-gray)', fontSize: 13, lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad" style={{ background: 'linear-gradient(135deg, #0f3d2b 0%, #0d7e79 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-rule='evenodd'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: 'white', marginBottom: 16 }}>{t.re.ctaTitle}</h3>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, marginBottom: 40, maxWidth: 520, margin: '0 auto 40px' }}>{t.re.ctaDesc}</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-accent">{t.re.ctaBtn} <ArrowRight size={17} /></Link>
            <a href="https://wa.me/237671323248" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: '#25D366', color: 'white', boxShadow: '0 4px 20px rgba(37,211,102,0.4)' }}>
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a href="tel:+237671323248" className="btn" style={{ background: 'rgba(255,255,255,0.12)', color: 'white', border: '1.5px solid rgba(255,255,255,0.25)' }}>
              <Phone size={16} /> +237 671 323 248
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
