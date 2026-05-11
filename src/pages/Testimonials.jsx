import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, Trash2, Plus, X } from 'lucide-react';

function StarRating({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map(s => (
        <button key={s} onClick={() => onChange && onChange(s)} style={{
          background: 'none', border: 'none', cursor: onChange ? 'pointer' : 'default',
          fontSize: 24, color: s <= value ? 'var(--accent)' : 'var(--light-gray)',
          padding: 2, transition: 'color 0.2s'
        }}>★</button>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { data, isAdmin, addTestimonial, deleteTestimonial } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', country: '', rating: 5, text: '', service: 'Immigration', avatar: '' });

  const services = ['Immigration', 'Real Estate', 'Language Services', 'Financial Aid', 'Logistics', 'Flight Booking'];

  const handleSubmit = () => {
    if (!form.name.trim() || !form.text.trim()) return;
    addTestimonial({
      ...form,
      avatar: form.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=1a3a5c&color=fff&size=100`
    });
    setForm({ name: '', country: '', rating: 5, text: '', service: 'Immigration', avatar: '' });
    setShowForm(false);
  };

  return (
    <div className="page-enter">
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span style={{ display: 'inline-block', background: 'rgba(232,160,32,0.2)', border: '1px solid rgba(232,160,32,0.4)', borderRadius: 100, padding: '6px 18px', fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>Testimonials</span>
          <h1 className="page-hero-title">Client Stories</h1>
          <p className="page-hero-sub">Real experiences from people we've helped achieve their dreams</p>
        </div>
      </div>

      <section className="section-pad">
        <div className="container">
          <div className="section-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="section-tag">Testimonials</span>
            <h2 className="section-title">What Our Clients Say</h2>
            <div className="divider" />
          </div>

          {/* Add Testimonial button */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <button onClick={() => setShowForm(!showForm)} className="btn btn-accent">
              {showForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Share Your Experience</>}
            </button>
          </div>

          {/* Add Form */}
          {showForm && (
            <div style={{
              background: 'var(--off-white)', borderRadius: 20, padding: 36,
              marginBottom: 48, border: '2px solid var(--light-gray)',
              animation: 'fadeInUp 0.4s ease'
            }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--primary)', marginBottom: 24 }}>
                Share Your Experience
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label>Your Name *</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
                </div>
                <div className="form-group">
                  <label>Country / Location</label>
                  <input value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} placeholder="e.g. Now in Canada" />
                </div>
                <div className="form-group">
                  <label>Service Used</label>
                  <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                    {services.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Your Rating</label>
                  <StarRating value={form.rating} onChange={r => setForm({ ...form, rating: r })} />
                </div>
              </div>
              <div className="form-group">
                <label>Your Testimonial *</label>
                <textarea value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} rows={4} placeholder="Share your experience with Great Rift Consultancy..." />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={handleSubmit} className="btn btn-primary" disabled={!form.name.trim() || !form.text.trim()} style={{ opacity: (!form.name.trim() || !form.text.trim()) ? 0.5 : 1 }}>
                  Submit Testimonial
                </button>
                <button onClick={() => setShowForm(false)} className="btn btn-outline">Cancel</button>
              </div>
            </div>
          )}

          {/* Testimonials Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
            {data.testimonials.map((t, i) => (
              <div key={t.id} style={{
                background: 'white', borderRadius: 20, padding: '32px 28px',
                boxShadow: 'var(--shadow-sm)', position: 'relative',
                transition: 'all 0.35s', borderTop: '4px solid var(--accent)',
                animation: `fadeInUp 0.6s ${i * 0.1}s both`
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
              >
                {/* Quote mark */}
                <div style={{ fontSize: 80, lineHeight: 0.5, color: 'var(--light-gray)', fontFamily: 'Georgia', marginBottom: 16 }}>"</div>

                <p style={{ color: 'var(--dark-2)', lineHeight: 1.8, fontSize: 15, marginBottom: 24, fontStyle: 'italic' }}>
                  "{t.text}"
                </p>

                <StarRating value={t.rating} />

                <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img src={t.avatar} alt={t.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--light-gray)' }} />
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: 15 }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--mid-gray)' }}>{t.country}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, padding: '4px 12px', background: 'rgba(13,126,121,0.1)', color: 'var(--teal)', borderRadius: 100, fontWeight: 600 }}>{t.service}</span>
                    {isAdmin && (
                      <button onClick={() => deleteTestimonial(t.id)} style={{
                        background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: 8,
                        width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: '#ef4444'
                      }}><Trash2 size={12} /></button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {data.testimonials.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--mid-gray)' }}>
              <p>No testimonials yet. Be the first to share your experience!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
