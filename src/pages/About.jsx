import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function About() {
  const values = [
    { title: 'Integrity', text: 'Honest and transparent guidance in every interaction, building lasting trust.' },
    { title: 'Excellence', text: 'Striving to exceed expectations through quality service and continuous improvement.' },
    { title: 'Empowerment', text: 'Equipping clients with knowledge and resources to make informed decisions.' },
    { title: 'Partnership', text: 'Working alongside our clients as a trusted partner throughout their journey.' },
  ];

  const milestones = [
    { year: '2018', event: 'Great Rift Consultancy founded in Yaoundé, Cameroon' },
    { year: '2019', event: 'Expanded to Real Estate and Language Services' },
    { year: '2020', event: 'Launched scholarship assistance program, helping 50+ students' },
    { year: '2021', event: 'Opened logistics division and port operations partnership' },
    { year: '2022', event: 'Established USA business development office with Besong Agbor' },
    { year: '2023', event: 'Surpassed 2,000 clients served with 98% satisfaction rate' },
    { year: '2024', event: 'Expanded language program to include Duolingo and DAF preparation' },
  ];

  return (
    <div className="page-enter">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span style={{
            display: 'inline-block', background: 'rgba(232,160,32,0.2)',
            border: '1px solid rgba(232,160,32,0.4)', borderRadius: 100,
            padding: '6px 18px', fontSize: 12, fontWeight: 700, letterSpacing: '2px',
            textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20
          }}>About Us</span>
          <h1 className="page-hero-title">Who We Are</h1>
          <p className="page-hero-sub">Crafting Your Global Story Since 2018</p>
        </div>
      </div>

      {/* About Content */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div style={{ animation: 'slideInLeft 0.8s ease both' }}>
              <span className="section-tag">Our Story</span>
              <h2 className="section-title" style={{ textAlign: 'left', marginTop: 12 }}>Trusted Partner for Your Global Journey</h2>
              <p style={{ color: 'var(--mid-gray)', lineHeight: 1.8, marginBottom: 20 }}>
                Great Rift Consultancy was founded with a single purpose: to help individuals and families navigate complex global systems with confidence. Based in the heart of Yaoundé, Cameroon, we have grown into a comprehensive consultancy trusted by thousands.
              </p>
              <p style={{ color: 'var(--mid-gray)', lineHeight: 1.8, marginBottom: 32 }}>
                Our team of experienced professionals spans immigration law, civil engineering, real estate, education, logistics, and language instruction — all united by a shared commitment to client success.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                {['98% client satisfaction rate', '2,000+ clients successfully served', 'Licensed immigration consultants', '7 expert team members', 'Services across 20+ countries'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CheckCircle size={18} color="var(--teal)" />
                    <span style={{ color: 'var(--dark-2)', fontWeight: 500 }}>{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn btn-primary">Get in Touch <ArrowRight size={17} /></Link>
            </div>

            <div style={{ position: 'relative', animation: 'slideInRight 0.8s ease both' }}>
              <div style={{
                background: 'linear-gradient(135deg, var(--primary), var(--teal))',
                borderRadius: 24, padding: 4
              }}>
                <img
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=700&fit=crop"
                  alt="Consultancy team"
                  style={{ width: '100%', height: 440, objectFit: 'cover', borderRadius: 22, display: 'block' }}
                />
              </div>
              <div style={{
                position: 'absolute', bottom: -24, left: -24,
                background: 'white', borderRadius: 16, padding: '20px 24px',
                boxShadow: 'var(--shadow-lg)', minWidth: 180
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>6+</div>
                <div style={{ fontSize: 13, color: 'var(--mid-gray)', fontWeight: 500 }}>Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-pad" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {[
              {
                icon: '🔭', label: 'Our Vision',
                text: 'To be a leading provider of integrated solutions in immigration, real estate, education services, and scholarships, empowering individuals and families to achieve their dreams and aspirations around the world. Our vision guides us in everything we do, inspiring us to push boundaries and pursue excellence.'
              },
              {
                icon: '🚀', label: 'Our Mission',
                text: 'To empower individuals and organizations to navigate their journey towards success with confidence and clarity. We are committed to providing comprehensive services in immigration, logistics, real estate, financial aid, and scholarships, enabling our clients to pursue their aspirations and achieve their goals.'
              }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'white', borderRadius: 20, padding: '40px',
                boxShadow: 'var(--shadow-sm)', borderTop: '5px solid var(--accent)',
                animation: `fadeInUp 0.6s ${i * 0.2}s both`
              }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--primary)', marginBottom: 16 }}>{item.label}</h3>
                <p style={{ color: 'var(--mid-gray)', lineHeight: 1.8 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Values</span>
            <h2 className="section-title">What We Stand For</h2>
            <div className="divider" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {values.map((v, i) => (
              <div key={i} style={{
                background: 'var(--off-white)', borderRadius: 16, padding: '32px 24px',
                textAlign: 'center', transition: 'all 0.35s',
                animation: `fadeInUp 0.6s ${i * 0.1}s both`
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.querySelectorAll('*').forEach(el => { if (el.tagName === 'H4') el.style.color = 'white'; if (el.tagName === 'P') el.style.color = 'rgba(255,255,255,0.8)'; }); }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--off-white)'; e.currentTarget.querySelectorAll('*').forEach(el => { if (el.tagName === 'H4') el.style.color = 'var(--primary)'; if (el.tagName === 'P') el.style.color = 'var(--mid-gray)'; }); }}
              >
                <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--primary)', marginBottom: 12, transition: 'color 0.35s' }}>{v.title}</h4>
                <p style={{ color: 'var(--mid-gray)', lineHeight: 1.7, fontSize: 14, transition: 'color 0.35s' }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Journey</span>
            <h2 className="section-title">Key Milestones</h2>
            <div className="divider" />
          </div>
          <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 40, top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom, var(--primary), var(--teal))' }} />
            {milestones.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: 24, marginBottom: 32, animation: `slideInLeft 0.6s ${i * 0.1}s both` }}>
                <div style={{
                  width: 80, height: 80, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, var(--primary), var(--teal))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontWeight: 900, color: 'white', fontSize: 14,
                  border: '4px solid white', boxShadow: 'var(--shadow-md)'
                }}>{m.year}</div>
                <div style={{ flex: 1, background: 'white', borderRadius: 12, padding: '20px 24px', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center' }}>
                  <p style={{ color: 'var(--dark-2)', fontWeight: 500, lineHeight: 1.6 }}>{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
