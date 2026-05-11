import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, X, Send, Settings, Minimize2 } from 'lucide-react';

export default function Chatbot() {
  const { chatbotApiKey, saveApiKey } = useApp();
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: "Hello! I'm the Great Rift Consultancy virtual assistant. I can answer your questions about our immigration, real estate, education, language services and more. How can I help you today?"
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [keyInput, setKeyInput] = useState(chatbotApiKey);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = async () => {
    const msg = input.trim();
    if (!msg) return;

    if (!chatbotApiKey) {
      setShowKeyInput(true);
      return;
    }

    setInput('');
    const newMessages = [...messages, { role: 'user', content: msg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': chatbotApiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 500,
          system: `You are a helpful virtual assistant for Great Rift Consultancy, a professional consultancy firm based in Yaoundé, Cameroon. 
          Services: Immigration, Logistics, Real Estate, Financial Aid & Scholarships, Language Services (IELTS, TEF, DELF, DAF), Flight Booking.
          Contact: +237 671 323 248 / +237 655 049 061, info@greatriftconsultancy.com.
          Location: Yaoundé Cameroon, Montée Centre.
          Be helpful, professional, and concise. Answer in the language the user writes in (English or French).`,
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await response.json();
      if (data.content && data.content[0]) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content[0].text }]);
      } else {
        throw new Error('No response');
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm sorry, I couldn't process your request. Please try again or contact us directly at +237 671 323 248."
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const saveKey = () => {
    saveApiKey(keyInput);
    setShowKeyInput(false);
  };

  return (
    <div style={{ position: 'fixed', bottom: 110, left: 32, zIndex: 985 }}>
      {/* Chat Window */}
      {open && !minimized && (
        <div style={{
          width: 360, background: 'white', borderRadius: 20,
          boxShadow: '0 20px 60px rgba(26,58,92,0.2)',
          overflow: 'hidden', animation: 'scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          transformOrigin: 'bottom left',
          display: 'flex', flexDirection: 'column', height: 500
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
            padding: '16px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}><Bot size={20} color="white" /></div>
              <div>
                <div style={{ fontWeight: 700, color: 'white', fontSize: 14 }}>GR Assistant</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                  {chatbotApiKey ? 'Online' : 'API key needed'}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => setShowKeyInput(!showKeyInput)} style={{
                background: 'rgba(255,255,255,0.15)', border: 'none',
                borderRadius: '50%', width: 28, height: 28,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'white'
              }} title="Settings"><Settings size={13} /></button>
              <button onClick={() => setMinimized(true)} style={{
                background: 'rgba(255,255,255,0.15)', border: 'none',
                borderRadius: '50%', width: 28, height: 28,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'white'
              }}><Minimize2 size={13} /></button>
              <button onClick={() => setOpen(false)} style={{
                background: 'rgba(255,255,255,0.15)', border: 'none',
                borderRadius: '50%', width: 28, height: 28,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'white'
              }}><X size={13} /></button>
            </div>
          </div>

          {/* API Key Input */}
          {showKeyInput && (
            <div style={{ padding: '12px 16px', background: '#fef9f0', borderBottom: '1px solid #fde68a' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', marginBottom: 8 }}>🔑 Enter Anthropic API Key</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="password"
                  value={keyInput}
                  onChange={e => setKeyInput(e.target.value)}
                  placeholder="sk-ant-..."
                  style={{ fontSize: 12, padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', flex: 1 }}
                />
                <button onClick={saveKey} style={{
                  background: 'var(--primary)', color: 'white',
                  border: 'none', borderRadius: 8, padding: '8px 14px',
                  fontSize: 12, fontWeight: 700, cursor: 'pointer'
                }}>Save</button>
              </div>
            </div>
          )}

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
              }}>
                {msg.role === 'assistant' && (
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary), var(--teal))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginRight: 8, marginTop: 2
                  }}><Bot size={14} color="white" /></div>
                )}
                <div style={{
                  maxWidth: '75%', padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '14px 14px 2px 14px' : '2px 14px 14px 14px',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, var(--primary), var(--primary-light))'
                    : '#f1f5f9',
                  color: msg.role === 'user' ? 'white' : 'var(--dark)',
                  fontSize: 13, lineHeight: 1.6,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary), var(--teal))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}><Bot size={14} color="white" /></div>
                <div style={{ background: '#f1f5f9', borderRadius: '2px 14px 14px 14px', padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: 'var(--primary-light)',
                        animation: `pulse 1s ${i * 0.2}s infinite`
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid var(--light-gray)', display: 'flex', gap: 8 }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about our services..."
              rows={1}
              style={{
                flex: 1, border: '2px solid var(--light-gray)', borderRadius: 12,
                padding: '10px 14px', resize: 'none', fontFamily: 'var(--font-body)',
                fontSize: 13, outline: 'none', lineHeight: 1.5
              }}
              onFocus={e => e.target.style.borderColor = 'var(--primary-light)'}
              onBlur={e => e.target.style.borderColor = 'var(--light-gray)'}
            />
            <button onClick={handleSend} disabled={loading || !input.trim()} style={{
              width: 44, height: 44, borderRadius: 12,
              background: input.trim() ? 'linear-gradient(135deg, var(--primary), var(--primary-light))' : 'var(--light-gray)',
              border: 'none', cursor: input.trim() ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: input.trim() ? 'white' : 'var(--mid-gray)',
              transition: 'all 0.25s', flexShrink: 0
            }}>
              <Send size={17} />
            </button>
          </div>
        </div>
      )}

      {/* Minimized */}
      {open && minimized && (
        <div onClick={() => setMinimized(false)} style={{
          background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
          borderRadius: 12, padding: '10px 16px',
          display: 'flex', alignItems: 'center', gap: 10,
          cursor: 'pointer', boxShadow: '0 4px 16px rgba(26,58,92,0.3)',
          color: 'white', fontSize: 14, fontWeight: 600,
          animation: 'fadeInUp 0.3s ease'
        }}>
          <Bot size={18} /> GR Assistant
          <div style={{
            width: 8, height: 8, borderRadius: '50%', background: '#4ade80'
          }} />
        </div>
      )}

      {/* FAB */}
      {!open && (
        <button onClick={() => { setOpen(true); setMinimized(false); }} style={{
          width: 56, height: 56, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--primary), var(--teal))',
          border: 'none', cursor: 'pointer',
          boxShadow: '0 6px 24px rgba(26,58,92,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', transition: 'all 0.3s',
          position: 'relative'
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <Bot size={24} />
          <div style={{
            position: 'absolute', top: -2, right: -2,
            width: 14, height: 14, borderRadius: '50%',
            background: '#4ade80', border: '2px solid white',
            animation: 'pulse 2s infinite'
          }} />
        </button>
      )}
    </div>
  );
}
