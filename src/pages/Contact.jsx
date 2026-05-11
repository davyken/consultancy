import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Mail, Facebook, Instagram, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const { data, showToast } = useApp();
  const { contact } = data;
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);

  const services = ['Immigration Services', 'Logistics', 'Real Estate', 'Financial Aid & Scholarships', 'Language Services', 'Flight Booking', 'Other'];

  const handleSubmit = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      showToast('Please fill all required fields.', 'error');
      return;
    }
    // In a real app, send to backend. Here we simulate.
    setSent(true);
    showToast('Message sent! We will contact you soon.');
    setForm({ name: '', email: '', phone: '', service: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  const contactItems = [
    { icon: MapPin, label: 'Our Office', value: contact.address, color: 'var(--primary)' },
    { icon: Phone, label: 'Phone 1', value: contact.phone1, href: `tel:${contact.phone1}`, color: 'var(--teal)' },
    { icon: Phone, label: 'Phone 2', value: contact.phone2, href: `tel:${contact.phone2}`, color: 'var(--teal)' },
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}`, color: 'var(--accent)' },
  ];

  return (
    <div className="page-enter">
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span style={{ display: 'inline-block', background: 'rgba(232,160,32,0.2)', border: '1px solid rgba(232,160,32,0.4)', borderRadius: 100, padding: '6px 18px', fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>Contact</span>
          <h1 className="page-hero-title">Get In Touch</h1>
          <p className="page-hero-sub">We're here to help you navigate your global journey</p>
        </div>
      </div>

      <section className="section-pad">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 60, alignItems: 'start' }}>

            {/* Contact Info */}
            <div style={{ animation: 'slideInLeft 0.8s ease both' }}>
              <span className="section-tag">Reach Us</span>
              <h2 className="section-title" style={{ textAlign: 'left', marginTop: 12 }}>Let's Start a Conversation</h2>
              <p style={{ color: 'var(--mid-gray)', lineHeight: 1.8, marginBottom: 36 }}>
                Whether you have questions about our services, need guidance, or simply want to learn more — we're ready to help.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
                {contactItems.map(({ icon: Icon, label, value, href, color }, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '18px 20px', background: 'var(--off-white)', borderRadius: 14, transition: 'all 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--off-white)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={20} color={color} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--mid-gray)', marginBottom: 4 }}>{label}</div>
                      {href ? (
                        <a href={href} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', fontSize: 15 }}>{value}</a>
                      ) : (
                        <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 15 }}>{value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div>
                <h5 style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: 14, fontSize: 13, textTransform: 'uppercase', letterSpacing: '1px' }}>Follow Us</h5>
                <div style={{ display: 'flex', gap: 12 }}>
                  {[
                    { icon: Facebook, href: contact.facebook, label: 'Facebook', color: '#1877f2', bg: 'rgba(24,119,242,0.1)' },
                    { icon: Instagram, href: contact.instagram, label: 'Instagram', color: '#e1306c', bg: 'rgba(225,48,108,0.1)' },
                  ].map(({ icon: Icon, href, label, color, bg }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '10px 18px', borderRadius: 100,
                      background: bg, color: color,
                      textDecoration: 'none', fontSize: 14, fontWeight: 600,
                      transition: 'all 0.3s'
                    }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
                    >
                      <Icon size={18} /> {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Business hours */}
              <div style={{ marginTop: 36, background: 'var(--off-white)', borderRadius: 14, padding: '20px 24px' }}>
                <h5 style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: 14, fontSize: 14 }}>Business Hours</h5>
                {[
                  ['Monday – Friday', '8:00 AM – 6:00 PM'],
                  ['Saturday', '9:00 AM – 2:00 PM'],
                  ['Sunday', 'Closed'],
                ].map(([day, hours]) => (
                  <div key={day} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
                    <span style={{ color: 'var(--dark-2)' }}>{day}</span>
                    <span style={{ color: 'var(--mid-gray)', fontWeight: 500 }}>{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div style={{ animation: 'slideInRight 0.8s ease both' }}>
              <div style={{ background: 'white', borderRadius: 24, padding: '44px', boxShadow: 'var(--shadow-md)' }}>
                {sent ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <CheckCircle size={64} color="var(--teal)" style={{ marginBottom: 20 }} />
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--primary)', marginBottom: 12 }}>Message Sent!</h3>
                    <p style={{ color: 'var(--mid-gray)' }}>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--primary)', marginBottom: 28 }}>
                      Send Us a Message
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div className="form-group">
                        <label>Full Name *</label>
                        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
                      </div>
                      <div className="form-group">
                        <label>Email Address *</label>
                        <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+237 ..." />
                      </div>
                      <div className="form-group">
                        <label>Service of Interest</label>
                        <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                          <option value="">Select a service...</option>
                          {services.map(s => <option key={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Your Message *</label>
                      <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5} placeholder="Tell us about your needs and how we can help..." />
                    </div>
                    <button onClick={handleSubmit} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                      <Send size={17} /> Send Message
                    </button>
                    <p style={{ fontSize: 12, color: 'var(--mid-gray)', textAlign: 'center', marginTop: 14 }}>
                      We'll respond within 24 business hours.
                    </p>
                  </>
                )}
              </div>

              {/* Map placeholder */}
              <div style={{
                marginTop: 24, borderRadius: 20, overflow: 'hidden',
                height: 220, background: 'linear-gradient(135deg, var(--primary), var(--teal))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', color: 'white', gap: 10
              }}>
                <MapPin size={36} />
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700 }}>Yaoundé, Cameroon</div>
                <div style={{ fontSize: 13, opacity: 0.8 }}>Montée Centre</div>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{
                  marginTop: 8, padding: '8px 20px', background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.3)', borderRadius: 100,
                  color: 'white', textDecoration: 'none', fontSize: 13, fontWeight: 600
                }}>Open in Maps</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
