import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useLang } from '../context/LanguageContext';
import {
  ArrowRight, ChevronLeft, ChevronRight, Globe, Star, Users, Award,
  Monitor, Home as HomeIcon, Code2, Smartphone, Search, Cloud,
  Maximize2, Check, MessageCircle,
} from 'lucide-react';
import CommentsSection from '../components/CommentsSection';

/* ── Hero Carousel ─────────────────────────────────────────────── */
function HeroCarousel({ slides }) {
  const { t } = useLang();
  // Merge translated text with API slides (keep bg image from API)
  slides = slides.map((s, i) => ({
    ...s,
    ...(t.hero[i] || {}),
  }));
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const go = (idx) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => setAnimating(false), 700);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => go((current + 1) % slides.length), 5000);
    return () => clearInterval(timerRef.current);
  }, [current, slides.length]);

  if (!slides || slides.length === 0) {
    return (
      <div style={{ height: '100vh', background: 'linear-gradient(135deg, #0f172a, #1a3a5c)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 900, color: 'white', textAlign: 'center', lineHeight: 1.2, padding: '0 24px' }}>
          IT & Real Estate<br /><span style={{ color: 'var(--accent)' }}>in Cameroon</span>
        </div>
      </div>
    );
  }

  const slide = slides[current];

  return (
    <div style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden', background: 'var(--primary)' }}>
      {slides.map((s, i) => (
        <div key={s._id || i} style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${s.bg})`, backgroundSize: 'cover', backgroundPosition: 'center',
          backgroundColor: 'var(--primary)',
          opacity: i === current ? 1 : 0, transition: 'opacity 0.8s ease',
          transform: i === current ? 'scale(1)' : 'scale(1.05)',
          transitionProperty: 'opacity, transform', transitionDuration: '5s, 5s',
        }} />
      ))}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,31,56,0.92) 0%, rgba(10,31,56,0.65) 60%, rgba(10,31,56,0.25) 100%)' }} />
      <div className="container" style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 680 }}>
          <div key={current} style={{ animation: 'fadeInUp 0.7s ease' }}>
            <div style={{ display: 'inline-block', background: 'rgba(232,160,32,0.2)', border: '1px solid rgba(232,160,32,0.4)', borderRadius: 100, padding: '6px 18px', fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 24 }}>Great Rift Consultancy</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 20 }}>{slide.title}</h1>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: 40, maxWidth: 560 }}>{slide.subtitle}</p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/services" className="btn btn-accent">{slide.cta} <ArrowRight size={17} /></Link>
              <Link to="/contact" className="btn" style={{ background: 'rgba(255,255,255,0.12)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)' }}>Contact</Link>
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10, zIndex: 3 }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => go(i)} style={{ width: i === current ? 32 : 10, height: 10, borderRadius: 5, border: 'none', cursor: 'pointer', background: i === current ? 'var(--accent)' : 'rgba(255,255,255,0.4)', transition: 'all 0.4s' }} />
        ))}
      </div>
      {[{ dir: -1, icon: ChevronLeft, style: { left: 24 } }, { dir: 1, icon: ChevronRight, style: { right: 24 } }].map(({ dir, icon: Icon, style }) => (
        <button key={dir} onClick={() => go((current + dir + slides.length) % slides.length)}
          style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: 3, background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', backdropFilter: 'blur(8px)', transition: 'all 0.3s', ...style }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
        ><Icon size={22} /></button>
      ))}
    </div>
  );
}

/* ── Stat Counter ──────────────────────────────────────────────── */
function StatCounter({ value, label, icon: Icon, delay }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = value / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= value) { setCount(value); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 25);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '32px 24px', animation: `fadeInUp 0.6s ${delay}s both` }}>
      <div style={{ width: 60, height: 60, borderRadius: 16, background: 'linear-gradient(135deg, var(--primary), var(--teal))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
        <Icon size={26} color="white" />
      </div>
      <div className="stat-number">{count.toLocaleString()}+</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

/* ── Sector Showcase ───────────────────────────────────────────── */
function SectorShowcase() {
  const { t } = useLang();
  const [hovered, setHovered] = useState(null);

  const sectors = [
    {
      id: 'it', tag: t.home.itTag, title: t.home.itTitle, desc: t.home.itDesc,
      to: '/it-services', cta: t.home.itCta,
      bg: 'linear-gradient(135deg, #0f172a 0%, #1a3a5c 50%, #2563a8 100%)',
      icon: Monitor, accentColor: '#e8a020', services: t.home.itServices, emoji: '💻',
    },
    {
      id: 'realestate', tag: t.home.reTag, title: t.home.reTitle, desc: t.home.reDesc,
      to: '/real-estate', cta: t.home.reCta,
      bg: 'linear-gradient(135deg, #0f3d2b 0%, #0d7e79 50%, #1a5c3a 100%)',
      icon: HomeIcon, accentColor: '#f5c35a', services: t.home.reCities, emoji: '🏡',
    },
  ];

  return (
    <section style={{ background: 'var(--off-white)', padding: '100px 0' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t.home.sectorTag}</span>
          <h2 className="section-title">{t.home.sectorTitle}</h2>
          <div className="divider" />
          <p className="section-subtitle">{t.home.sectorSubtitle}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
          {sectors.map((s) => (
            <Link key={s.id} to={s.to} style={{ textDecoration: 'none' }}>
              <div onMouseEnter={() => setHovered(s.id)} onMouseLeave={() => setHovered(null)}
                style={{ background: s.bg, borderRadius: 28, overflow: 'hidden', boxShadow: hovered === s.id ? '0 32px 80px rgba(0,0,0,0.3)' : '0 12px 40px rgba(0,0,0,0.15)', transform: hovered === s.id ? 'translateY(-10px) scale(1.01)' : 'none', transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)', position: 'relative', minHeight: 400 }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='3'/%3E%3C/g%3E%3C/svg%3E")` }} />
                <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', top: -80, right: -60, filter: 'blur(40px)' }} />
                <div style={{ position: 'relative', zIndex: 2, padding: '44px 40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 100, padding: '7px 18px' }}>
                      <s.icon size={14} color={s.accentColor} />
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: s.accentColor }}>{s.tag}</span>
                    </div>
                    <span style={{ fontSize: 42 }}>{s.emoji}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'white', lineHeight: 1.2, marginBottom: 16 }}>{s.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>{s.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
                    {s.services.map((srv, i) => (
                      <span key={i} style={{ padding: '5px 14px', borderRadius: 100, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.85)', fontSize: 12, fontWeight: 600 }}>{srv}</span>
                    ))}
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: s.accentColor, color: 'var(--primary)', padding: '12px 28px', borderRadius: 100, fontWeight: 700, fontSize: 14, boxShadow: `0 6px 24px ${s.accentColor}55`, transition: 'all 0.3s', transform: hovered === s.id ? 'scale(1.04)' : 'scale(1)' }}>
                    {s.cta} <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── IT Preview ────────────────────────────────────────────────── */
function ITPreview() {
  const { t } = useLang();
  const icons = [Globe, Code2, Smartphone, Search, Cloud, Monitor];
  const colors = ['#1a3a5c', '#2563a8', '#0d7e79', '#7c3aed', '#059669', '#e8a020'];

  return (
    <section className="section-pad" style={{ background: 'white' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t.home.itPreviewTag}</span>
          <h2 className="section-title">{t.home.itPreviewTitle}</h2>
          <div className="divider" />
          <p className="section-subtitle">{t.home.itPreviewSubtitle}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {t.home.itServicesList.map((s, i) => {
            const Icon = icons[i];
            const color = colors[i];
            return (
              <div key={i} style={{ background: 'var(--off-white)', borderRadius: 18, padding: '26px 24px', border: '1.5px solid var(--light-gray)', transition: 'all 0.3s', animation: `fadeInUp 0.5s ${i * 0.08}s both` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--light-gray)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon size={22} color={color} />
                </div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--primary)', marginBottom: 8 }}>{s.title}</h4>
                <p style={{ color: 'var(--mid-gray)', fontSize: 13, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link to="/it-services" className="btn btn-primary">{t.home.itCta} <ArrowRight size={17} /></Link>
        </div>
      </div>
    </section>
  );
}

/* ── Real Estate Preview ───────────────────────────────────────── */
const previewLands = [
  { size: '600 m²', price: '8 500 000 FCFA', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop', city: 'Yaoundé', color: '#1a3a5c' },
  { size: '450 m²', price: '3 800 000 FCFA', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop', city: 'Buea', color: '#0d7e79' },
  { size: '1 000 m²', price: '9 000 000 FCFA', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop', city: 'Bamenda', color: '#7c3aed' },
];

function RealEstatePreview() {
  const { t } = useLang();
  const previewData = [t.re.lands[0], t.re.lands[5], t.re.lands[7]];

  return (
    <section className="section-pad" style={{ background: 'var(--off-white)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t.home.rePreviewTag}</span>
          <h2 className="section-title">{t.home.rePreviewTitle}</h2>
          <div className="divider" />
          <p className="section-subtitle">{t.home.rePreviewSubtitle}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {previewLands.map((land, i) => {
            const landData = previewData[i] || {};
            return (
              <div key={i} style={{ background: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-sm)', transition: 'all 0.35s', animation: `fadeInUp 0.6s ${i * 0.1}s both` }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
              >
                <div style={{ position: 'relative', height: 190, overflow: 'hidden' }}>
                  <img src={land.image} alt={landData.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                    onMouseEnter={e => { e.target.style.transform = 'scale(1.06)'; }}
                    onMouseLeave={e => { e.target.style.transform = 'scale(1)'; }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent 60%)' }} />
                  <div style={{ position: 'absolute', top: 14, left: 14, background: land.color, color: 'white', padding: '4px 14px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>{land.city}</div>
                  <div style={{ position: 'absolute', bottom: 14, left: 14, color: 'white', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Maximize2 size={13} /> {land.size}
                  </div>
                </div>
                <div style={{ padding: '20px 20px' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--primary)', marginBottom: 8 }}>{landData.title}</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                    {(landData.features || []).slice(0, 3).map((f, j) => (
                      <span key={j} style={{ padding: '3px 10px', borderRadius: 100, background: `${land.color}12`, color: land.color, fontSize: 11, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                        <Check size={10} /> {f}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--light-gray)' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 15, color: land.color }}>{land.price}</div>
                    <a href="https://wa.me/237671323248" target="_blank" rel="noopener noreferrer"
                      style={{ width: 36, height: 36, borderRadius: 10, background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                      <MessageCircle size={16} color="white" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link to="/real-estate" className="btn btn-primary">{t.home.viewLands} <ArrowRight size={17} /></Link>
        </div>
      </div>
    </section>
  );
}

/* ── Main Home ─────────────────────────────────────────────────── */
export default function Home() {
  const { data } = useApp();
  const { t } = useLang();

  return (
    <div className="page-enter">
      <HeroCarousel slides={data.heroSlides} />

      {/* Stats */}
      <section style={{ background: 'var(--off-white)', padding: '0 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, background: 'white', borderRadius: 20, boxShadow: 'var(--shadow-md)', margin: '-40px 0 0', position: 'relative', zIndex: 5, overflow: 'hidden' }}>
            {data.stats.map((s, i) => {
              const icons = [Globe, Users, Star, Award];
              return <StatCounter key={s._id || i} value={s.value} label={s.label} icon={icons[i]} delay={i * 0.1} />;
            })}
          </div>
        </div>
      </section>

      <SectorShowcase />
      <ITPreview />
      <RealEstatePreview />

      {/* Why Choose Us */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{t.home.whyTag}</span>
            <h2 className="section-title">{t.home.whyTitle}</h2>
            <div className="divider" />
            <p className="section-subtitle">{t.home.whySubtitle}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {t.home.whyItems.map((item, i) => (
              <div key={i} style={{ background: 'var(--off-white)', borderRadius: 16, padding: '28px 28px', boxShadow: 'var(--shadow-sm)', transition: 'all 0.35s', borderLeft: '4px solid transparent', animation: `fadeInUp 0.6s ${i * 0.1}s both` }}
                onMouseEnter={e => { e.currentTarget.style.borderLeftColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderLeftColor = 'transparent'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
              >
                <div style={{ fontSize: 36, marginBottom: 14 }}>{item.icon}</div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: 'var(--primary)', marginBottom: 10 }}>{item.title}</h4>
                <p style={{ color: 'var(--mid-gray)', lineHeight: 1.7, fontSize: 14 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section-pad" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 50%, var(--teal) 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-rule='evenodd'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div style={{ animation: 'slideInLeft 0.8s ease both' }}>
              <span style={{ display: 'inline-block', background: 'rgba(232,160,32,0.25)', border: '1px solid rgba(232,160,32,0.4)', borderRadius: 100, padding: '6px 18px', fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>{t.home.aboutTag}</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'white', lineHeight: 1.2, marginBottom: 20 }}>{t.home.aboutTitle}</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, marginBottom: 16 }}>{t.home.aboutDesc1}</p>
              <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, marginBottom: 32 }}>{t.home.aboutDesc2}</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link to="/about" className="btn btn-accent">{t.home.aboutLearnMore} <ArrowRight size={17} /></Link>
                <Link to="/contact" className="btn" style={{ background: 'rgba(255,255,255,0.12)', color: 'white', border: '1.5px solid rgba(255,255,255,0.25)' }}>{t.home.aboutContact}</Link>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, animation: 'slideInRight 0.8s ease both' }}>
              {t.home.aboutCards.map((item, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: 16, padding: '24px 20px', border: '1px solid rgba(255,255,255,0.15)', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                >
                  <h5 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--accent)', marginBottom: 10, fontSize: 15 }}>{item.title}</h5>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, lineHeight: 1.7 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{t.home.teamTag}</span>
            <h2 className="section-title">{t.home.teamTitle}</h2>
            <div className="divider" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {data.members.slice(0, 4).map((m, i) => (
              <div key={m._id || i} style={{ background: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-sm)', textAlign: 'center', transition: 'all 0.35s', animation: `fadeInUp 0.6s ${i * 0.1}s both` }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
              >
                <div style={{ height: 180, overflow: 'hidden' }}>
                  <img src={m.image} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                    onMouseEnter={e => { e.target.style.transform = 'scale(1.1)'; }}
                    onMouseLeave={e => { e.target.style.transform = 'scale(1)'; }}
                  />
                </div>
                <div style={{ padding: '18px 16px 20px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--primary)', marginBottom: 4 }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--teal)', fontWeight: 600 }}>{m.role}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/team" className="btn btn-primary">{t.home.teamCta} <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>

      {/* Comments */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{t.home.communityTag}</span>
            <h2 className="section-title">{t.home.communityTitle}</h2>
            <div className="divider" />
          </div>
          <CommentsSection />
        </div>
      </section>
    </div>
  );
}
