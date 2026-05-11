import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Menu, X, Shield, ChevronDown } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/team', label: 'Team' },
  { to: '/projects', label: 'Projects' },
  { to: '/partners', label: 'Partners' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { isAdmin, adminLogout } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(255,255,255,0.98)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      boxShadow: scrolled ? '0 2px 20px rgba(26,58,92,0.1)' : 'none',
      transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
      borderBottom: scrolled ? '1px solid rgba(26,58,92,0.06)' : 'none'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(26,58,92,0.2)'
          }}>
            <img src="/part7.jpeg" alt="Great Rift Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17,
              color: scrolled ? 'var(--primary)' : 'white',
              lineHeight: 1.1, transition: 'color 0.4s'
            }}>Great Rift</div>
            <div style={{
              fontSize: 10, fontWeight: 600, letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: scrolled ? 'var(--accent)' : 'rgba(255,255,255,0.8)',
              transition: 'color 0.4s'
            }}>Consultancy</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
          {navLinks.map(link => {
            const active = location.pathname === link.to;
            return (
              <Link key={link.to} to={link.to} style={{
                padding: '8px 14px',
                borderRadius: 8,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: active ? 700 : 500,
                color: active
                  ? (scrolled ? 'var(--primary)' : 'white')
                  : (scrolled ? 'var(--dark-2)' : 'rgba(255,255,255,0.85)'),
                background: active ? (scrolled ? 'rgba(26,58,92,0.08)' : 'rgba(255,255,255,0.15)') : 'transparent',
                transition: 'all 0.25s',
                borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
              }}
                onMouseEnter={e => {
                  if (!active) {
                    e.target.style.background = scrolled ? 'rgba(26,58,92,0.06)' : 'rgba(255,255,255,0.1)';
                  }
                }}
                onMouseLeave={e => {
                  if (!active) e.target.style.background = 'transparent';
                }}
              >{link.label}</Link>
            );
          })}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {isAdmin ? (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Link to="/admin" className="btn btn-accent btn-sm" style={{ gap: 6 }}>
                <Shield size={14} /> Dashboard
              </Link>
              <button onClick={adminLogout} className="btn btn-sm" style={{
                background: 'rgba(255,255,255,0.15)',
                color: scrolled ? 'var(--primary)' : 'white',
                border: '1px solid rgba(255,255,255,0.3)'
              }}>Logout</button>
            </div>
          ) : (
            <Link to="/admin/login" style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 13, fontWeight: 600, textDecoration: 'none',
              color: scrolled ? 'var(--mid-gray)' : 'rgba(255,255,255,0.7)',
              transition: 'color 0.3s'
            }}>
              <Shield size={15} /> Admin
            </Link>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-hamburger"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: scrolled ? 'var(--primary)' : 'white',
              display: 'none', padding: 4
            }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: 'white',
          borderTop: '1px solid var(--light-gray)',
          padding: '16px 0',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          animation: 'fadeInDown 0.3s ease'
        }}>
          {navLinks.map(link => {
            const active = location.pathname === link.to;
            return (
              <Link key={link.to} to={link.to} style={{
                display: 'block', padding: '12px 24px',
                textDecoration: 'none',
                fontSize: 15,
                fontWeight: active ? 700 : 500,
                color: active ? 'var(--primary)' : 'var(--dark-2)',
                background: active ? 'rgba(26,58,92,0.06)' : 'transparent',
                borderLeft: active ? '3px solid var(--accent)' : '3px solid transparent'
              }}>{link.label}</Link>
            );
          })}
          {isAdmin ? (
            <div style={{ padding: '12px 24px', display: 'flex', gap: 10 }}>
              <Link to="/admin" className="btn btn-accent btn-sm">Dashboard</Link>
              <button onClick={adminLogout} className="btn btn-outline btn-sm">Logout</button>
            </div>
          ) : (
            <Link to="/admin/login" style={{ display: 'block', padding: '12px 24px', color: 'var(--mid-gray)', textDecoration: 'none', fontSize: 14 }}>
              <Shield size={14} style={{ marginRight: 6 }} /> Admin Login
            </Link>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
