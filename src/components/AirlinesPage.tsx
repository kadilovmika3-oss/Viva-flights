import React from 'react';
import { motion } from 'motion/react';
import { translations, Language } from '../translations';
import { Plane, Star, Shield, Clock, ArrowRight } from 'lucide-react';

const AIRLINES = (t: any) => [
  {
    id: 1,
    name: 'Viva Armenia',
    logo: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    description: t.vivaArmeniaDesc,
    features: ['Premium Meals', 'Extra Legroom', 'Free Wi-Fi']
  },
  {
    id: 2,
    name: 'Air France',
    logo: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    description: t.airFranceDesc,
    features: ['Gourmet Food', 'Luxury Lounges', 'Entertainment']
  },
  {
    id: 3,
    name: 'Lufthansa',
    logo: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    description: t.lufthansaDesc,
    features: ['Punctuality', 'Global Network', 'Family Friendly']
  },
  {
    id: 4,
    name: 'Qatar Airways',
    logo: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    description: t.qatarAirwaysDesc,
    features: ['QSuite', 'Fine Dining', 'Award Winning']
  },
  {
    id: 5,
    name: 'Emirates',
    logo: 'https://images.unsplash.com/photo-1559297434-2d8a134e0428?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    description: t.emiratesDesc,
    features: ['ICE System', 'Shower Spa', 'Onboard Lounge']
  },
  {
    id: 6,
    name: 'Austrian Airlines',
    logo: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    description: t.austrianAirlinesDesc,
    features: ['Flying Chef', 'Cozy Cabins', 'Vienna Coffee']
  }
];

export function AirlinesPage({ lang }: { lang: Language }) {
  const t = translations[lang];

  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-black text-viva-dark mb-6 uppercase tracking-tight">
            {t.partnerAirlines}
          </h1>
          <p className="text-gray-500 font-bold text-xl max-w-3xl mx-auto">
            {t.airlinesSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AIRLINES(t).map((airline, index) => (
            <motion.div
              key={airline.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all group"
            >
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={airline.logo} 
                  alt={airline.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-6 flex items-center gap-2">
                  <div className="flex items-center text-yellow-400">
                    <Star size={16} fill="currentColor" />
                    <span className="ml-1 text-white font-black">{airline.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-black text-viva-dark mb-3 uppercase tracking-tight">
                  {airline.name}
                </h3>
                <p className="text-gray-500 font-medium mb-6 line-clamp-2">
                  {airline.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {airline.features.map(feature => (
                    <span key={feature} className="text-[10px] font-black uppercase tracking-widest bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
                
                <button className="w-full bg-viva-red text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-viva-dark transition-colors group">
                  {t.bookWith} {airline.name}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-200 pt-16">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-viva-red mb-6 shadow-lg">
              <Shield size={32} />
            </div>
            <h4 className="text-xl font-black text-viva-dark mb-2 uppercase tracking-tight">{(t as any).verifiedPartners}</h4>
            <p className="text-gray-500 font-medium">{(t as any).reliableAirlines}</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-viva-red mb-6 shadow-lg">
              <Star size={32} />
            </div>
            <h4 className="text-xl font-black text-viva-dark mb-2 uppercase tracking-tight">{(t as any).bestPrices}</h4>
            <p className="text-gray-500 font-medium">{(t as any).negotiateExclusive}</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-viva-red mb-6 shadow-lg">
              <Clock size={32} />
            </div>
            <h4 className="text-xl font-black text-viva-dark mb-2 uppercase tracking-tight">{(t as any).support247}</h4>
            <p className="text-gray-500 font-medium">{(t as any).supportTeamHelp}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
