import React from 'react';
import { Hotel, MapPin, Star, Shield, ArrowRight, Calendar } from 'lucide-react';
import { Language, translations } from '../translations';
import { HotelBooking } from '../App';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface HotelSearchResultsPageProps {
  lang: Language;
  onBook: (booking: HotelBooking) => void;
}

const MOCK_HOTELS = [
  {
    id: '1',
    name: 'Grand Hyatt Yerevan',
    city: 'Yerevan',
    price: '85,000',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    amenities: ['Free Wi-Fi', 'Pool', 'Spa']
  },
  {
    id: '2',
    name: 'The Ritz-Carlton',
    city: 'Paris',
    price: '250,000',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1551882547-ff43c63fe78d?auto=format&fit=crop&q=80&w=800',
    amenities: ['Michelin Star Restaurant', 'Luxury Spa', 'Concierge']
  },
  {
    id: '3',
    name: 'Rome Cavalieri',
    city: 'Rome',
    price: '180,000',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800',
    amenities: ['Panoramic View', 'Art Gallery', 'Tennis Courts']
  },
  {
    id: '4',
    name: 'Burj Al Arab',
    city: 'Dubai',
    price: '450,000',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
    amenities: ['Private Beach', 'Helipad', 'Butler Service']
  }
];

export default function HotelSearchResultsPage({ lang, onBook }: HotelSearchResultsPageProps) {
  const t = translations[lang];
  const navigate = useNavigate();

  const handleBooking = (hotel: typeof MOCK_HOTELS[0]) => {
    const booking: HotelBooking = {
      id: Math.random().toString(36).substr(2, 9),
      hotelName: hotel.name,
      city: hotel.city,
      checkIn: new Date().toISOString(),
      checkOut: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days later
      price: hotel.price,
      status: 'confirmed',
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
              {(t as any).hotelSearchResults}
            </h1>
            <p className="text-gray-500 font-bold">
              {MOCK_HOTELS.length} hotels found for your stay
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-viva-red/10 rounded-xl flex items-center justify-center text-viva-red">
              <Shield size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Secure Stay</p>
              <p className="font-bold text-viva-dark text-sm">Viva Guaranteed</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {MOCK_HOTELS.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden group hover:border-viva-red/30 transition-all"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 h-64 md:h-auto relative">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-black text-viva-dark">{hotel.rating}</span>
                  </div>
                </div>

                <div className="md:w-2/3 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-black text-viva-dark uppercase tracking-tight mb-1">{hotel.name}</h3>
                        <div className="flex items-center gap-1 text-gray-400 text-xs font-bold uppercase">
                          <MapPin size={14} />
                          {hotel.city}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {hotel.amenities.map((amenity) => (
                        <span key={amenity} className="px-3 py-1 bg-gray-50 text-gray-500 text-[10px] font-black uppercase tracking-widest rounded-full">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-100">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase mb-1">Price per night</p>
                      <div className="text-3xl font-black text-viva-dark">
                        <span className="text-sm font-bold text-gray-400 mr-1">AMD</span>
                        {hotel.price}
                      </div>
                    </div>
                    <button
                      onClick={() => handleBooking(hotel)}
                      className="w-full md:w-auto btn-viva px-10 flex items-center justify-center gap-2 group"
                    >
                      {(t as any).selectHotel}
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
