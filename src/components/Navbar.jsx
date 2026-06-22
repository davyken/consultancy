import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useLang } from '../context/LanguageContext';
import { Menu, X, Shield, Monitor, Home as HomeIcon, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { isAdmin, adminLogout } = useApp();
  const { lang, toggleLang, t } = useLang();

  const mainLinks = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/contact', label: t.nav.contact },
  ];

  const moreLinks = [
    { to: '/team', label: t.nav.team },
    { to: '/projects', label: t.nav.projects },
    { to: '/partners', label: t.nav.partners },
    { to: '/testimonials', label: t.nav.testimonials },
    { to: '/services', label: t.nav.services },
  ];

  const sectors = [
    { to: '/it-services', label: t.nav.itServices, icon: Monitor, color: '#1a3a5c' },
    { to: '/real-estate', label: t.nav.realEstate, icon: HomeIcon, color: '#0d7e79' },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMoreOpen(false);
  }, [location]);

  const textColor = (active) =>
    active
      ? (scrolled ? 'var(--primary)' : 'white')
      : (scrolled ? 'var(--dark-2)' : 'rgba(255,255,255,0.85)');

  const isMoreActive = moreLinks.some(l => location.pathname === l.to.split(' ')[0]);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(255,255,255,0.98)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      boxShadow: scrolled ? '0 2px 20px rgba(26,58,92,0.1)' : 'none',
      transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
      borderBottom: scrolled ? '1px solid rgba(26,58,92,0.06)' : 'none',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

        {/* ── Logo ── */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 16px rgba(26,58,92,0.2)' }}>
            <img src="/part7.jpeg" alt="Great Rift" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: scrolled ? 'var(--primary)' : 'white', lineHeight: 1.1, transition: 'color 0.4s' }}>Great Rift</div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: scrolled ? 'var(--accent)' : 'rgba(255,255,255,0.8)', transition: 'color 0.4s' }}>Consultancy</div>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="desktop-nav">
          {mainLinks.map(link => {
            const active = location.pathname === link.to;
            return (
              <Link key={link.to} to={link.to} style={{
                padding: '8px 13px', borderRadius: 8, textDecoration: 'none',
                fontSize: 14, fontWeight: active ? 700 : 500,
                color: textColor(active),
                background: active ? (scrolled ? 'rgba(26,58,92,0.08)' : 'rgba(255,255,255,0.15)') : 'transparent',
                borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
                transition: 'all 0.25s',
              }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = scrolled ? 'rgba(26,58,92,0.06)' : 'rgba(255,255,255,0.1)'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
              >{link.label}</Link>
            );
          })}

          {/* "More" dropdown */}
          <div style={{ position: 'relative' }}
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '8px 13px', borderRadius: 8, border: 'none', background: 'none',
              fontSize: 14, fontWeight: isMoreActive ? 700 : 500, cursor: 'pointer',
              color: textColor(isMoreActive),
              borderBottom: isMoreActive ? '2px solid var(--accent)' : '2px solid transparent',
              transition: 'all 0.25s',
            }}>
              {t.nav.more} <ChevronDown size={13} style={{ transition: 'transform 0.25s', transform: moreOpen ? 'rotate(180deg)' : 'none' }} />
            </button>
            {moreOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 4px)', left: 0,
                background: 'white', borderRadius: 14,
                boxShadow: '0 20px 50px rgba(26,58,92,0.15)',
                border: '1px solid rgba(26,58,92,0.06)',
                padding: '8px', minWidth: 200,
                animation: 'fadeInDown 0.2s ease', zIndex: 100,
              }}>
                {moreLinks.map(link => {
                  const active = location.pathname === link.to;
                  return (
                    <Link key={link.to} to={link.to} style={{
                      display: 'block', padding: '10px 14px', borderRadius: 10,
                      textDecoration: 'none', fontSize: 14, fontWeight: active ? 700 : 500,
                      color: active ? 'var(--primary)' : 'var(--dark-2)',
                      background: active ? 'rgba(26,58,92,0.07)' : 'transparent',
                      transition: 'background 0.2s',
                    }}
                      onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(26,58,92,0.04)'; }}
                      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                    >{link.label}</Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── Right side ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Sector pills */}
          <div style={{ display: 'flex', gap: 6 }} className="sector-pills">
            {sectors.map(s => {
              const active = location.pathname === s.to;
              return (
                <Link key={s.to} to={s.to} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '7px 15px', borderRadius: 100,
                  fontSize: 12, fontWeight: 700, textDecoration: 'none',
                  border: '1.5px solid',
                  borderColor: active ? s.color : (scrolled ? 'rgba(26,58,92,0.2)' : 'rgba(255,255,255,0.35)'),
                  background: active ? s.color : 'transparent',
                  color: active ? 'white' : (scrolled ? 'var(--dark-2)' : 'rgba(255,255,255,0.9)'),
                  transition: 'all 0.25s',
                }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.color = s.color; } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = scrolled ? 'rgba(26,58,92,0.2)' : 'rgba(255,255,255,0.35)'; e.currentTarget.style.color = scrolled ? 'var(--dark-2)' : 'rgba(255,255,255,0.9)'; } }}
                >
                  <s.icon size={12} /> {s.label}
                </Link>
              );
            })}
          </div>

          {/* Language toggle */}
          <button
            onClick={toggleLang}
            title={lang === 'en' ? 'Switch to French' : 'Passer en anglais'}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '6px 12px', borderRadius: 100,
              border: '1.5px solid',
              borderColor: scrolled ? 'rgba(26,58,92,0.2)' : 'rgba(255,255,255,0.35)',
              background: 'transparent',
              color: scrolled ? 'var(--primary)' : 'white',
              fontSize: 12, fontWeight: 800, cursor: 'pointer',
              letterSpacing: '0.5px',
              transition: 'all 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = scrolled ? 'var(--primary)' : 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = scrolled ? 'white' : 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = scrolled ? 'var(--primary)' : 'white'; }}
          >
            {lang === 'en' ? '🇫🇷 FR' : '🇬🇧 EN'}
          </button>

          {isAdmin ? (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Link to="/admin" className="btn btn-accent btn-sm"><Shield size={14} /> Dashboard</Link>
              <button onClick={adminLogout} className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.15)', color: scrolled ? 'var(--primary)' : 'white', border: '1px solid rgba(255,255,255,0.3)' }}>Logout</button>
            </div>
          ) : (
            <Link to="/admin/login" style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 600, textDecoration: 'none', color: scrolled ? 'var(--mid-gray)' : 'rgba(255,255,255,0.65)', transition: 'color 0.3s' }}>
              <Shield size={14} />
            </Link>
          )}

          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-hamburger" style={{ background: 'none', border: 'none', cursor: 'pointer', color: scrolled ? 'var(--primary)' : 'white', display: 'none', padding: 4 }}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div style={{ background: 'white', borderTop: '1px solid var(--light-gray)', padding: '12px 0 24px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', animation: 'fadeInDown 0.3s ease' }}>
          {/* Language toggle mobile */}
          <div style={{ padding: '8px 20px' }}>
            <button onClick={toggleLang} style={{
              padding: '8px 18px', borderRadius: 100, border: '1.5px solid var(--light-gray)',
              background: 'var(--off-white)', color: 'var(--primary)',
              fontSize: 13, fontWeight: 700, cursor: 'pointer', width: '100%',
            }}>
              {lang === 'en' ? '🇫🇷 Switch to French' : '🇬🇧 Switch to English'}
            </button>
          </div>

          {/* Sector buttons */}
          <div style={{ padding: '6px 20px 8px', display: 'flex', gap: 10 }}>
            {sectors.map(s => (
              <Link key={s.to} to={s.to} style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '10px', borderRadius: 12, textDecoration: 'none',
                background: location.pathname === s.to ? s.color : `${s.color}12`,
                color: location.pathname === s.to ? 'white' : s.color,
                fontSize: 13, fontWeight: 700,
              }}>
                <s.icon size={14} /> {s.label}
              </Link>
            ))}
          </div>

          <div style={{ height: 1, background: 'var(--light-gray)', margin: '6px 0 4px' }} />

          {mainLinks.map(link => {
            const active = location.pathname === link.to;
            return (
              <Link key={link.to} to={link.to} style={{
                display: 'block', padding: '11px 24px', textDecoration: 'none',
                fontSize: 15, fontWeight: active ? 700 : 500,
                color: active ? 'var(--primary)' : 'var(--dark-2)',
                background: active ? 'rgba(26,58,92,0.06)' : 'transparent',
                borderLeft: active ? '3px solid var(--accent)' : '3px solid transparent',
              }}>{link.label}</Link>
            );
          })}

          {moreLinks.map(link => {
            const active = location.pathname === link.to;
            return (
              <Link key={link.to} to={link.to} style={{
                display: 'block', padding: '11px 24px', textDecoration: 'none',
                fontSize: 14, fontWeight: active ? 700 : 400,
                color: active ? 'var(--primary)' : 'var(--mid-gray)',
                background: active ? 'rgba(26,58,92,0.04)' : 'transparent',
                borderLeft: active ? '3px solid var(--accent)' : '3px solid transparent',
              }}>{link.label}</Link>
            );
          })}

          {isAdmin ? (
            <div style={{ padding: '12px 24px', display: 'flex', gap: 10, marginTop: 4 }}>
              <Link to="/admin" className="btn btn-accent btn-sm">Dashboard</Link>
              <button onClick={adminLogout} className="btn btn-outline btn-sm">Logout</button>
            </div>
          ) : (
            <Link to="/admin/login" style={{ display: 'block', padding: '11px 24px', color: 'var(--mid-gray)', textDecoration: 'none', fontSize: 13 }}>
              <Shield size={13} style={{ marginRight: 6, verticalAlign: 'middle' }} /> Admin
            </Link>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 1060px) {
          .desktop-nav { display: none !important; }
          .sector-pills { display: none !important; }
          .mobile-hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
