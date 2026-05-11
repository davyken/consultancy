import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowRight, ChevronLeft, ChevronRight, Globe, Star, Users, Award } from 'lucide-react';
import CommentsSection from '../components/CommentsSection';

function HeroCarousel({ slides }) {
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
    timerRef.current = setInterval(() => {
      go((current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [current, slides.length]);

  if (!slides || slides.length === 0) {
    return <div style={{ height: '100vh', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>Loading...</div>;
  }

  const slide = slides[current];

  return (
    <div style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden' }}>
      {/* Slides */}
      {slides.map((s, i) => (
        <div key={s.id} style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${s.bg})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: i === current ? 1 : 0,
          transition: 'opacity 0.8s ease',
          transform: i === current ? 'scale(1)' : 'scale(1.05)',
          transitionProperty: 'opacity, transform',
          transitionDuration: '5s, 5s',
        }} />
      ))}

      {/* Overlay gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(10,31,56,0.9) 0%, rgba(10,31,56,0.6) 60%, rgba(10,31,56,0.2) 100%)'
      }} />

      {/* Content */}
      <div className="container" style={{
        position: 'relative', zIndex: 2,
        height: '100%', display: 'flex', alignItems: 'center'
      }}>
        <div style={{ maxWidth: 680 }}>
          <div key={current} style={{ animation: 'fadeInUp 0.7s ease' }}>
            <div style={{
              display: 'inline-block', background: 'rgba(232,160,32,0.2)',
              border: '1px solid rgba(232,160,32,0.4)',
              borderRadius: 100, padding: '6px 18px',
              fontSize: 12, fontWeight: 700, letterSpacing: '2px',
              textTransform: 'uppercase', color: 'var(--accent)',
              marginBottom: 24
            }}>Great Rift Consultancy</div>

            <h1 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 20
            }}>{slide.title}</h1>

            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: 40, maxWidth: 560
            }}>{slide.subtitle}</p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/services" className="btn btn-accent">
                {slide.cta} <ArrowRight size={17} />
              </Link>
              <Link to="/contact" className="btn" style={{
                background: 'rgba(255,255,255,0.12)',
                color: 'white', border: '1.5px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(8px)'
              }}>Contact Us</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div style={{
        position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 10, zIndex: 3
      }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => go(i)} style={{
            width: i === current ? 32 : 10, height: 10,
            borderRadius: 5, border: 'none', cursor: 'pointer',
            background: i === current ? 'var(--accent)' : 'rgba(255,255,255,0.4)',
            transition: 'all 0.4s'
          }} />
        ))}
      </div>

      {/* Arrow controls */}
      {[
        { dir: -1, icon: ChevronLeft, style: { left: 24 } },
        { dir: 1, icon: ChevronRight, style: { right: 24 } }
      ].map(({ dir, icon: Icon, style }) => (
        <button key={dir} onClick={() => go((current + dir + slides.length) % slides.length)}
          style={{
            position: 'absolute', top: '50%', transform: 'translateY(-50%)',
            zIndex: 3, background: 'rgba(255,255,255,0.12)',
            border: '1.5px solid rgba(255,255,255,0.25)',
            borderRadius: '50%', width: 48, height: 48,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'white', backdropFilter: 'blur(8px)',
            transition: 'all 0.3s', ...style
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
        ><Icon size={22} /></button>
      ))}
    </div>
  );
}

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
    <div ref={ref} style={{
      textAlign: 'center', padding: '32px 24px',
      animation: `fadeInUp 0.6s ${delay}s both`
    }}>
      <div style={{
        width: 60, height: 60, borderRadius: 16,
        background: 'linear-gradient(135deg, var(--primary), var(--teal))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 16px'
      }}><Icon size={26} color="white" /></div>
      <div className="stat-number">{count.toLocaleString()}+</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Home() {
  const { data } = useApp();

  const whyUs = [
    { icon: '🏆', title: 'Positive Reputation', text: 'Built on track records of success and client satisfaction, earning trust and respect across the community.' },
    { icon: '🎯', title: 'Comprehensive Services', text: 'From immigration to real estate, education and language — all your global needs under one roof.' },
    { icon: '💡', title: 'Expertise & Experience', text: 'Seasoned professionals who understand the nuances of their industries and deliver tailored solutions.' },
    { icon: '🤝', title: 'Integrity & Transparency', text: 'Honest, transparent, and ethical guidance throughout every engagement — trust you can rely on.' },
    { icon: '⭐', title: 'Commitment to Excellence', text: 'High standards of professionalism that strive to exceed client expectations at every turn.' },
    { icon: '🌍', title: 'Global Reach', text: 'A network spanning 20+ countries to connect you with opportunities around the world.' },
  ];

  return (
    <div className="page-enter">
      {/* Hero */}
      <HeroCarousel slides={data.heroSlides} />

      {/* Stats */}
      <section style={{ background: 'var(--off-white)', padding: '0 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, background: 'white', borderRadius: 20, boxShadow: 'var(--shadow-md)', margin: '-40px 0 0', position: 'relative', zIndex: 5, overflow: 'hidden' }}>
            {data.stats.map((s, i) => {
              const icons = [Globe, Users, Star, Award];
              return <StatCounter key={i} value={s.value} label={s.label} icon={icons[i]} delay={i * 0.1} />;
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-pad" style={{ background: 'var(--off-white)', paddingTop: 120 }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why Choose Us</span>
            <h2 className="section-title">Built on Trust, Driven by Excellence</h2>
            <div className="divider" />
            <p className="section-subtitle">Great Rift Consultancy combines expertise, integrity, and a passion for helping clients achieve their global ambitions.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {whyUs.map((item, i) => (
              <div key={i} style={{
                background: 'white', borderRadius: 16, padding: '28px 28px',
                boxShadow: 'var(--shadow-sm)', transition: 'all 0.35s',
                borderLeft: '4px solid transparent',
                animation: `fadeInUp 0.6s ${i * 0.1}s both`
              }}
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

      {/* Services Preview */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Services</span>
            <h2 className="section-title">Comprehensive Solutions for Your Journey</h2>
            <div className="divider" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {data.services.slice(0, 3).map((s, i) => (
              <div key={s.id} style={{
                borderRadius: 20, overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)', background: 'white',
                transition: 'all 0.35s',
                animation: `fadeInUp 0.6s ${i * 0.15}s both`
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
              >
                <div style={{ height: 8, background: s.color }} />
                <div style={{ padding: '28px 24px' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--primary)', marginBottom: 10 }}>{s.title}</h4>
                  <p style={{ color: 'var(--mid-gray)', lineHeight: 1.7, fontSize: 14 }}>{s.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/services" className="btn btn-primary">View All Services <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-pad" style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 50%, var(--teal) 100%)',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-rule='evenodd'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/svg%3E")`
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div style={{ animation: 'slideInLeft 0.8s ease both' }}>
              <span style={{
                display: 'inline-block', background: 'rgba(232,160,32,0.25)',
                border: '1px solid rgba(232,160,32,0.4)', borderRadius: 100,
                padding: '6px 18px', fontSize: 12, fontWeight: 700, letterSpacing: '2px',
                textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20
              }}>About Great Rift</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'white', lineHeight: 1.2, marginBottom: 20 }}>
                Experts in Crafting Your Global Story
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, marginBottom: 16 }}>
                Great Rift Consultancy serves as a trusted partner for clients embarking on their journeys in various domains. With a commitment to excellence, integrity, and client-centric service.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, marginBottom: 32 }}>
                Our vision is to be a leading provider of integrated solutions in immigration, real estate, education services, and scholarships — empowering individuals and families to achieve their dreams worldwide.
              </p>
              <Link to="/about" className="btn btn-accent">Learn More About Us <ArrowRight size={17} /></Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, animation: 'slideInRight 0.8s ease both' }}>
              {[
                { title: 'Our Vision', text: 'To be the leading provider of integrated global solutions, empowering individuals and families to achieve their dreams worldwide.' },
                { title: 'Our Mission', text: 'Empower individuals and organizations with comprehensive services to navigate success with confidence and clarity.' },
                { title: 'Our Values', text: 'Integrity, transparency, excellence and client-centric service in every engagement.' },
                { title: 'Our Impact', text: 'Over 2,000 success stories across immigration, education and real estate with 98% satisfaction rate.' },
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 16, padding: '24px 20px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  transition: 'all 0.3s'
                }}
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

      {/* Team Preview */}
      <section className="section-pad" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Team</span>
            <h2 className="section-title">Meet the Experts Behind Your Success</h2>
            <div className="divider" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {data.members.slice(0, 4).map((m, i) => (
              <div key={m.id} style={{
                background: 'white', borderRadius: 20, overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)', textAlign: 'center',
                transition: 'all 0.35s',
                animation: `fadeInUp 0.6s ${i * 0.1}s both`
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
              >
                <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
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
            <Link to="/team" className="btn btn-primary">Meet Full Team <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Community</span>
            <h2 className="section-title">Join the Conversation</h2>
            <div className="divider" />
          </div>
          <CommentsSection />
        </div>
      </section>
    </div>
  );
}
