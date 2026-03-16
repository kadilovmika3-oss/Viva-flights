import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Lock, User, Phone, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, translations } from '../translations';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'register';
  lang: Language;
  onAction: (action: string) => void;
  onLogin: (user: { name: string; email: string; registrationDate?: string }) => void;
}

export default function AuthModal({ isOpen, onClose, initialMode, lang, onAction, onLogin }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const t = translations[lang];

  if (!isOpen) return null;

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    if (mode === 'login') {
      if (email && password) {
        onLogin({ name: email.split('@')[0], email });
      }
    } else {
      if (name && email && password) {
        onLogin({ name, email, registrationDate: new Date().toISOString() });
      }
    }
  };

  const handleAuthAction = (action: string, path?: string) => {
    if (path) {
      onClose();
      navigate(path);
    } else {
      onAction(action);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="bg-viva-red p-8 text-white relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-40 h-40 bg-black/10 rounded-full blur-3xl"></div>
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-viva-red font-black text-2xl">
                V
              </div>
              <span className="text-2xl font-black tracking-tighter">VIVA <span className="text-white/80">ID</span></span>
            </div>

            <h2 className="text-3xl font-black mb-2 uppercase tracking-tight">
              {mode === 'login' ? t.welcomeBack : t.joinViva}
            </h2>
            <p className="text-white/80 font-medium">
              {mode === 'login' ? t.accessProfile : t.unlockDeals}
            </p>
          </div>

          {/* Form Body */}
          <div className="p-8">
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {mode === 'register' && (
                <div className="relative group">
                  <User size={20} className="absolute left-4 top-[50%] translate-y-[-50%] text-gray-400 group-focus-within:text-viva-red transition-colors" />
                  <input 
                    type="text" 
                    placeholder={t.fullName} 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-viva-red rounded-2xl py-4 pl-12 pr-4 outline-none font-bold text-viva-dark transition-all"
                  />
                </div>
              )}

              <div className="relative group">
                <Mail size={20} className="absolute left-4 top-[50%] translate-y-[-50%] text-gray-400 group-focus-within:text-viva-red transition-colors" />
                <input 
                  type="email" 
                  placeholder={t.email} 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-viva-red rounded-2xl py-4 pl-12 pr-4 outline-none font-bold text-viva-dark transition-all"
                />
              </div>

              {mode === 'register' && (
                <div className="relative group">
                  <Phone size={20} className="absolute left-4 top-[50%] translate-y-[-50%] text-gray-400 group-focus-within:text-viva-red transition-colors" />
                  <input 
                    type="tel" 
                    placeholder={t.phone} 
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-viva-red rounded-2xl py-4 pl-12 pr-4 outline-none font-bold text-viva-dark transition-all"
                  />
                </div>
              )}

              <div className="relative group">
                <Lock size={20} className="absolute left-4 top-[50%] translate-y-[-50%] text-gray-400 group-focus-within:text-viva-red transition-colors" />
                <input 
                  type="password" 
                  placeholder={t.password} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-viva-red rounded-2xl py-4 pl-12 pr-4 outline-none font-bold text-viva-dark transition-all"
                />
              </div>

              {mode === 'login' && (
                <div className="flex justify-end">
                  <button type="button" onClick={() => handleAuthAction('Forgot Password', '/support')} className="text-sm font-bold text-viva-red hover:underline">{t.forgotPassword}</button>
                </div>
              )}

              <button 
                type="submit"
                className="w-full btn-viva py-4 text-lg flex items-center justify-center gap-2 group shadow-xl shadow-red-500/20"
              >
                {mode === 'login' ? t.logIn : t.createAccount}
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-500 font-medium">
                {mode === 'login' ? t.noAccount : t.alreadyAccount}
                <button 
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="ml-2 text-viva-red font-bold hover:underline"
                >
                  {mode === 'login' ? t.register : t.logIn}
                </button>
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col gap-4">
              <button onClick={() => handleAuthAction('Google Auth', '/support')} className="w-full py-3 px-4 border-2 border-gray-100 rounded-2xl font-bold text-gray-600 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                {t.continueGoogle}
              </button>
              <button onClick={() => handleAuthAction('Facebook Auth', '/support')} className="w-full py-3 px-4 border-2 border-gray-100 rounded-2xl font-bold text-gray-600 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors">
                <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5" />
                {t.continueFacebook}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
