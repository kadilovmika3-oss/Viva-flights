import React, { useState } from 'react';
import { Car, Calendar, MapPin, Search, Shield, Clock, Fuel, Gauge } from 'lucide-react';
import { Language, translations } from '../translations';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface CarRentalPageProps {
  lang: Language;
}

const FEATURED_CARS = [
  {
    id: 1,
    name: 'Mercedes-Benz Gt',
    type: 'Luxury',
    price: '120,000',
    transmission: 'Auto',
    fuel: 'Petrol',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    name: 'Hyundai Sonata',
    type: 'Electric',
    price: '95,000',
    transmission: 'Auto',
    fuel: 'Electric',
    image: 'https://images.unsplash.com/photo-1611016186353-9af58c69a533?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    name: 'BMW M5 f90',
    type: 'SUV',
    price: '110,000',
    transmission: 'Auto',
    fuel: 'Diesel',
    image: 'https://images.unsplash.com/photo-1556448851-9359658cb407?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    name: 'Audi Rs6',
    type: 'Premium',
    price: '88,000',
    transmission: 'Auto',
    fuel: 'Petrol',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=800'
  }
];

export default function CarRentalPage({ lang }: CarRentalPageProps) {
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [dropoffDate, setDropoffDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const t = translations[lang];
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/car-results');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=2000" 
            alt="Car Rental Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-viva-dark/50"></div>
        </div>

        <div className="relative z-10 w-full max-w-5xl px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight uppercase">
              {t.carRental} <span className="text-viva-red">VIVA</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              {(t as any).carHeroSubtitle}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative group">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">{t.pickupLocation}</label>
                <div className="flex items-center bg-gray-50 border-2 border-transparent group-focus-within:border-viva-red rounded-2xl px-4 py-3 transition-all">
                  <MapPin size={20} className="text-viva-red mr-3" />
                  <input 
                    type="text" 
                    placeholder={t.carPlaceholder} 
                    className="bg-transparent w-full outline-none font-bold text-viva-dark placeholder:text-gray-300"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">{t.pickupDate}</label>
                <div className="flex items-center bg-gray-50 border-2 border-transparent group-focus-within:border-viva-red rounded-2xl px-4 py-3 transition-all">
                  <Calendar size={20} className="text-viva-red mr-3" />
                  <input 
                    type="date" 
                    className="bg-transparent w-full outline-none font-bold text-viva-dark"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">{t.dropoffDate}</label>
                <div className="flex items-center bg-gray-50 border-2 border-transparent group-focus-within:border-viva-red rounded-2xl px-4 py-3 transition-all">
                  <Calendar size={20} className="text-viva-red mr-3" />
                  <input 
                    type="date" 
                    className="bg-transparent w-full outline-none font-bold text-viva-dark"
                    value={dropoffDate}
                    onChange={(e) => setDropoffDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button 
                onClick={handleSearch}
                className="btn-viva px-12 py-4 text-lg flex items-center gap-3 shadow-xl shadow-red-500/20 hover:scale-105 active:scale-95"
              >
                <Search size={24} />
                {t.searchCars}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Fleet */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-viva-dark mb-4 uppercase tracking-tight">
              {(t as any).premiumFleet.split(' ')[0]} <span className="text-viva-red">{(t as any).premiumFleet.split(' ')[1]}</span>
            </h2>
            <p className="text-gray-500 font-bold text-lg">{(t as any).experienceRoad}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURED_CARS.map((car) => (
              <div key={car.id} className="group cursor-pointer">
                <div className="relative h-64 rounded-[2rem] overflow-hidden mb-4 shadow-lg">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-viva-red text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                      {car.type}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-black text-viva-dark uppercase tracking-tight">{car.name}</h3>
                <div className="flex items-center gap-4 mt-2 mb-4">
                  <div className="flex items-center gap-1 text-gray-400 text-xs font-bold uppercase">
                    <Gauge size={14} />
                    {car.transmission}
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-xs font-bold uppercase">
                    <Fuel size={14} />
                    {car.fuel}
                  </div>
                </div>
                <p className="text-viva-red font-black text-lg">AMD {car.price} <span className="text-gray-400 text-xs font-bold">{(t as any).perDay}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
