import React from 'react';
import { useApp } from '../context/AppContext';
import { ExternalLink } from 'lucide-react';

export default function Partners() {
  const { data } = useApp();

  return (
    <div className="page-enter">
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span style={{ display: 'inline-block', background: 'rgba(232,160,32,0.2)', border: '1px solid rgba(232,160,32,0.4)', borderRadius: 100, padding: '6px 18px', fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>Partners</span>
          <h1 className="page-hero-title">Our Partners</h1>
          <p className="page-hero-sub">Strategic alliances that amplify our global reach</p>
        </div>
      </div>

      <section className="section-pad">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Collaborations</span>
            <h2 className="section-title">Trusted Partners Worldwide</h2>
            <div className="divider" />
            <p className="section-subtitle">We collaborate with leading organizations to deliver exceptional results for our clients.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 28 }}>
            {data.partners.map((partner, i) => (
              <div key={partner.id} style={{
                background: 'white', borderRadius: 20, padding: '32px 28px',
                boxShadow: 'var(--shadow-sm)', textAlign: 'center',
                transition: 'all 0.35s', border: '2px solid transparent',
                animation: `fadeInUp 0.6s ${i * 0.1}s both`
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
              >
                <div style={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <img src={partner.logo} alt={partner.name} style={{ maxWidth: 160, maxHeight: 80, objectFit: 'contain', borderRadius: 10 }} />
                </div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--primary)', marginBottom: 12 }}>{partner.name}</h4>
                {partner.website && partner.website !== '#' && (
                  <a href={partner.website} target="_blank" rel="noreferrer" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontSize: 13, color: 'var(--teal)', textDecoration: 'none', fontWeight: 600
                  }}>
                    <ExternalLink size={13} /> Visit Website
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Become a partner CTA */}
          <div style={{
            marginTop: 80, background: 'linear-gradient(135deg, var(--primary), var(--teal))',
            borderRadius: 24, padding: '60px 40px', textAlign: 'center'
          }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'white', marginBottom: 16 }}>Become a Partner</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 32, fontSize: 16, maxWidth: 500, margin: '0 auto 32px' }}>
              Join our growing network of partners and help us empower individuals and communities across the globe.
            </p>
            <a href="mailto:info@greatriftconsultancy.com" className="btn btn-accent">
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
