import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Edit2, Trash2, Send, MessageSquare, X, Check } from 'lucide-react';

export default function CommentsSection() {
  const { data, isAdmin, addComment, updateComment, deleteComment } = useApp();
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editingAuthor, setEditingAuthor] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !text.trim()) return;
    addComment({ author: name.trim(), text: text.trim() });
    setName('');
    setText('');
  };

  const startEdit = (comment) => {
    setEditId(comment._id);
    setEditText(comment.text);
    setEditingAuthor(comment.author);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      updateComment(editId, editText.trim());
    }
    setEditId(null);
  };

  const cancelEdit = () => { setEditId(null); };

  return (
    <div>
      {/* Comment Form */}
      <div style={{
        background: 'var(--off-white)', borderRadius: 20,
        padding: '32px', marginBottom: 40,
        border: '2px solid var(--light-gray)'
      }}>
        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--primary)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
          <MessageSquare size={20} color="var(--accent)" /> Leave a Comment
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Your Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name..." />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Country / City (optional)</label>
            <input placeholder="e.g. Yaoundé, Cameroon" />
          </div>
        </div>
        <div className="form-group">
          <label>Your Message</label>
          <textarea value={text} onChange={e => setText(e.target.value)} rows={3} placeholder="Share your experience or thoughts..." />
        </div>
        <button onClick={handleSubmit} className="btn btn-primary" disabled={!name.trim() || !text.trim()} style={{ opacity: (!name.trim() || !text.trim()) ? 0.5 : 1 }}>
          <Send size={16} /> Post Comment
        </button>
      </div>

      {/* Comments List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {data.comments.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px', color: 'var(--mid-gray)' }}>
            <MessageSquare size={40} style={{ marginBottom: 12, opacity: 0.4 }} />
            <p>No comments yet. Be the first to share!</p>
          </div>
        )}
        {[...data.comments].reverse().map((comment) => (
          <div key={comment._id} style={{
            background: 'white', borderRadius: 16, padding: '20px 24px',
            boxShadow: 'var(--shadow-sm)', border: '1px solid var(--light-gray)',
            transition: 'all 0.3s',
            animation: 'fadeInUp 0.4s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary), var(--teal))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontWeight: 700, color: 'white', fontSize: 16
                }}>{comment.author[0].toUpperCase()}</div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: 15 }}>
                    {comment.author}
                    {comment.edited && <span style={{ fontSize: 11, color: 'var(--mid-gray)', fontWeight: 400, marginLeft: 8 }}>(edited)</span>}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--mid-gray)' }}>{comment.date}</div>
                </div>
              </div>
              {isAdmin && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => startEdit(comment)} style={{
                    background: 'rgba(37,99,168,0.1)', border: 'none', borderRadius: 8,
                    width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'var(--primary-light)', transition: 'all 0.2s'
                  }}><Edit2 size={14} /></button>
                  <button onClick={() => deleteComment(comment._id)} style={{
                    background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: 8,
                    width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: '#ef4444', transition: 'all 0.2s'
                  }}><Trash2 size={14} /></button>
                </div>
              )}
            </div>

            {editId === comment._id ? (
              <div>
                <textarea
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  rows={3}
                  style={{ marginBottom: 10 }}
                />
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={saveEdit} className="btn btn-primary btn-sm"><Check size={14} /> Save</button>
                  <button onClick={cancelEdit} className="btn btn-outline btn-sm"><X size={14} /> Cancel</button>
                </div>
              </div>
            ) : (
              <p style={{ color: 'var(--dark-2)', lineHeight: 1.7, fontSize: 15 }}>{comment.text}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
