import React, { useState } from 'react';
import { Plane, Calendar, Users, MapPin, ArrowRightLeft, Search } from 'lucide-react';
import { format } from 'date-fns';
import { Language, translations } from '../translations';

interface FlightSearchProps {
  lang: Language;
  onSearch: () => void;
}

export default function FlightSearch({ lang, onSearch }: FlightSearchProps) {
  const [tripType, setTripType] = useState<'round' | 'one'>('round');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const t = translations[lang];

  return (
    <div className="relative min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=2000" 
          alt="Aviation Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-viva-dark/70 via-viva-dark/40 to-viva-dark/70"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            {t.whereToNext} <span className="text-viva-red">{t.next}</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            {t.heroSubtitle}
          </p>
        </div>

        {/* Search Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
          {/* Trip Type Selector */}
          <div className="flex gap-4 mb-6">
            <button 
              onClick={() => setTripType('round')}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                tripType === 'round' ? 'bg-viva-red text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t.roundTrip}
            </button>
            <button 
              onClick={() => setTripType('one')}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                tripType === 'one' ? 'bg-viva-red text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t.oneWay}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* From */}
            <div className="relative group">
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">{t.from}</label>
              <div className="flex items-center bg-gray-50 border-2 border-transparent group-focus-within:border-viva-red rounded-2xl px-4 py-3 transition-all">
                <MapPin size={20} className="text-viva-red mr-3" />
                <input 
                  type="text" 
                  placeholder={t.yerevanEVN} 
                  className="bg-transparent w-full outline-none font-bold text-viva-dark placeholder:text-gray-300"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>
            </div>

            {/* To */}
            <div className="relative group">
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">{t.to}</label>
              <div className="flex items-center bg-gray-50 border-2 border-transparent group-focus-within:border-viva-red rounded-2xl px-4 py-3 transition-all">
                <MapPin size={20} className="text-viva-red mr-3" />
                <input 
                  type="text" 
                  placeholder={t.parisCDG} 
                  className="bg-transparent w-full outline-none font-bold text-viva-dark placeholder:text-gray-300"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
              <button 
                onClick={() => { const temp = from; setFrom(to); setTo(temp); }}
                className="absolute right-[-12px] top-[50%] translate-y-[-50%] z-10 bg-white border border-gray-100 shadow-md p-1.5 rounded-full text-viva-red hover:scale-110 transition-transform hidden md:block"
              >
                <ArrowRightLeft size={14} />
              </button>
            </div>

            {/* Date */}
            <div className="relative group">
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">{t.departure}</label>
              <div className="flex items-center bg-gray-50 border-2 border-transparent group-focus-within:border-viva-red rounded-2xl px-4 py-3 transition-all">
                <Calendar size={20} className="text-viva-red mr-3" />
                <input 
                  type="date" 
                  className="bg-transparent w-full outline-none font-bold text-viva-dark"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            {/* Passengers */}
            <div className="relative group">
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">{t.passengers}</label>
              <div className="flex items-center bg-gray-50 border-2 border-transparent group-focus-within:border-viva-red rounded-2xl px-4 py-3 transition-all">
                <Users size={20} className="text-viva-red mr-3" />
                <select className="bg-transparent w-full outline-none font-bold text-viva-dark appearance-none">
                  <option>{(t as any).adultEconomy}</option>
                  <option>{(t as any).adultsEconomy}</option>
                  <option>{(t as any).adultBusiness}</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button 
              onClick={onSearch}
              className="btn-viva px-12 py-4 text-lg flex items-center gap-3 shadow-xl shadow-red-500/20 hover:scale-105 active:scale-95"
            >
              <Search size={24} />
              {t.searchFlights}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
