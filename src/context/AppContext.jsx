import React, { createContext, useContext, useState, useEffect } from 'react';

const API_BASE = '/api';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [data, setData] = useState({
    members: [], services: [], projects: [], partners: [],
    comments: [], testimonials: [], heroSlides: [], contact: {}, stats: []
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [chatbotApiKey, setChatbotApiKey] = useState(() => {
    return localStorage.getItem('greatrift_api_key') || '';
  });
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all data on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [membersRes, servicesRes, projectsRes, partnersRes, commentsRes, testimonialsRes, heroRes, contactRes, statsRes] = await Promise.all([
        fetch(`${API_BASE}/members`),
        fetch(`${API_BASE}/services`),
        fetch(`${API_BASE}/projects`),
        fetch(`${API_BASE}/partners`),
        fetch(`${API_BASE}/comments`),
        fetch(`${API_BASE}/testimonials`),
        fetch(`${API_BASE}/hero-slides`),
        fetch(`${API_BASE}/contact`),
        fetch(`${API_BASE}/stats`),
      ]);
      const [members, services, projects, partners, comments, testimonials, heroSlides, contact, stats] = await Promise.all([
        membersRes.json(), servicesRes.json(), projectsRes.json(), partnersRes.json(), commentsRes.json(), testimonialsRes.json(), heroRes.json(), contactRes.json(), statsRes.json()
      ]);
      setData({ members, services, projects, partners, comments, testimonials, heroSlides, contact, stats });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const adminLogin = (password) => {
    if (password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('greatrift_admin', 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('greatrift_admin');
  };

  const saveApiKey = (key) => {
    setChatbotApiKey(key);
    localStorage.setItem('greatrift_api_key', key);
  };

  // Generic fetch wrapper
  const api = async (endpoint, method = 'GET', body) => {
    const opts = { method, headers: { 'Content-Type': 'application/json' } };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(`${API_BASE}${endpoint}`, opts);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    if (method !== 'DELETE' && res.status !== 204) return res.json();
  };

  // Members
  const addMember = async (member) => {
    await api('/members', 'POST', member);
    await fetchAllData();
    showToast('Member added successfully!');
  };
  const updateMember = async (id, updates) => {
    await api(`/members/${id}`, 'PUT', updates);
    await fetchAllData();
    showToast('Member updated!');
  };
  const deleteMember = async (id) => {
    await api(`/members/${id}`, 'DELETE');
    await fetchAllData();
    showToast('Member removed.');
  };

  // Services
  const addService = async (service) => {
    await api('/services', 'POST', service);
    await fetchAllData();
    showToast('Service added!');
  };
  const updateService = async (id, updates) => {
    await api(`/services/${id}`, 'PUT', updates);
    await fetchAllData();
    showToast('Service updated!');
  };
  const deleteService = async (id) => {
    await api(`/services/${id}`, 'DELETE');
    await fetchAllData();
    showToast('Service removed.');
  };

  // Projects
  const addProject = async (project) => {
    await api('/projects', 'POST', project);
    await fetchAllData();
    showToast('Project added!');
  };
  const updateProject = async (id, updates) => {
    await api(`/projects/${id}`, 'PUT', updates);
    await fetchAllData();
    showToast('Project updated!');
  };
  const deleteProject = async (id) => {
    await api(`/projects/${id}`, 'DELETE');
    await fetchAllData();
    showToast('Project removed.');
  };

  // Partners
  const addPartner = async (partner) => {
    await api('/partners', 'POST', partner);
    await fetchAllData();
    showToast('Partner added!');
  };
  const updatePartner = async (id, updates) => {
    await api(`/partners/${id}`, 'PUT', updates);
    await fetchAllData();
    showToast('Partner updated!');
  };
  const deletePartner = async (id) => {
    await api(`/partners/${id}`, 'DELETE');
    await fetchAllData();
    showToast('Partner removed.');
  };

  // Comments
  const addComment = async (comment) => {
    await api('/comments', 'POST', comment);
    await fetchAllData();
    showToast('Comment posted!');
  };
  const updateComment = async (id, text) => {
    await api(`/comments/${id}`, 'PUT', { text });
    await fetchAllData();
    showToast('Comment updated!');
  };
  const deleteComment = async (id) => {
    await api(`/comments/${id}`, 'DELETE');
    await fetchAllData();
    showToast('Comment deleted.');
  };

  // Testimonials
  const addTestimonial = async (t) => {
    await api('/testimonials', 'POST', t);
    await fetchAllData();
    showToast('Testimonial added!');
  };
  const deleteTestimonial = async (id) => {
    await api(`/testimonials/${id}`, 'DELETE');
    await fetchAllData();
    showToast('Testimonial removed.');
  };

  return (
    <AppContext.Provider value={{
      data, isAdmin, chatbotApiKey, toast,
      showToast,
      adminLogin, adminLogout,
      saveApiKey,
      addMember, updateMember, deleteMember,
      addService, updateService, deleteService,
      addProject, updateProject, deleteProject,
      addPartner, updatePartner, deletePartner,
      addComment, updateComment, deleteComment,
      addTestimonial, deleteTestimonial,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};
