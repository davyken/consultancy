import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Tag, CheckCircle, Clock } from 'lucide-react';

const categories = ['All', 'Immigration', 'Real Estate', 'Education', 'Logistics', 'Language', 'Business'];

export default function Projects() {
  const { data } = useApp();
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? data.projects : data.projects.filter(p => p.category === filter);

  return (
    <div className="page-enter">
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span style={{ display: 'inline-block', background: 'rgba(232,160,32,0.2)', border: '1px solid rgba(232,160,32,0.4)', borderRadius: 100, padding: '6px 18px', fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>Projects</span>
          <h1 className="page-hero-title">Our Projects</h1>
          <p className="page-hero-sub">Real impact for real people across the globe</p>
        </div>
      </div>

      <section className="section-pad">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Case Studies</span>
            <h2 className="section-title">Stories of Success</h2>
            <div className="divider" />
            <p className="section-subtitle">Each project represents a life changed, a dream fulfilled, or a community empowered.</p>
          </div>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} style={{
                padding: '10px 22px', borderRadius: 100, border: 'none',
                cursor: 'pointer', fontSize: 14, fontWeight: 600,
                background: filter === cat ? 'linear-gradient(135deg, var(--primary), var(--primary-light))' : 'white',
                color: filter === cat ? 'white' : 'var(--primary)',
                boxShadow: filter === cat ? '0 4px 16px rgba(37,99,168,0.35)' : 'var(--shadow-sm)',
                transition: 'all 0.3s', fontFamily: 'var(--font-body)'
              }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 28 }}>
            {filtered.map((project, i) => (
              <div key={project.id} style={{
                background: 'white', borderRadius: 20, overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)', transition: 'all 0.35s',
                animation: `fadeInUp 0.6s ${i * 0.1}s both`
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
              >
                <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                  <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                    onMouseEnter={e => { e.target.style.transform = 'scale(1.1)'; }}
                    onMouseLeave={e => { e.target.style.transform = 'scale(1)'; }}
                  />
                  <div style={{
                    position: 'absolute', top: 16, right: 16,
                    background: project.status === 'Completed' ? 'var(--teal)' : 'var(--accent)',
                    color: 'white', padding: '5px 14px', borderRadius: 100,
                    fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5
                  }}>
                    {project.status === 'Completed' ? <CheckCircle size={12} /> : <Clock size={12} />}
                    {project.status}
                  </div>
                  <div style={{
                    position: 'absolute', top: 16, left: 16,
                    background: 'rgba(26,58,92,0.85)', backdropFilter: 'blur(4px)',
                    color: 'white', padding: '5px 14px', borderRadius: 100,
                    fontSize: 12, fontWeight: 600
                  }}>
                    {project.category}
                  </div>
                </div>
                <div style={{ padding: '24px' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--primary)', marginBottom: 10 }}>{project.title}</h4>
                  <p style={{ color: 'var(--mid-gray)', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{project.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13, color: 'var(--mid-gray)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Calendar size={14} color="var(--accent)" /> {project.year}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Tag size={14} color="var(--teal)" /> {project.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--mid-gray)' }}>
              <p style={{ fontSize: 18 }}>No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
