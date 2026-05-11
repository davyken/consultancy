import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard, Users, Briefcase, FolderOpen, Handshake,
  MessageSquare, Star, Settings, LogOut, Plus, Edit2, Trash2,
  X, Check, Eye, ChevronRight, Key, Globe, Truck, Building2,
  GraduationCap, Languages, Plane, Save
} from 'lucide-react';

const iconOptions = ['Globe', 'Truck', 'Building2', 'GraduationCap', 'Languages', 'Plane'];
const colorOptions = ['#1a3a5c', '#0d7e79', '#2563a8', '#e8a020', '#7c3aed', '#059669', '#dc2626', '#0891b2'];
const statusOptions = ['Ongoing', 'Completed', 'Planned'];
const categoryOptions = ['Immigration', 'Real Estate', 'Education', 'Logistics', 'Language', 'Business'];

// ── Sidebar ──────────────────────────────────────────────────────────────────
const menuItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'members', label: 'Team Members', icon: Users },
  { id: 'services', label: 'Services', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'partners', label: 'Partners', icon: Handshake },
  { id: 'comments', label: 'Comments', icon: MessageSquare },
  { id: 'testimonials', label: 'Testimonials', icon: Star },
  { id: 'settings', label: 'Settings', icon: Settings },
];

function Sidebar({ active, setActive, onLogout }) {
  return (
    <aside style={{
      width: 260, background: 'linear-gradient(180deg, #0a1f38 0%, #1a3a5c 100%)',
      height: '100vh', position: 'fixed', left: 0, top: 0,
      display: 'flex', flexDirection: 'column', zIndex: 100
    }}>
      {/* Logo */}
      <div style={{ padding: '28px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}>
            <img src="/part7.jpeg" alt="Great Rift Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'white', fontSize: 15 }}>Great Rift</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '1px', textTransform: 'uppercase' }}>Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        {menuItems.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActive(id)} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 14px', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: active === id ? 'rgba(232,160,32,0.15)' : 'transparent',
            color: active === id ? 'var(--accent)' : 'rgba(255,255,255,0.65)',
            fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: active === id ? 700 : 500,
            marginBottom: 4, textAlign: 'left', transition: 'all 0.25s',
            borderLeft: active === id ? '3px solid var(--accent)' : '3px solid transparent'
          }}
            onMouseEnter={e => { if (active !== id) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
            onMouseLeave={e => { if (active !== id) e.currentTarget.style.background = 'transparent'; }}
          >
            <Icon size={18} /> {label}
            {active === id && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button onClick={onLogout} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 14px', borderRadius: 10, border: 'none', cursor: 'pointer',
          background: 'rgba(239,68,68,0.1)', color: '#f87171',
          fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600
        }}>
          <LogOut size={18} /> Logout
        </button>
        <a href="/" style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 14px', borderRadius: 10, marginTop: 6,
          color: 'rgba(255,255,255,0.45)', fontSize: 13, textDecoration: 'none'
        }}>
          <Eye size={15} /> View Website
        </a>
      </div>
    </aside>
  );
}

