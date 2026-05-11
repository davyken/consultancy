import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, X, Send, ChevronRight } from 'lucide-react';

const prewrittenMessages = [
  "Hello! I'm interested in your immigration services.",
  "I'd like to learn more about scholarship opportunities.",
  "Can you help me with real estate services?",
  "I need language test (IELTS/TEF/DELF) preparation classes.",
  "I'd like to book a flight through your agency.",
  "Can I schedule a free consultation?",
];

export default function WhatsAppButton() {
  const { data } = useApp();
  const [open, setOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const [mode, setMode] = useState('options'); // 'options' | 'custom'

  const whatsappNumber = data.contact.whatsapp;

  const sendMessage = (msg) => {
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank');
    setOpen(false);
  };

  const handleCustomSend = () => {
    if (customMsg.trim()) sendMessage(customMsg.trim());
  };

  return (
    <div className="whatsapp-fab">
      {/* Chat popup */}
      {open && (
        <>
          <div className="overlay" onClick={() => setOpen(false)} style={{ background: 'rgba(0,0,0,0.3)', zIndex: 988 }} />
          <div style={{
            position: 'fixed', bottom: 100, right: 24,
            width: 340, background: 'white',
            borderRadius: 20, boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            zIndex: 990, overflow: 'hidden',
            animation: 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transformOrigin: 'bottom right'
          }}>
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #25d366, #128c7e)',
              padding: '20px 20px 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontWeight: 900, color: 'white', fontSize: 16
                }}>GR</div>
                <div>
                  <div style={{ fontWeight: 700, color: 'white', fontSize: 15 }}>Great Rift Consultancy</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#a7f3d0', display: 'inline-block' }} />
                    Typically replies within an hour
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{
                background: 'rgba(255,255,255,0.15)', border: 'none',
                borderRadius: '50%', width: 30, height: 30,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'white'
              }}><X size={15} /></button>
            </div>

            {/* Body */}
            <div style={{ padding: 20, background: '#ece5dd', minHeight: 100 }}>
              <div style={{
                background: 'white', borderRadius: '0 12px 12px 12px',
                padding: '12px 16px', fontSize: 14, lineHeight: 1.6,
                color: '#333', boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                marginBottom: 16, maxWidth: '85%'
              }}>
                👋 Hello! How can we help you today? Choose a topic or type your message below.
                <div style={{ fontSize: 11, color: '#999', marginTop: 4, textAlign: 'right' }}>Great Rift ✓✓</div>
              </div>
            </div>

            {/* Options */}
            {mode === 'options' && (
              <div style={{ padding: '0 16px 16px', maxHeight: 260, overflowY: 'auto' }}>
                {prewrittenMessages.map((msg, i) => (
                  <button key={i} onClick={() => sendMessage(msg)} style={{
                    width: '100%', textAlign: 'left', padding: '11px 14px',
                    marginBottom: 8, borderRadius: 10,
                    background: 'white', border: '1px solid #e5e5e5',
                    cursor: 'pointer', fontSize: 13, color: '#333',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    transition: 'all 0.2s', fontFamily: 'var(--font-body)'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#f0fdf4'; e.currentTarget.style.borderColor = '#25d366'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e5e5e5'; }}
                  >
                    {msg} <ChevronRight size={14} style={{ color: '#25d366', flexShrink: 0 }} />
                  </button>
                ))}
                <button onClick={() => setMode('custom')} style={{
                  width: '100%', padding: '11px 14px',
                  background: 'linear-gradient(135deg, #25d366, #128c7e)',
                  border: 'none', borderRadius: 10, cursor: 'pointer',
                  color: 'white', fontSize: 13, fontWeight: 600,
                  fontFamily: 'var(--font-body)'
                }}>✏️ Type a custom message</button>
              </div>
            )}

            {mode === 'custom' && (
              <div style={{ padding: '0 16px 16px' }}>
                <button onClick={() => setMode('options')} style={{
                  background: 'none', border: 'none', color: '#25d366',
                  cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  padding: '8px 0', display: 'flex', alignItems: 'center', gap: 4,
                  fontFamily: 'var(--font-body)'
                }}>← Back to options</button>
                <textarea
                  value={customMsg}
                  onChange={e => setCustomMsg(e.target.value)}
                  placeholder="Type your message here..."
                  rows={3}
                  style={{
                    width: '100%', border: '2px solid #e5e5e5', borderRadius: 10,
                    padding: '12px 14px', resize: 'none', fontFamily: 'var(--font-body)',
                    fontSize: 14, outline: 'none'
                  }}
                  onFocus={e => e.target.style.borderColor = '#25d366'}
                  onBlur={e => e.target.style.borderColor = '#e5e5e5'}
                />
                <button onClick={handleCustomSend} style={{
                  width: '100%', marginTop: 8,
                  background: 'linear-gradient(135deg, #25d366, #128c7e)',
                  border: 'none', borderRadius: 10, padding: '13px',
                  color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: 14,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  fontFamily: 'var(--font-body)'
                }}>
                  <Send size={16} /> Send via WhatsApp
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* FAB */}
      <button onClick={() => setOpen(!open)} style={{
        width: 60, height: 60, borderRadius: '50%',
        background: open ? '#dc2626' : 'linear-gradient(135deg, #25d366, #128c7e)',
        border: 'none', cursor: 'pointer', boxShadow: '0 6px 24px rgba(37,211,102,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: open ? 'scale(0.9)' : 'scale(1)',
        animation: !open ? 'pulse 2.5s infinite' : 'none'
      }}>
        {open ? <X size={24} /> : <MessageCircle size={26} fill="white" />}
      </button>

      {/* Tooltip */}
      {!open && (
        <div style={{
          position: 'absolute', right: 70, bottom: 15,
          background: '#333', color: 'white',
          padding: '8px 14px', borderRadius: 100,
          fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
          pointerEvents: 'none',
          animation: 'fadeIn 0.5s 1s both'
        }}>💬 Chat with us</div>
      )}
    </div>
  );
}
