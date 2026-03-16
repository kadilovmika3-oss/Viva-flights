import React from 'react';
import { Car, MapPin, Shield, ArrowRight, Gauge, Fuel, Users } from 'lucide-react';
import { Language, translations } from '../translations';
import { CarBooking } from '../App';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface CarSearchResultsPageProps {
  lang: Language;
  onBook: (booking: CarBooking) => void;
}

const MOCK_CARS = [
  {
    id: '1',
    name: 'Mercedes-Benz Gt',
    type: 'Luxury',
    price: '120,000',
    transmission: 'Auto',
    fuel: 'Petrol',
    seats: 5,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    name: 'Hyundai Sonata',
    type: 'Electric',
    price: '95,000',
    transmission: 'Auto',
    fuel: 'Electric',
    seats: 5,
    image: 'https://images.unsplash.com/photo-1611016186353-9af58c69a533?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    name: 'BMW M3 f30',
    type: 'SUV',
    price: '110,000',
    transmission: 'Auto',
    fuel: 'Diesel',
    seats: 7,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    name: 'Audi Rs6',
    type: 'Premium',
    price: '88,000',
    transmission: 'Auto',
    fuel: 'Petrol',
    seats: 5,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    name: 'Mercedes-Benz SL',
    type: 'Classic Sport',
    price: '45,000',
    transmission: 'Auto',
    fuel: 'Petrol',
    seats: 5,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '6',
    name: 'BMW 5 Series (f90)',
    type: 'Sport Sedan',
    price: '65,000',
    transmission: 'Auto',
    fuel: 'Petrol',
    seats: 5,
    image: 'https://images.unsplash.com/photo-1556448851-9359658cb407?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '7',
    name: 'Toyota Camry',
    type: 'Comfort',
    price: '35,000',
    transmission: 'Auto',
    fuel: 'Hybrid',
    seats: 5,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '8',
    name: 'FORD MUSTANG',
    type: 'Economy',
    price: '28,000',
    transmission: 'Auto',
    fuel: 'Petrol',
    seats: 5,
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&q=80&w=800'
  }
];

export default function CarSearchResultsPage({ lang, onBook }: CarSearchResultsPageProps) {
  const t = translations[lang];
  const navigate = useNavigate();

  const handleBooking = (car: typeof MOCK_CARS[0]) => {
    const booking: CarBooking = {
      id: Math.random().toString(36).substr(2, 9),
      carName: car.name,
      type: car.type,
      pickup: 'Yerevan Airport',
      dropoff: 'Yerevan Airport',
      pickupDate: new Date().toISOString(),
      dropoffDate: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days later
      price: car.price,
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
              {(t as any).carSearchResults}
            </h1>
            <p className="text-gray-500 font-bold">
              {MOCK_CARS.length} premium vehicles available
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-viva-red/10 rounded-xl flex items-center justify-center text-viva-red">
              <Shield size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Safe Drive</p>
              <p className="font-bold text-viva-dark text-sm">Full Insurance</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_CARS.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden group hover:border-viva-red/30 transition-all flex flex-col"
            >
              <div className="h-64 relative overflow-hidden">
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-viva-red text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                    {car.type}
                  </span>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-black text-viva-dark uppercase tracking-tight mb-4">{car.name}</h3>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-2xl">
                    <Gauge size={18} className="text-viva-red mb-1" />
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{t.transmission}</span>
                    <span className="text-xs font-bold text-viva-dark">{car.transmission}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-2xl">
                    <Fuel size={18} className="text-viva-red mb-1" />
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{t.fuelType}</span>
                    <span className="text-xs font-bold text-viva-dark">{car.fuel}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-2xl">
                    <Users size={18} className="text-viva-red mb-1" />
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Seats</span>
                    <span className="text-xs font-bold text-viva-dark">{car.seats}</span>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-100">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Per day</p>
                    <div className="text-2xl font-black text-viva-dark">
                      <span className="text-sm font-bold text-gray-400 mr-1">AMD</span>
                      {car.price}
                    </div>
                  </div>
                  <button
                    onClick={() => handleBooking(car)}
                    className="btn-viva px-8 py-3 flex items-center gap-2 group"
                  >
                    {(t as any).selectCar}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
