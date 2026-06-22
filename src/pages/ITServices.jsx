import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe, Smartphone, Code2, Search, Mail, Cloud,
  ArrowRight, Check, Phone, Zap, Shield, TrendingUp,
  Monitor, Database, Server, Layers
} from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Website Development',
    desc: 'Professional corporate websites, e-commerce stores, portfolios and landing pages built for performance and conversion.',
    features: ['Corporate Sites', 'E-commerce Stores', 'Portfolio Sites', 'Landing Pages', 'Blog & CMS'],
    color: '#1a3a5c',
  },
  {
    icon: Code2,
    title: 'Web Applications',
    desc: 'Custom web apps, SaaS platforms, CRM and ERP systems — scalable solutions that power your business operations.',
    features: ['Custom SaaS', 'CRM / ERP', 'Admin Dashboards', 'API Integrations', 'Real-time Apps'],
    color: '#2563a8',
  },
  {
    icon: Smartphone,
    title: 'Mobile Applications',
    desc: 'Cross-platform mobile apps for iOS and Android using Flutter and React Native with modern UX.',
    features: ['iOS & Android', 'Flutter Apps', 'React Native', 'App Store Deploy', 'Push Notifications'],
    color: '#0d7e79',
  },
  {
    icon: Search,
    title: 'SEO Optimization',
    desc: 'Rank higher on Google. We optimize your site for search engines to drive consistent organic traffic.',
    features: ['Technical SEO', 'On-Page SEO', 'Keyword Research', 'Analytics Setup', 'Core Web Vitals'],
    color: '#7c3aed',
  },
  {
    icon: Mail,
    title: 'Professional Email & Domain',
    desc: 'Get a custom domain and professional email (you@yourcompany.com) that builds trust with clients.',
    features: ['Custom Domain', 'Business Email', 'DNS Configuration', 'SSL Certificate', 'Email Migration'],
    color: '#e8a020',
  },
  {
    icon: Cloud,
    title: 'Hosting & Deployment',
    desc: 'Fast, secure and reliable cloud hosting. We handle the infrastructure so you can focus on growth.',
    features: ['Cloud Hosting', 'VPS Servers', 'CDN & Speed', 'HTTPS / SSL', '24/7 Monitoring'],
    color: '#059669',
  },
];

const techStack = [
  { name: 'React', icon: '⚛️', cat: 'Frontend' },
  { name: 'Next.js', icon: '▲', cat: 'Frontend' },
  { name: 'Flutter', icon: '🐦', cat: 'Mobile' },
  { name: 'React Native', icon: '📱', cat: 'Mobile' },
  { name: 'Node.js', icon: '🟢', cat: 'Backend' },
  { name: 'Python', icon: '🐍', cat: 'Backend' },
  { name: 'PostgreSQL', icon: '🐘', cat: 'Database' },
  { name: 'MongoDB', icon: '🍃', cat: 'Database' },
  { name: 'Tailwind CSS', icon: '🎨', cat: 'Styling' },
  { name: 'Docker', icon: '🐳', cat: 'DevOps' },
  { name: 'GitHub', icon: '🐙', cat: 'DevOps' },
  { name: 'Vercel', icon: '▲', cat: 'Hosting' },
];

const process = [
  { step: '01', title: 'Discovery Call', desc: 'We listen to your needs, goals and vision for the project.' },
  { step: '02', title: 'Proposal & Design', desc: 'We deliver a detailed proposal with mockups and timeline.' },
  { step: '03', title: 'Development', desc: 'Our team builds your solution with clean, modern code.' },
  { step: '04', title: 'Testing & Review', desc: 'Thorough testing across devices and browsers before launch.' },
  { step: '05', title: 'Launch', desc: 'We deploy, configure your domain, SSL and go live.' },
  { step: '06', title: 'Support & Growth', desc: 'Ongoing support, updates and SEO to keep you growing.' },
];

const whyUs = [
  { icon: Zap, title: 'Fast Delivery', desc: 'Most projects delivered within 1–4 weeks.' },
  { icon: Shield, title: 'Secure Code', desc: 'Security-first development, OWASP compliant.' },
  { icon: TrendingUp, title: 'SEO-Ready', desc: 'Every site we build is optimized for search engines.' },
  { icon: Layers, title: 'Modern Stack', desc: 'We use the latest technologies for performance and scale.' },
];

