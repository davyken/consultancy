import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Shield, Eye, EyeOff, Lock, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const { adminLogin } = useApp();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!password) { setError('Please enter the admin password.'); return; }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 600));
    const success = adminLogin(password);
    setLoading(false);
    if (success) {
      navigate('/admin');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a1f38 0%, #1a3a5c 50%, #0d4a5a 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', padding: 20
    }}>
      {/* Decorative circles */}
      {[
        { size: 400, top: -100, right: -100, opacity: 0.05 },
        { size: 300, bottom: -80, left: -80, opacity: 0.06 },
        { size: 200, top: '40%', left: '10%', opacity: 0.04 },
      ].map((c, i) => (
        <div key={i} style={{
          position: 'absolute', width: c.size, height: c.size,
          borderRadius: '50%', background: 'rgba(232,160,32,1)',
          opacity: c.opacity, top: c.top, bottom: c.bottom,
          left: c.left, right: c.right, pointerEvents: 'none'
        }} />
      ))}

      <div style={{
        background: 'white', borderRadius: 28, padding: '52px 44px',
        width: '100%', maxWidth: 440,
        boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
        position: 'relative', animation: 'scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 72, height: 72, borderRadius: 20,
            overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px', boxShadow: '0 8px 24px rgba(26,58,92,0.1)'
          }}>
            <img src="/part7.jpeg" alt="Great Rift Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--primary)', marginBottom: 6 }}>
            Admin Access
          </h1>
          <p style={{ color: 'var(--mid-gray)', fontSize: 14 }}>Enter your credentials to access the dashboard</p>
        </div>

        {/* Form */}
        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Lock size={13} /> Password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="Enter admin password"
              style={{ paddingRight: 48 }}
            />
            <button onClick={() => setShowPw(!showPw)} style={{
              position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mid-gray)'
            }}>
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: 10, padding: '12px 16px', marginBottom: 16,
            display: 'flex', alignItems: 'center', gap: 10,
            color: '#ef4444', fontSize: 14, animation: 'fadeIn 0.3s ease'
          }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <button onClick={handleLogin} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} disabled={loading}>
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              Verifying...
            </span>
          ) : (
            <><Shield size={17} /> Access Dashboard</>
          )}
        </button>

        <div style={{ marginTop: 20, padding: '14px', background: 'rgba(232,160,32,0.08)', borderRadius: 10, fontSize: 13, color: 'var(--mid-gray)', textAlign: 'center' }}>
          💡 Default password: <strong style={{ color: 'var(--primary)' }}>admin123</strong>
        </div>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <a href="/" style={{ color: 'var(--mid-gray)', fontSize: 13, textDecoration: 'none' }}>← Back to Website</a>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
