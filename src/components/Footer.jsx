import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { data } = useApp();
  const { contact } = data;

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #0a1f38 0%, #1a3a5c 50%, #0d4a5a 100%)',
      color: 'white', position: 'relative', overflow: 'hidden'
    }}>
      {/* Decorative */}
      <div style={{
        position: 'absolute', top: -60, right: -60, width: 300, height: 300,
        borderRadius: '50%', background: 'rgba(232,160,32,0.06)', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: -40, left: -40, width: 200, height: 200,
        borderRadius: '50%', background: 'rgba(13,126,121,0.08)', pointerEvents: 'none'
      }} />

      <div className="container" style={{ paddingTop: 80, paddingBottom: 60, position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: 'linear-gradient(135deg, #2563a8, #e8a020)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 20, color: 'white'
              }}>GR</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, lineHeight: 1.1 }}>Great Rift</div>
                <div style={{ fontSize: 11, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600 }}>Consultancy</div>
              </div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', marginBottom: 24 }}>
              Crafting Your Global Story — trusted partner for immigration, education, real estate and more.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { icon: Facebook, href: contact.facebook || '#', color: '#1877f2', label: 'facebook' },
                { icon: Instagram, href: contact.instagram || '#', color: '#e1306c', label: 'instagram' }
              ].map(({ icon: Icon, href, color, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.7)',
                  transition: 'all 0.3s', textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = color; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                ><Icon size={17} /></a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 24, color: 'var(--accent)' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['/', 'Home'], ['/about', 'About Us'], ['/services', 'Services'],
                ['/team', 'Our Team'], ['/projects', 'Projects'], ['/contact', 'Contact']
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} style={{
                    color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: 14,
                    display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.25s'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.paddingLeft = '6px'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.paddingLeft = '0'; }}
                  >
                    <ArrowRight size={13} /> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 24, color: 'var(--accent)' }}>Contact Us</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: MapPin, text: contact.address, key: 'addr' },
                { icon: Phone, text: contact.phone1, key: 'p1' },
                { icon: Phone, text: contact.phone2, key: 'p2' },
                { icon: Mail, text: contact.email, key: 'mail' }
              ].map(({ icon: Icon, text, key }) => (
                <li key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <Icon size={15} style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 24, color: 'var(--accent)' }}>Stay Connected</h4>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginBottom: 16, lineHeight: 1.7 }}>
              Subscribe to our newsletter for the latest updates on services and opportunities.
            </p>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                placeholder="Your email address..."
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'white',
                  borderRadius: 100,
                  padding: '12px 120px 12px 18px',
                  fontSize: 14,
                  width: '100%'
                }}
              />
              <button style={{
                position: 'absolute', right: 4, top: 4, bottom: 4,
                background: 'linear-gradient(135deg, var(--accent), #f5c35a)',
                border: 'none', borderRadius: 100, padding: '0 16px',
                fontSize: 13, fontWeight: 700, color: 'var(--primary)', cursor: 'pointer'
              }}>Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '20px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
            © 2024 Great Rift Consultancy. All rights reserved. Designed by Greatriftconsultancy-IT.
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
            Yaoundé, Cameroon
          </p>
        </div>
      </div>
    </footer>
  );
}
