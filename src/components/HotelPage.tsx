import React, { useState } from 'react';
import { Hotel, Calendar, Users, MapPin, Search, Star, Shield, Clock, Tag } from 'lucide-react';
import { Language, translations } from '../translations';
import { format } from 'date-fns';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface HotelPageProps {
  lang: Language;
  user: any;
  onRegisterClick: () => void;
}

const POPULAR_HOTELS = [
  {
    id: 1,
    name: 'Grand Hyatt Yerevan',
    city: 'Yerevan',
    price: '85,000',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    name: 'The Ritz-Carlton',
    city: 'Paris',
    price: '250,000',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1551882547-ff43c63fe78d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    name: 'Rome Cavalieri',
    city: 'Rome',
    price: '180,000',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    name: 'Burj Al Arab',
    city: 'Dubai',
    price: '450,000',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800'
  }
];

export default function HotelPage({ lang, user, onRegisterClick }: HotelPageProps) {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [checkOut, setCheckOut] = useState(format(new Date(), 'yyyy-MM-dd'));
  const t = translations[lang];
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/hotel-results');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000" 
            alt="Hotel Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-viva-dark/40"></div>
        </div>

        <div className="relative z-10 w-full max-w-5xl px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight uppercase">
              {t.hotels} <span className="text-viva-red">VIVA</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              {(t as any).hotelHeroSubtitle}
            </p>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t.to}</label>
                <div className="flex items-center bg-gray-50 border-2 border-transparent focus-within:border-viva-red rounded-2xl px-5 py-4 transition-all shadow-inner">
                  <MapPin size={22} className="text-viva-red mr-3 shrink-0" />
                  <input 
                    type="text" 
                    placeholder={t.hotelPlaceholder} 
                    className="bg-transparent w-full outline-none font-black text-viva-dark placeholder:text-gray-300 text-lg"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t.checkInDate}</label>
                <div className="flex items-center bg-gray-50 border-2 border-transparent focus-within:border-viva-red rounded-2xl px-5 py-4 transition-all shadow-inner">
                  <Calendar size={22} className="text-viva-red mr-3 shrink-0" />
                  <input 
                    type="date" 
                    className="bg-transparent w-full outline-none font-black text-viva-dark text-lg"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t.checkOutDate}</label>
                <div className="flex items-center bg-gray-50 border-2 border-transparent focus-within:border-viva-red rounded-2xl px-5 py-4 transition-all shadow-inner">
                  <Calendar size={22} className="text-viva-red mr-3 shrink-0" />
                  <input 
                    type="date" 
                    className="bg-transparent w-full outline-none font-black text-viva-dark text-lg"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3 text-gray-400">
                <Shield size={20} className="text-viva-red" />
                <p className="text-xs font-bold uppercase tracking-tight">{(t as any).bestPriceGuarantee}</p>
              </div>
              <button 
                onClick={handleSearch}
                className="btn-viva px-16 py-5 text-xl flex items-center gap-4 shadow-2xl shadow-red-500/30 hover:scale-105 active:scale-95 transition-all w-full md:w-auto"
              >
                <Search size={24} strokeWidth={3} />
                {t.searchHotels}
              </button>
            </div>
          </div>

          {!user && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-viva-dark rounded-[2rem] p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-viva-red rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-500/20">
                  <Tag size={24} />
                </div>
                <div>
                  <h4 className="text-white font-black uppercase tracking-tight">{(t as any).registerToGetDiscount}</h4>
                  <p className="text-white/60 text-xs font-bold uppercase">{(t as any).exclusiveOffer}</p>
                </div>
              </div>
              <button 
                onClick={onRegisterClick}
                className="bg-white text-viva-dark px-8 py-3 rounded-full font-black text-sm hover:bg-viva-red hover:text-white transition-all uppercase tracking-widest"
              >
                {t.registerNow}
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Popular Hotels */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-viva-dark mb-4 uppercase tracking-tight">
              {(t as any).featuredHotels.split(' ')[0]} <span className="text-viva-red">{(t as any).featuredHotels.split(' ')[1]}</span>
            </h2>
            <p className="text-gray-500 font-bold text-lg">{(t as any).handPickedLuxury}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {POPULAR_HOTELS.map((hotel) => (
              <div key={hotel.id} className="group cursor-pointer">
                <div className="relative h-64 rounded-[2rem] overflow-hidden mb-4 shadow-lg">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-black text-viva-dark">{hotel.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-black text-viva-dark uppercase tracking-tight">{hotel.name}</h3>
                <div className="flex items-center gap-1 text-gray-400 text-xs font-bold uppercase mb-2">
                  <MapPin size={12} />
                  {hotel.city}
                </div>
                <p className="text-viva-red font-black text-lg">AMD {hotel.price} <span className="text-gray-400 text-xs font-bold">{(t as any).perNight}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
