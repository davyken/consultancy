import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;
  return (
    <div className={`toast ${toast.type}`} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {toast.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
      {toast.message}
    </div>
  );
}