// ── Generic Modal ─────────────────────────────────────────────────────────────
function Modal({ title, children, onClose }) {
  return (
    <div className="modal">
      <div className="overlay" onClick={onClose} />
      <div className="modal-box" style={{ zIndex: 1000, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h3 className="modal-title" style={{ margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mid-gray)' }}><X size={22} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── Overview ──────────────────────────────────────────────────────────────────
function Overview({ data, setActive }) {
  const cards = [
    { label: 'Team Members', value: data.members.length, icon: Users, color: 'var(--primary)', tab: 'members' },
    { label: 'Services', value: data.services.length, icon: Briefcase, color: 'var(--teal)', tab: 'services' },
    { label: 'Projects', value: data.projects.length, icon: FolderOpen, color: 'var(--accent)', tab: 'projects' },
    { label: 'Partners', value: data.partners.length, icon: Handshake, color: '#7c3aed', tab: 'partners' },
    { label: 'Comments', value: data.comments.length, icon: MessageSquare, color: '#059669', tab: 'comments' },
    { label: 'Testimonials', value: data.testimonials.length, icon: Star, color: '#dc2626', tab: 'testimonials' },
  ];
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--primary)', marginBottom: 8 }}>Dashboard Overview</h2>
      <p style={{ color: 'var(--mid-gray)', marginBottom: 36 }}>Manage your website content from one place.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
        {cards.map(({ label, value, icon: Icon, color, tab }) => (
          <div key={label} onClick={() => setActive(tab)} style={{
            background: 'white', borderRadius: 16, padding: '24px 20px',
            boxShadow: 'var(--shadow-sm)', cursor: 'pointer', transition: 'all 0.3s',
            borderLeft: `4px solid ${color}`
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
          >
            <Icon size={28} color={color} style={{ marginBottom: 12 }} />
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: 13, color: 'var(--mid-gray)', marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 36, background: 'linear-gradient(135deg, var(--primary), var(--teal))', borderRadius: 20, padding: '28px 32px', color: 'white' }}>
        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', marginBottom: 8 }}>Quick Actions</h4>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[['members', 'Add Member'], ['projects', 'Add Project'], ['partners', 'Add Partner'], ['services', 'Add Service']].map(([tab, label]) => (
            <button key={tab} onClick={() => setActive(tab)} style={{
              background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
              color: 'white', borderRadius: 100, padding: '9px 18px', cursor: 'pointer',
              fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-body)', transition: 'all 0.25s',
              display: 'flex', alignItems: 'center', gap: 6
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
            ><Plus size={14} /> {label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Members Tab ───────────────────────────────────────────────────────────────
function MembersTab() {
  const { data, addMember, updateMember, deleteMember } = useApp();
  const [modal, setModal] = useState(null); // null | 'add' | {member}
  const empty = { name: '', role: '', image: '', bio: '', email: '' };
  const [form, setForm] = useState(empty);

  const openAdd = () => { setForm(empty); setModal('add'); };
  const openEdit = (m) => { setForm({ ...m }); setModal(m); };
  const close = () => setModal(null);

  const save = () => {
    if (!form.name.trim()) return;
    if (modal === 'add') addMember(form);
    else updateMember(modal.id, form);
    close();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--primary)' }}>Team Members</h2>
          <p style={{ color: 'var(--mid-gray)', fontSize: 14, marginTop: 4 }}>{data.members.length} members</p>
        </div>
        <button onClick={openAdd} className="btn btn-primary btn-sm"><Plus size={16} /> Add Member</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {data.members.map(m => (
          <div key={m.id} style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ height: 140, overflow: 'hidden', background: 'var(--light-gray)' }}>
              {m.image && <img src={m.image} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            </div>
            <div style={{ padding: '16px 18px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--primary)', fontSize: 15, marginBottom: 2 }}>{m.name}</div>
              <div style={{ fontSize: 12, color: 'var(--teal)', fontWeight: 600, marginBottom: 8 }}>{m.role}</div>
              <p style={{ fontSize: 13, color: 'var(--mid-gray)', lineHeight: 1.5, marginBottom: 14 }}>{m.bio?.slice(0, 80)}...</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => openEdit(m)} style={{ flex: 1, padding: '8px', background: 'rgba(37,99,168,0.08)', border: 'none', borderRadius: 8, cursor: 'pointer', color: 'var(--primary-light)', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontFamily: 'var(--font-body)' }}><Edit2 size={13} /> Edit</button>
                <button onClick={() => deleteMember(m.id)} style={{ flex: 1, padding: '8px', background: 'rgba(239,68,68,0.08)', border: 'none', borderRadius: 8, cursor: 'pointer', color: '#ef4444', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontFamily: 'var(--font-body)' }}><Trash2 size={13} /> Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <Modal title={modal === 'add' ? 'Add Team Member' : 'Edit Member'} onClose={close}>
          {[
            ['name', 'Full Name *', 'text', 'Enter full name'],
            ['role', 'Role / Position *', 'text', 'e.g. Managing Director'],
            ['email', 'Email', 'email', 'email@example.com'],
            ['image', 'Profile Image URL', 'text', 'https://...'],
          ].map(([key, label, type, placeholder]) => (
            <div className="form-group" key={key}>
              <label>{label}</label>
              <input type={type} value={form[key] || ''} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} />
            </div>
          ))}
          <div className="form-group">
            <label>Bio / Description</label>
            <textarea value={form.bio || ''} onChange={e => setForm({ ...form, bio: e.target.value })} rows={3} placeholder="Brief description..." />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={save} className="btn btn-primary"><Save size={15} /> Save</button>
            <button onClick={close} className="btn btn-outline">Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Services Tab ──────────────────────────────────────────────────────────────
function ServicesTab() {
  const { data, addService, updateService, deleteService } = useApp();
  const [modal, setModal] = useState(null);
  const empty = { title: '', icon: 'Globe', description: '', color: '#1a3a5c' };
  const [form, setForm] = useState(empty);

  const openAdd = () => { setForm(empty); setModal('add'); };
  const openEdit = (s) => { setForm({ ...s }); setModal(s); };
  const close = () => setModal(null);
  const save = () => {
    if (!form.title.trim()) return;
    if (modal === 'add') addService(form);
    else updateService(modal.id, form);
    close();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--primary)' }}>Services</h2>
          <p style={{ color: 'var(--mid-gray)', fontSize: 14, marginTop: 4 }}>{data.services.length} services</p>
        </div>
        <button onClick={openAdd} className="btn btn-primary btn-sm"><Plus size={16} /> Add Service</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {data.services.map(s => (
          <div key={s.id} style={{ background: 'white', borderRadius: 14, padding: '18px 20px', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: 16, borderLeft: `4px solid ${s.color}` }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: `${s.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: s.color }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: 15 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: 'var(--mid-gray)', marginTop: 2 }}>{s.description.slice(0, 100)}...</div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button onClick={() => openEdit(s)} style={{ padding: '8px 14px', background: 'rgba(37,99,168,0.08)', border: 'none', borderRadius: 8, cursor: 'pointer', color: 'var(--primary-light)', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-body)' }}><Edit2 size={13} /> Edit</button>
              <button onClick={() => deleteService(s.id)} style={{ padding: '8px 14px', background: 'rgba(239,68,68,0.08)', border: 'none', borderRadius: 8, cursor: 'pointer', color: '#ef4444', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-body)' }}><Trash2 size={13} /> Delete</button>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <Modal title={modal === 'add' ? 'Add Service' : 'Edit Service'} onClose={close}>
          <div className="form-group">
            <label>Service Title *</label>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Immigration Services" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Describe this service..." />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label>Icon</label>
              <select value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })}>
                {iconOptions.map(i => <option key={i}>{i}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Color</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
                {colorOptions.map(c => (
                  <button key={c} onClick={() => setForm({ ...form, color: c })} style={{
                    width: 28, height: 28, borderRadius: '50%', background: c, border: form.color === c ? '3px solid var(--dark)' : '2px solid white',
                    cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
                  }} />
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={save} className="btn btn-primary"><Save size={15} /> Save</button>
            <button onClick={close} className="btn btn-outline">Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Projects Tab ──────────────────────────────────────────────────────────────
function ProjectsTab() {
  const { data, addProject, updateProject, deleteProject } = useApp();
  const [modal, setModal] = useState(null);
  const empty = { title: '', category: 'Immigration', description: '', image: '', year: new Date().getFullYear().toString(), status: 'Ongoing' };
  const [form, setForm] = useState(empty);

  const openAdd = () => { setForm(empty); setModal('add'); };
  const openEdit = (p) => { setForm({ ...p }); setModal(p); };
  const close = () => setModal(null);
  const save = () => {
    if (!form.title.trim()) return;
    if (modal === 'add') addProject(form);
    else updateProject(modal.id, form);
    close();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--primary)' }}>Projects</h2>
          <p style={{ color: 'var(--mid-gray)', fontSize: 14, marginTop: 4 }}>{data.projects.length} projects</p>
        </div>
        <button onClick={openAdd} className="btn btn-primary btn-sm"><Plus size={16} /> Add Project</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {data.projects.map(p => (
          <div key={p.id} style={{ background: 'white', borderRadius: 14, padding: '16px 20px', boxShadow: 'var(--shadow-sm)', display: 'flex', gap: 16, alignItems: 'center' }}>
            {p.image && <img src={p.image} alt={p.title} style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 10, flexShrink: 0 }} />}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: 15 }}>{p.title}</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <span className="badge badge-teal">{p.category}</span>
                <span className="badge" style={{ background: p.status === 'Completed' ? 'rgba(5,150,105,0.1)' : 'rgba(232,160,32,0.1)', color: p.status === 'Completed' ? 'var(--teal)' : 'var(--accent)' }}>{p.status}</span>
                <span className="badge badge-blue">{p.year}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button onClick={() => openEdit(p)} style={{ padding: '8px 14px', background: 'rgba(37,99,168,0.08)', border: 'none', borderRadius: 8, cursor: 'pointer', color: 'var(--primary-light)', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-body)' }}><Edit2 size={13} /> Edit</button>
              <button onClick={() => deleteProject(p.id)} style={{ padding: '8px 14px', background: 'rgba(239,68,68,0.08)', border: 'none', borderRadius: 8, cursor: 'pointer', color: '#ef4444', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-body)' }}><Trash2 size={13} /> Delete</button>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <Modal title={modal === 'add' ? 'Add Project' : 'Edit Project'} onClose={close}>
          <div className="form-group">
            <label>Project Title *</label>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Project name" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Project description..." />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            <div className="form-group">
              <label>Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {categoryOptions.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                {statusOptions.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Year</label>
              <input value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} placeholder="2024" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={save} className="btn btn-primary"><Save size={15} /> Save</button>
            <button onClick={close} className="btn btn-outline">Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Partners Tab ──────────────────────────────────────────────────────────────
function PartnersTab() {
  const { data, addPartner, updatePartner, deletePartner } = useApp();
  const [modal, setModal] = useState(null);
  const empty = { name: '', logo: '', website: '' };
  const [form, setForm] = useState(empty);

  const openAdd = () => { setForm(empty); setModal('add'); };
  const openEdit = (p) => { setForm({ ...p }); setModal(p); };
  const close = () => setModal(null);
  const save = () => {
    if (!form.name.trim()) return;
    if (modal === 'add') addPartner(form);
    else updatePartner(modal.id, form);
    close();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--primary)' }}>Partners</h2>
          <p style={{ color: 'var(--mid-gray)', fontSize: 14, marginTop: 4 }}>{data.partners.length} partners</p>
        </div>
        <button onClick={openAdd} className="btn btn-primary btn-sm"><Plus size={16} /> Add Partner</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {data.partners.map(p => (
          <div key={p.id} style={{ background: 'white', borderRadius: 14, padding: '20px', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
            {p.logo && <img src={p.logo} alt={p.name} style={{ width: '100%', height: 70, objectFit: 'contain', marginBottom: 12, borderRadius: 8 }} />}
            <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: 14, marginBottom: 12 }}>{p.name}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => openEdit(p)} style={{ flex: 1, padding: '8px', background: 'rgba(37,99,168,0.08)', border: 'none', borderRadius: 8, cursor: 'pointer', color: 'var(--primary-light)', fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-body)' }}>Edit</button>
              <button onClick={() => deletePartner(p.id)} style={{ flex: 1, padding: '8px', background: 'rgba(239,68,68,0.08)', border: 'none', borderRadius: 8, cursor: 'pointer', color: '#ef4444', fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-body)' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <Modal title={modal === 'add' ? 'Add Partner' : 'Edit Partner'} onClose={close}>
          {[['name', 'Partner Name *', 'text', 'e.g. Global Education Network'], ['logo', 'Logo Image URL', 'text', 'https://...'], ['website', 'Website URL', 'text', 'https://...']].map(([key, label, type, placeholder]) => (
            <div className="form-group" key={key}>
              <label>{label}</label>
              <input type={type} value={form[key] || ''} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} />
            </div>
          ))}
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={save} className="btn btn-primary"><Save size={15} /> Save</button>
            <button onClick={close} className="btn btn-outline">Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Comments Tab ──────────────────────────────────────────────────────────────
function CommentsTab() {
  const { data, deleteComment } = useApp();
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--primary)' }}>Comments</h2>
        <p style={{ color: 'var(--mid-gray)', fontSize: 14, marginTop: 4 }}>{data.comments.length} comments — admin can delete any comment</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {data.comments.length === 0 && <div style={{ textAlign: 'center', padding: '48px', color: 'var(--mid-gray)' }}>No comments yet.</div>}
        {[...data.comments].reverse().map(c => (
          <div key={c.id} style={{ background: 'white', borderRadius: 14, padding: '18px 20px', boxShadow: 'var(--shadow-sm)', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--teal))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white', flexShrink: 0 }}>{c.author[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>{c.author} <span style={{ fontWeight: 400, color: 'var(--mid-gray)', fontSize: 12 }}>· {c.date}</span> {c.edited && <span style={{ fontSize: 11, color: 'var(--mid-gray)' }}>(edited)</span>}</div>
              <p style={{ color: 'var(--dark-2)', fontSize: 14, lineHeight: 1.6 }}>{c.text}</p>
            </div>
            <button onClick={() => deleteComment(c.id)} className="btn btn-danger btn-sm" style={{ flexShrink: 0 }}><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Testimonials Tab ──────────────────────────────────────────────────────────
function TestimonialsTab() {
  const { data, deleteTestimonial } = useApp();
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--primary)' }}>Testimonials</h2>
        <p style={{ color: 'var(--mid-gray)', fontSize: 14, marginTop: 4 }}>{data.testimonials.length} testimonials</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {data.testimonials.map(t => (
          <div key={t.id} style={{ background: 'white', borderRadius: 14, padding: '20px', boxShadow: 'var(--shadow-sm)', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <img src={t.avatar} alt={t.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{t.name} <span style={{ fontSize: 12, color: 'var(--mid-gray)', fontWeight: 400 }}>· {t.country}</span></div>
              <div style={{ fontSize: 12, color: 'var(--teal)', fontWeight: 600, marginBottom: 6 }}>{t.service} · {'★'.repeat(t.rating)}</div>
              <p style={{ color: 'var(--dark-2)', fontSize: 14, lineHeight: 1.6, fontStyle: 'italic' }}>"{t.text}"</p>
            </div>
            <button onClick={() => deleteTestimonial(t.id)} className="btn btn-danger btn-sm" style={{ flexShrink: 0 }}><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Settings Tab ──────────────────────────────────────────────────────────────
function SettingsTab() {
  const { chatbotApiKey, saveApiKey } = useApp();
  const [key, setKey] = useState(chatbotApiKey);
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saveApiKey(key);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--primary)', marginBottom: 8 }}>Settings</h2>
      <p style={{ color: 'var(--mid-gray)', marginBottom: 36 }}>Configure your website and integrations.</p>

      <div style={{ background: 'white', borderRadius: 20, padding: '32px', boxShadow: 'var(--shadow-sm)', maxWidth: 560 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <Key size={24} color="var(--primary)" />
          <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary)' }}>Chatbot API Key</h4>
        </div>
        <p style={{ color: 'var(--mid-gray)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
          Enter your Anthropic API key to enable the AI chatbot assistant on your website. The key is stored locally in the browser.
        </p>
        <div className="form-group">
          <label>Anthropic API Key</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showKey ? 'text' : 'password'}
              value={key}
              onChange={e => setKey(e.target.value)}
              placeholder="sk-ant-api03-..."
              style={{ paddingRight: 50 }}
            />
            <button onClick={() => setShowKey(!showKey)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mid-gray)' }}>
              <Eye size={17} />
            </button>
          </div>
        </div>
        <button onClick={handleSave} className="btn btn-primary">
          {saved ? <><Check size={16} /> Saved!</> : <><Save size={16} /> Save API Key</>}
        </button>

        {chatbotApiKey && (
          <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.2)', borderRadius: 10, fontSize: 13, color: 'var(--teal)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Check size={15} /> Chatbot is active and configured.
          </div>
        )}
      </div>

      <div style={{ background: 'white', borderRadius: 20, padding: '32px', boxShadow: 'var(--shadow-sm)', maxWidth: 560, marginTop: 20 }}>
        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary)', marginBottom: 16 }}>Admin Credentials</h4>
        <p style={{ color: 'var(--mid-gray)', fontSize: 14, lineHeight: 1.7 }}>
          The admin password is set to <strong>admin123</strong> by default. To change it, edit the <code style={{ background: 'var(--off-white)', padding: '2px 6px', borderRadius: 4 }}>AppContext.jsx</code> file and update the password check.
        </p>
      </div>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { isAdmin, adminLogout, data } = useApp();
  const navigate = useNavigate();
  const [active, setActive] = useState('overview');

  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const renderContent = () => {
    switch (active) {
      case 'overview': return <Overview data={data} setActive={setActive} />;
      case 'members': return <MembersTab />;
      case 'services': return <ServicesTab />;
      case 'projects': return <ProjectsTab />;
      case 'partners': return <PartnersTab />;
      case 'comments': return <CommentsTab />;
      case 'testimonials': return <TestimonialsTab />;
      case 'settings': return <SettingsTab />;
      default: return <Overview data={data} setActive={setActive} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--off-white)' }}>
      <Sidebar active={active} setActive={setActive} onLogout={handleLogout} />
      <main style={{ flex: 1, marginLeft: 260, padding: '48px 40px', minHeight: '100vh' }}>
        {renderContent()}
      </main>
    </div>
  );
}
