import React from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Linkedin } from 'lucide-react';

export default function Team() {
  const { data } = useApp();

  return (
    <div className="page-enter">
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span style={{ display: 'inline-block', background: 'rgba(232,160,32,0.2)', border: '1px solid rgba(232,160,32,0.4)', borderRadius: 100, padding: '6px 18px', fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>Our Team</span>
          <h1 className="page-hero-title">Meet Our Experts</h1>
          <p className="page-hero-sub">Professional consultants dedicated to your success</p>
        </div>
      </div>

      <section className="section-pad">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Professionals</span>
            <h2 className="section-title">The People Behind Your Success</h2>
            <div className="divider" />
            <p className="section-subtitle">Unsure where to start? Connect with our expert team today for a no-obligation consultation.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 28 }}>
            {data.members.map((member, i) => (
              <div key={member.id} style={{
                background: 'white', borderRadius: 20, overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)', transition: 'all 0.35s',
                animation: `fadeInUp 0.6s ${i * 0.1}s both`
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
              >
                {/* Image */}
                <div style={{ height: 260, overflow: 'hidden', position: 'relative', background: 'var(--light-gray)' }}>
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                    onMouseEnter={e => { e.target.style.transform = 'scale(1.08)'; }}
                    onMouseLeave={e => { e.target.style.transform = 'scale(1)'; }}
                  />
                  {/* Overlay on hover */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(26,58,92,0.9), transparent)',
                    opacity: 0, transition: 'opacity 0.35s',
                    display: 'flex', alignItems: 'flex-end', padding: 20
                  }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = 1; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = 0; }}
                  >
                    {member.email && (
                      <a href={`mailto:${member.email}`} style={{
                        color: 'white', display: 'flex', alignItems: 'center', gap: 6,
                        fontSize: 13, textDecoration: 'none', fontWeight: 600
                      }}>
                        <Mail size={15} /> {member.email}
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '20px 24px 24px' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--primary)', marginBottom: 4 }}>{member.name}</h4>
                  <div style={{ fontSize: 13, color: 'var(--teal)', fontWeight: 700, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{member.role}</div>
                  <p style={{ color: 'var(--mid-gray)', fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>{member.bio}</p>
                  {member.email && (
                    <a href={`mailto:${member.email}`} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      fontSize: 13, color: 'var(--primary-light)', textDecoration: 'none',
                      fontWeight: 600, transition: 'color 0.2s'
                    }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--teal)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--primary-light)'; }}
                    ><Mail size={14} /> Contact</a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Join CTA */}
          <div style={{ marginTop: 80, textAlign: 'center', padding: '60px 40px', background: 'var(--off-white)', borderRadius: 24 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--primary)', marginBottom: 12 }}>Want to Join Our Team?</h3>
            <p style={{ color: 'var(--mid-gray)', marginBottom: 28 }}>We're always looking for talented professionals passionate about making a global impact.</p>
            <a href="mailto:info@greatriftconsultancy.com" className="btn btn-primary">
              <Mail size={17} /> Send Your Application
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
