import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Globe, Truck, Building2, GraduationCap, Languages, Plane, ArrowRight, Phone } from 'lucide-react';

const iconMap = { Globe, Truck, Building2, GraduationCap, Languages, Plane };

const serviceDetails = {
  1: {
    steps: ['Initial consultation & assessment', 'Document preparation & verification', 'Application submission & tracking', 'Interview preparation', 'Visa approval & arrival support'],
    note: 'We handle applications for Canada, USA, UK, Germany, France and 15+ other countries.'
  },
  2: {
    steps: ['Cargo assessment & classification', 'Customs documentation', 'Port coordination & handling', 'Tracking & delivery', 'Post-delivery reporting'],
    note: 'Strong partnerships with Port of Douala and major international freight carriers.'
  },
  3: {
    steps: ['Property search & shortlisting', 'Due diligence & inspection', 'Price negotiation', 'Legal documentation', 'Title transfer & handover'],
    note: 'Serving both local and diaspora clients looking to invest in Cameroon real estate.'
  },
  4: {
    steps: ['Scholarship identification', 'Application essay coaching', 'Financial aid applications', 'Bank loan guidance', 'Pre-departure support'],
    note: 'We\'ve helped 80+ students secure scholarships across Europe and North America.'
  },
  5: {
    steps: ['Diagnostic assessment', 'Personalized study plan', 'Practice tests & feedback', 'Mock examinations', 'Exam registration support'],
    note: 'Average band score improvement of 1.5 among IELTS candidates. TEF & DELF also available.'
  },
  6: {
    steps: ['Destination & budget discussion', 'Flight search & comparison', 'Booking & confirmation', 'Check-in & baggage guidance', 'Travel tips & support'],
    note: 'We work with major airlines including Air France, Ethiopian Airlines, Brussels Airlines and more.'
  }
};

export default function Services() {
  const { data } = useApp();

  return (
    <div className="page-enter">
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span style={{ display: 'inline-block', background: 'rgba(232,160,32,0.2)', border: '1px solid rgba(232,160,32,0.4)', borderRadius: 100, padding: '6px 18px', fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>Services</span>
          <h1 className="page-hero-title">Our Services</h1>
          <p className="page-hero-sub">Comprehensive solutions tailored for your global journey</p>
        </div>
      </div>

      <section className="section-pad">
        <div className="container">
          <div className="section-header">
            <p className="section-subtitle">
              Embark on your global journey with Greatrift Consultants. Visit us in Yaoundé or reach out via phone or email.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 32 }}>
            {data.services.map((service, i) => {
              const Icon = iconMap[service.icon] || Globe;
              const details = serviceDetails[service.id] || { steps: [], note: '' };
              return (
                <div key={service.id} style={{
                  background: 'white', borderRadius: 20,
                  boxShadow: 'var(--shadow-sm)', overflow: 'hidden',
                  transition: 'all 0.35s',
                  animation: `fadeInUp 0.6s ${i * 0.1}s both`
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                >
                  <div style={{ background: service.color, padding: '28px 28px 20px' }}>
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                      <Icon size={28} color="white" />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'white', marginBottom: 8 }}>{service.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, lineHeight: 1.6 }}>{service.description}</p>
                  </div>
                  <div style={{ padding: '24px 28px' }}>
                    <h5 style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: 14, fontSize: 13, textTransform: 'uppercase', letterSpacing: '1px' }}>How It Works</h5>
                    <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {details.steps.map((step, j) => (
                        <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--dark-2)' }}>
                          <span style={{ width: 22, height: 22, borderRadius: '50%', background: `${service.color}20`, color: service.color, fontWeight: 700, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{j + 1}</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                    {details.note && (
                      <div style={{ marginTop: 16, padding: '12px 16px', background: 'var(--off-white)', borderRadius: 10, fontSize: 13, color: 'var(--mid-gray)', borderLeft: `3px solid ${service.color}` }}>
                        💡 {details.note}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div style={{
            marginTop: 80, background: 'linear-gradient(135deg, var(--primary), var(--teal))',
            borderRadius: 24, padding: '60px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden'
          }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, color: 'white', marginBottom: 16 }}>
              Ready to Start Your Journey?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 32, fontSize: 16 }}>
              Contact us for a free consultation and discover how we can help you achieve your goals.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-accent">Contact Us <ArrowRight size={17} /></Link>
              <a href="tel:+237671323248" className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)' }}>
                <Phone size={16} /> +237 671 323 248
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
