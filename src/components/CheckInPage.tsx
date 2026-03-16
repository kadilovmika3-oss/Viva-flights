import React, { useState } from 'react';
import { CheckCircle, Search, Ticket, User, ArrowRight } from 'lucide-react';
import { Language, translations } from '../translations';

interface CheckInPageProps {
  lang: Language;
}

export default function CheckInPage({ lang }: CheckInPageProps) {
  const [bookingRef, setBookingRef] = useState('');
  const [lastName, setLastName] = useState('');
  const t = translations[lang];

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-viva-red/10 rounded-full flex items-center justify-center text-viva-red mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-viva-dark mb-4 uppercase tracking-tight">
            Online <span className="text-viva-red">{t.checkIn}</span>
          </h1>
          <p className="text-gray-500 font-bold text-lg">
            {(t as any).checkInHeroSubtitle}
          </p>
        </div>

        <div className="bg-gray-50 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-200/50">
          <div className="space-y-6">
            <div className="group">
              <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">{(t as any).bookingRef}</label>
              <div className="flex items-center bg-white border-2 border-transparent group-focus-within:border-viva-red rounded-2xl px-5 py-4 transition-all shadow-sm">
                <Ticket size={20} className="text-viva-red mr-4" />
                <input 
                  type="text" 
                  placeholder="e.g. VIVA123" 
                  className="bg-transparent w-full outline-none font-black text-viva-dark placeholder:text-gray-300 uppercase tracking-widest"
                  value={bookingRef}
                  onChange={(e) => setBookingRef(e.target.value)}
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">{(t as any).lastName}</label>
              <div className="flex items-center bg-white border-2 border-transparent group-focus-within:border-viva-red rounded-2xl px-5 py-4 transition-all shadow-sm">
                <User size={20} className="text-viva-red mr-4" />
                <input 
                  type="text" 
                  placeholder="e.g. Vardanyan" 
                  className="bg-transparent w-full outline-none font-black text-viva-dark placeholder:text-gray-300 uppercase"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <button className="w-full btn-viva py-5 text-lg flex items-center justify-center gap-3 shadow-xl shadow-red-500/20 mt-8">
              {(t as any).continueToCheckIn}
              <ArrowRight size={24} />
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-black text-viva-dark uppercase mb-4 tracking-widest">{(t as any).importantInfo}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-500 font-bold">
                <div className="w-1.5 h-1.5 bg-viva-red rounded-full mt-1.5 shrink-0"></div>
                {(t as any).passportReady}
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-500 font-bold">
                <div className="w-1.5 h-1.5 bg-viva-red rounded-full mt-1.5 shrink-0"></div>
                {(t as any).baggageRequirements}
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-500 font-bold">
                <div className="w-1.5 h-1.5 bg-viva-red rounded-full mt-1.5 shrink-0"></div>
                {(t as any).airportArrival}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