export default function ITServices() {
  const [hoveredService, setHoveredService] = useState(null);

  return (
    <div className="page-enter">
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1a3a5c 40%, #0d7e79 100%)',
        padding: '140px 0 100px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Grid pattern */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.06,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        {/* Glow orbs */}
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'rgba(37,99,168,0.2)', top: -200, right: -100, filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'rgba(13,126,121,0.25)', bottom: -100, left: 100, filter: 'blur(60px)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 720 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(232,160,32,0.15)', border: '1px solid rgba(232,160,32,0.4)',
              borderRadius: 100, padding: '7px 20px', marginBottom: 28
            }}>
              <Monitor size={14} color="var(--accent)" />
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)' }}>IT Services</span>
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 24,
            }}>
              Transform Your Business<br />
              <span style={{ color: 'var(--accent)' }}>with Technology</span>
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, marginBottom: 40, maxWidth: 580 }}>
              We build modern websites, web applications and mobile apps that grow your business — with SEO, professional email, domain and hosting all included.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-accent">Get a Free Quote <ArrowRight size={17} /></Link>
              <a href="tel:+237671323248" className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1.5px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}>
                <Phone size={16} /> Call Us Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Why Us stats bar */}
      <section style={{ background: 'white', borderBottom: '1px solid var(--light-gray)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {whyUs.map((w, i) => (
              <div key={i} style={{
                padding: '36px 28px', textAlign: 'center',
                borderRight: i < 3 ? '1px solid var(--light-gray)' : 'none',
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: 'linear-gradient(135deg, var(--primary), var(--teal))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 14px'
                }}>
                  <w.icon size={22} color="white" />
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--primary)', marginBottom: 6 }}>{w.title}</div>
                <div style={{ fontSize: 13, color: 'var(--mid-gray)', lineHeight: 1.5 }}>{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-pad" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">What We Offer</span>
            <h2 className="section-title">Complete IT Solutions</h2>
            <div className="divider" />
            <p className="section-subtitle">From a simple landing page to a full enterprise application — we build it all with modern technologies and best practices.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
            {services.map((s, i) => (
              <div key={i}
                onMouseEnter={() => setHoveredService(i)}
                onMouseLeave={() => setHoveredService(null)}
                style={{
                  background: 'white', borderRadius: 20,
                  boxShadow: hoveredService === i ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                  transform: hoveredService === i ? 'translateY(-6px)' : 'none',
                  transition: 'all 0.35s',
                  overflow: 'hidden',
                  animation: `fadeInUp 0.6s ${i * 0.08}s both`,
                }}>
                <div style={{ height: 6, background: s.color }} />
                <div style={{ padding: '28px 28px' }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 16,
                    background: `${s.color}18`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 18
                  }}>
                    <s.icon size={26} color={s.color} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--primary)', marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ color: 'var(--mid-gray)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{s.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {s.features.map((f, j) => (
                      <span key={j} style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        padding: '5px 12px', borderRadius: 100,
                        background: `${s.color}12`, color: s.color,
                        fontSize: 12, fontWeight: 600
                      }}>
                        <Check size={11} /> {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Technologies</span>
            <h2 className="section-title">Modern Tech Stack</h2>
            <div className="divider" />
            <p className="section-subtitle">We use the latest and most reliable technologies to build fast, scalable and maintainable solutions.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 16 }}>
            {techStack.map((t, i) => (
              <div key={i} style={{
                background: 'var(--off-white)', borderRadius: 16, padding: '20px 16px',
                textAlign: 'center', border: '1.5px solid var(--light-gray)',
                transition: 'all 0.3s', animation: `fadeInUp 0.5s ${i * 0.04}s both`,
                cursor: 'default',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary-light)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--light-gray)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{t.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--primary)' }}>{t.name}</div>
                <div style={{ fontSize: 11, color: 'var(--mid-gray)', marginTop: 3 }}>{t.cat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="section-pad" style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, #0f172a 100%)',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-rule='evenodd'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="container" style={{ position: 'relative' }}>
          <div className="section-header">
            <span style={{ display: 'inline-block', background: 'rgba(232,160,32,0.2)', border: '1px solid rgba(232,160,32,0.35)', borderRadius: 100, padding: '6px 18px', fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>How It Works</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, color: 'white', marginBottom: 16 }}>Our Process</h2>
            <div className="divider" />
            <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 500, margin: '0 auto', fontSize: '1.05rem' }}>Simple, transparent and collaborative — from first call to launch.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            {process.map((p, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 18, padding: '28px 24px',
                animation: `fadeInUp 0.6s ${i * 0.1}s both`,
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.13)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
              >
                <div style={{ fontSize: 36, fontWeight: 900, color: 'var(--accent)', opacity: 0.5, fontFamily: 'var(--font-display)', marginBottom: 12 }}>{p.step}</div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'white', fontSize: 16, marginBottom: 8 }}>{p.title}</h4>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, var(--accent) 0%, #f5c35a 100%)',
            borderRadius: 28, padding: '64px 48px', textAlign: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', top: -80, right: -60 }} />
            <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', bottom: -60, left: 40 }} />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: 'var(--primary)', marginBottom: 14 }}>
                Ready to Build Something Great?
              </h3>
              <p style={{ color: 'rgba(26,58,92,0.75)', fontSize: 16, marginBottom: 36, maxWidth: 500, margin: '0 auto 36px' }}>
                Contact us for a free consultation. We'll analyze your needs and give you a transparent quote within 24 hours.
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn" style={{ background: 'var(--primary)', color: 'white', boxShadow: '0 8px 32px rgba(26,58,92,0.35)' }}>
                  Request a Quote <ArrowRight size={17} />
                </Link>
                <a href="https://wa.me/237671323248" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: 'white', color: 'var(--primary)', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
