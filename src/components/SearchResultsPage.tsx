import React from 'react';
import { Plane, Clock, ArrowRight, Shield, Star } from 'lucide-react';
import { Language, translations } from '../translations';
import { Booking } from '../App';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface SearchResultsPageProps {
  lang: Language;
  onBook: (booking: Booking) => void;
}

const MOCK_FLIGHTS = [
  {
    id: '1',
    flightNumber: 'VF 101',
    from: 'Yerevan (EVN)',
    to: 'Paris (CDG)',
    departure: '10:30 AM',
    arrival: '02:45 PM',
    duration: '6h 15m',
    price: '120,000',
    class: 'economy' as const,
  },
  {
    id: '2',
    flightNumber: 'VF 205',
    from: 'Yerevan (EVN)',
    to: 'Paris (CDG)',
    departure: '04:15 PM',
    arrival: '08:30 PM',
    duration: '6h 15m',
    price: '145,000',
    class: 'economy' as const,
  },
  {
    id: '3',
    flightNumber: 'VF 309',
    from: 'Yerevan (EVN)',
    to: 'Paris (CDG)',
    departure: '08:00 AM',
    arrival: '12:15 PM',
    duration: '6h 15m',
    price: '280,000',
    class: 'business' as const,
  },
  {
    id: '4',
    flightNumber: 'VF 412',
    from: 'Yerevan (EVN)',
    to: 'Dubai (DXB)',
    departure: '11:00 AM',
    arrival: '02:30 PM',
    duration: '3h 30m',
    price: '150,000',
    class: 'economy' as const,
  }
];

export default function SearchResultsPage({ lang, onBook }: SearchResultsPageProps) {
  const t = translations[lang];
  const navigate = useNavigate();

  const handleBooking = (flight: typeof MOCK_FLIGHTS[0]) => {
    const booking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      flightNumber: flight.flightNumber,
      from: flight.from,
      to: flight.to,
      date: new Date().toISOString(),
      price: flight.price,
      status: 'confirmed',
      class: flight.class,
    };
    onBook(booking);
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-viva-dark uppercase tracking-tight mb-2">
              {(t as any).searchResultTitle}
            </h1>
            <p className="text-gray-500 font-bold">
              {MOCK_FLIGHTS.length} flights found for your search
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-viva-red/10 rounded-xl flex items-center justify-center text-viva-red">
              <Shield size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Safe Booking</p>
              <p className="font-bold text-viva-dark text-sm">Verified by Viva</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {MOCK_FLIGHTS.map((flight, index) => (
            <motion.div
              key={flight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden group hover:border-viva-red/30 transition-all"
            >
              <div className="p-8 flex flex-col md:flex-row items-center gap-8">
                {/* Flight Info */}
                <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-8 items-center w-full">
                  <div className="text-center md:text-left">
                    <p className="text-xs font-black text-viva-red uppercase tracking-widest mb-1">{flight.flightNumber}</p>
                    <h3 className="text-2xl font-black text-viva-dark uppercase tracking-tight">{flight.departure}</h3>
                    <p className="text-gray-400 font-bold text-sm">{flight.from}</p>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{(t as any).duration}</p>
                    <div className="flex items-center gap-4 w-full max-w-[150px]">
                      <div className="h-[2px] flex-grow bg-gray-100 relative">
                        <div className="absolute -top-1.5 -left-1 w-3 h-3 rounded-full bg-gray-200"></div>
                        <div className="absolute -top-1.5 -right-1 w-3 h-3 rounded-full bg-viva-red"></div>
                      </div>
                      <Plane className="text-viva-red rotate-90" size={20} />
                    </div>
                    <p className="text-xs font-black text-viva-dark uppercase tracking-widest">{flight.duration}</p>
                  </div>

                  <div className="text-center md:text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 ${
                      flight.class === 'business' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {(t as any)[flight.class === 'business' ? 'businessClass' : 'economyClass']}
                    </span>
                    <h3 className="text-2xl font-black text-viva-dark uppercase tracking-tight">{flight.arrival}</h3>
                    <p className="text-gray-400 font-bold text-sm">{flight.to}</p>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="md:w-px md:h-20 bg-gray-100"></div>

                <div className="text-center md:text-right min-w-[180px]">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">Total Price</p>
                  <div className="text-3xl font-black text-viva-dark mb-4">
                    <span className="text-sm font-bold text-gray-400 mr-1">AMD</span>
                    {flight.price}
                  </div>
                  <button
                    onClick={() => handleBooking(flight)}
                    className="w-full btn-viva flex items-center justify-center gap-2 group"
                  >
                    {(t as any).selectFlight}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
              
              {/* Bottom Bar */}
              <div className="bg-gray-50 px-8 py-3 flex items-center justify-between border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <Star size={12} className="text-amber-400" />
                    Free Wi-Fi
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <Star size={12} className="text-amber-400" />
                    Meal Included
                  </div>
                </div>
                <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Flexible Ticket</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
