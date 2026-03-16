import React from 'react';
import { Plane, Search, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Language, translations } from '../translations';

interface PlaceholderPageProps {
  title: string;
  icon: React.ReactNode;
  lang: Language;
}

export default function PlaceholderPage({ title, icon, lang }: PlaceholderPageProps) {
  const t = translations[lang];

  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center p-8 text-center overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000" 
          alt="Background" 
          className="w-full h-full object-cover opacity-20 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
      </div>

      <div className="relative z-10">
        <div className="w-24 h-24 bg-viva-red/10 rounded-full flex items-center justify-center text-viva-red mx-auto mb-8 animate-bounce shadow-xl shadow-red-500/10">
          {icon}
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-viva-dark mb-4 uppercase tracking-tight">
          {title} {t.comingSoon && <span className="text-viva-red">{t.comingSoon}</span>}
        </h1>
        <p className="text-gray-500 font-bold text-lg max-w-2xl mx-auto mb-10">
          {t.buildingSection}
        </p>
        <button 
          onClick={() => window.history.back()}
          className="btn-viva px-10 py-4 text-lg flex items-center gap-3 shadow-xl shadow-red-500/20 hover:scale-105 active:scale-95 mx-auto"
        >
          {t.goBack}
        </button>
      </div>
    </div>
  );
}
