/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import FlightSearch from './components/FlightSearch';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import PlaceholderPage from './components/PlaceholderPage';
import HotelPage from './components/HotelPage';
import CarRentalPage from './components/CarRentalPage';
import DealsPage from './components/DealsPage';
import CheckInPage from './components/CheckInPage';
import { AirlinesPage } from './components/AirlinesPage';
import { AdminPanel } from './components/AdminPanel';
import ProfilePage from './components/ProfilePage';
import SearchResultsPage from './components/SearchResultsPage';
import HotelSearchResultsPage from './components/HotelSearchResultsPage';
import CarSearchResultsPage from './components/CarSearchResultsPage';
import HostingPage from './components/HostingPage';
import { Plane, Star, Shield, Clock, ArrowRight, MapPin, Hotel, Car, Tag, CheckCircle, HelpCircle, ShoppingBag, Settings } from 'lucide-react';
import { translations, Language } from './translations';
import { motion, AnimatePresence } from 'motion/react';

export interface Booking {
  id: string;
  flightNumber: string;
  from: string;
  to: string;
  date: string;
  price: string;
  status: 'confirmed' | 'pending';
  class: 'economy' | 'business';
}

export interface HotelBooking {
  id: string;
  hotelName: string;
  city: string;
  checkIn: string;
  checkOut: string;
  price: string;
  status: 'confirmed' | 'pending';
}

export interface CarBooking {
  id: string;
  carName: string;
  type: string;
  pickup: string;
  dropoff: string;
  pickupDate: string;
  dropoffDate: string;
  price: string;
  status: 'confirmed' | 'pending';
}

export interface User {
  name: string;
  email: string;
  registrationDate?: string;
  bookings?: Booking[];
  hotelBookings?: HotelBooking[];
  carBookings?: CarBooking[];
}

const POPULAR_DESTINATIONS = [
  {
    id: 1,
    cityKey: 'yerevan',
    countryKey: 'armenia',
    price: '45,000',
    image: 'https://images.unsplash.com/photo-1544161513-0179fe746fd5?auto=format&fit=crop&q=80&w=800',
    tagKey: 'home'
  },
  {
    id: 2,
    cityKey: 'paris',
    countryKey: 'france',
    price: '120,000',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800',
    tagKey: 'mostPopular'
  },
  {
    id: 3,
    cityKey: 'rome',
    countryKey: 'italy',
    price: '95,000',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800',
    tagKey: 'trending'
  },
  {
    id: 4,
    cityKey: 'dubai',
    countryKey: 'uae',
    price: '150,000',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
    tagKey: 'luxury'
  },
  {
    id: 5,
    cityKey: 'vienna',
    countryKey: 'austria',
    price: '115,000',
    image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&q=80&w=800',
    tagKey: 'culture'
  },
  {
    id: 6,
    cityKey: 'athens',
    countryKey: 'greece',
    price: '88,000',
    image: 'https://images.unsplash.com/photo-1503152394-c571994fd383?auto=format&fit=crop&q=80&w=800',
    tagKey: 'history'
  },
  {
    id: 7,
    cityKey: 'tbilisi',
    countryKey: 'georgia',
    price: '35,000',
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&q=80&w=800',
    tagKey: 'nearby'
  },
  {
    id: 8,
    cityKey: 'london',
    countryKey: 'uk',
    price: '180,000',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800',
    tagKey: 'business'
  },
  {
    id: 9,
    cityKey: 'berlin',
    countryKey: 'germany',
    price: '105,000',
    image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&q=80&w=800',
    tagKey: 'modern'
  },
  {
    id: 10,
    cityKey: 'prague',
    countryKey: 'czechRepublic',
    price: '92,000',
    image: 'https://images.unsplash.com/photo-1513807016779-d51c0c026263?auto=format&fit=crop&q=80&w=800',
    tagKey: 'romantic'
  },
  {
    id: 11,
    cityKey: 'amsterdam',
    countryKey: 'netherlands',
    price: '130,000',
    image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&q=80&w=800',
    tagKey: 'freedom'
  },
  {
    id: 12,
    cityKey: 'madrid',
    countryKey: 'spain',
    price: '118,000',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&q=80&w=800',
    tagKey: 'vibrant'
  }
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainContent({ lang, setLang, openAuth, handleAction, destinations }: { 
  lang: Language, 
  setLang: (l: Language) => void, 
  openAuth: (m: 'login' | 'register') => void,
  handleAction: (a: string) => void,
  destinations: any[]
}) {
  const t = translations[lang];
  const navigate = useNavigate();

  return (
    <>
      <FlightSearch lang={lang} onSearch={() => navigate('/search-results')} />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-viva-dark mb-4 uppercase tracking-tight">
              {t.whyChoose} <span className="text-viva-red">{t.vivaFlights}</span>
            </h2>
            <p className="text-gray-500 font-bold text-lg">{t.hospitalitySubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-[2.5rem] bg-gray-50 hover:bg-white hover:shadow-2xl hover:shadow-red-500/10 transition-all group cursor-pointer" onClick={() => navigate('/premium')}>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-viva-red mb-6 shadow-sm group-hover:bg-viva-red group-hover:text-white transition-colors">
                <Star size={32} />
              </div>
              <h3 className="text-2xl font-black text-viva-dark mb-4 uppercase tracking-tight">{t.premiumService}</h3>
              <p className="text-gray-500 font-bold leading-relaxed">
                {t.premiumDesc}
              </p>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-gray-50 hover:bg-white hover:shadow-2xl hover:shadow-red-500/10 transition-all group cursor-pointer" onClick={() => navigate('/safety')}>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-viva-red mb-6 shadow-sm group-hover:bg-viva-red group-hover:text-white transition-colors">
                <Shield size={32} />
              </div>
              <h3 className="text-2xl font-black text-viva-dark mb-4 uppercase tracking-tight">{t.safeSecure}</h3>
              <p className="text-gray-500 font-bold leading-relaxed">
                {t.safeDesc}
              </p>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-gray-50 hover:bg-white hover:shadow-2xl hover:shadow-red-500/10 transition-all group cursor-pointer" onClick={() => navigate('/punctuality')}>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-viva-red mb-6 shadow-sm group-hover:bg-viva-red group-hover:text-white transition-colors">
                <Clock size={32} />
              </div>
              <h3 className="text-2xl font-black text-viva-dark mb-4 uppercase tracking-tight">{t.onTime}</h3>
              <p className="text-gray-500 font-bold leading-relaxed">
                {t.onTimeDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-viva-dark mb-4 uppercase tracking-tight">
                {t.popularDestinations} <span className="text-viva-red">{t.destinations}</span>
              </h2>
              <p className="text-gray-500 font-bold text-lg">{t.trendingSubtitle}</p>
            </div>
            <button onClick={() => navigate('/destinations')} className="btn-viva-outline flex items-center gap-2 group">
              {t.viewAll}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((dest) => (
              <div key={dest.id} className="group cursor-pointer" onClick={() => navigate(`/book/${dest.cityKey}`)}>
                <div className="relative h-80 rounded-[2.5rem] overflow-hidden mb-6 shadow-xl">
                  <img 
                    src={dest.image} 
                    alt={(t as any)[dest.cityKey]} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <span className="bg-viva-red text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                      {(t as any)[dest.tagKey]}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-1 text-white/70 text-xs font-bold uppercase mb-1">
                      <MapPin size={12} />
                      {(t as any)[dest.countryKey]}
                    </div>
                    <h4 className="text-2xl font-black text-white uppercase tracking-tight">{(t as any)[dest.cityKey]}</h4>
                  </div>
                </div>
                <div className="flex justify-between items-center px-2">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">{t.startingFrom}</p>
                    <p className="text-xl font-black text-viva-dark">AMD {dest.price}</p>
                  </div>
                  <button className="w-10 h-10 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center text-viva-red hover:bg-viva-red hover:text-white hover:border-viva-red transition-all">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative rounded-[3rem] overflow-hidden bg-viva-red p-12 md:p-20 text-center text-white">
            <img 
              src="https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&q=80&w=2000" 
              alt="CTA Background" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight leading-tight">
                {t.readyAdventure}
              </h2>
              <p className="text-white/80 font-bold text-xl mb-10 max-w-2xl mx-auto">
                {t.ctaSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => openAuth('register')}
                  className="bg-white text-viva-red px-10 py-4 rounded-full font-black text-lg hover:bg-gray-100 transition-colors shadow-xl"
                >
                  {t.registerNow}
                </button>
                <button onClick={() => navigate('/about')} className="bg-transparent border-2 border-white/30 text-white px-10 py-4 rounded-full font-black text-lg hover:bg-white/10 transition-colors">
                  {t.learnMore}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [lang, setLang] = useState<Language>('en');
  const [toast, setToast] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [destinations, setDestinations] = useState<any[]>(POPULAR_DESTINATIONS);

  useEffect(() => {
    const storedDestinations = localStorage.getItem('viva_destinations');
    if (storedDestinations) {
      setDestinations(JSON.parse(storedDestinations));
    } else {
      localStorage.setItem('viva_destinations', JSON.stringify(POPULAR_DESTINATIONS));
    }

    const handleStorageChange = () => {
      const updated = localStorage.getItem('viva_destinations');
      if (updated) {
        setDestinations(JSON.parse(updated));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const openAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogin = (userData: User) => {
    const userWithDate = {
      ...userData,
      registrationDate: userData.registrationDate || new Date().toISOString()
    };
    setUser(userWithDate);
    setIsAuthModalOpen(false);
    showToast(`${t.welcomeMessage}, ${userWithDate.name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    showToast((t as any).loggedOutSuccess);
  };

  const handleBookFlight = (booking: Booking) => {
    if (!user) {
      openAuth('login');
      return;
    }

    const updatedUser = {
      ...user,
      bookings: [...(user.bookings || []), booking]
    };
    setUser(updatedUser);
    showToast((t as any).bookingSuccess);
  };

  const handleBookHotel = (booking: HotelBooking) => {
    if (!user) {
      openAuth('login');
      return;
    }

    const updatedUser = {
      ...user,
      hotelBookings: [...(user.hotelBookings || []), booking]
    };
    setUser(updatedUser);
    showToast((t as any).hotelBookingSuccess);
  };

  const handleBookCar = (booking: CarBooking) => {
    if (!user) {
      openAuth('login');
      return;
    }

    const updatedUser = {
      ...user,
      carBookings: [...(user.carBookings || []), booking]
    };
    setUser(updatedUser);
    showToast((t as any).carBookingSuccess);
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAction = (action: string) => {
    showToast(`${action} ${(t as any).serviceUpdating}`);
  };

  const t = translations[lang];

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header 
          onLoginClick={() => openAuth('login')} 
          onRegisterClick={() => openAuth('register')} 
          lang={lang}
          setLang={setLang}
          onAction={handleAction}
          user={user}
          onLogout={handleLogout}
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<MainContent lang={lang} setLang={setLang} openAuth={openAuth} handleAction={handleAction} destinations={destinations} />} />
            <Route path="/flights" element={<MainContent lang={lang} setLang={setLang} openAuth={openAuth} handleAction={handleAction} destinations={destinations} />} />
            <Route path="/hotels" element={<HotelPage lang={lang} user={user} onRegisterClick={() => openAuth('register')} />} />
            <Route path="/car-rental" element={<CarRentalPage lang={lang} />} />
            <Route path="/hosting" element={<HostingPage lang={lang} />} />
            <Route path="/deals" element={<DealsPage lang={lang} />} />
            <Route path="/check-in" element={<CheckInPage lang={lang} />} />
            <Route path="/airlines" element={<AirlinesPage lang={lang} />} />
            <Route path="/admin" element={<AdminPanel lang={lang} />} />
            <Route path="/profile" element={<ProfilePage user={user} lang={lang} />} />
            <Route path="/support" element={<PlaceholderPage title={t.support} icon={<HelpCircle size={48} />} lang={lang} />} />
            <Route path="/shops" element={<PlaceholderPage title={t.shops} icon={<ShoppingBag size={48} />} lang={lang} />} />
            <Route path="/search-results" element={<SearchResultsPage lang={lang} onBook={handleBookFlight} />} />
            <Route path="/hotel-results" element={<HotelSearchResultsPage lang={lang} onBook={handleBookHotel} />} />
            <Route path="/car-results" element={<CarSearchResultsPage lang={lang} onBook={handleBookCar} />} />
            <Route path="/destinations" element={<PlaceholderPage title={t.destinations} icon={<MapPin size={48} />} lang={lang} />} />
            <Route path="/premium" element={<PlaceholderPage title={t.premiumService} icon={<Star size={48} />} lang={lang} />} />
            <Route path="/safety" element={<PlaceholderPage title={t.safeSecure} icon={<Shield size={48} />} lang={lang} />} />
            <Route path="/punctuality" element={<PlaceholderPage title={t.onTime} icon={<Clock size={48} />} lang={lang} />} />
            <Route path="/about" element={<PlaceholderPage title={t.aboutUs} icon={<Plane size={48} />} lang={lang} />} />
            <Route path="/book/:city" element={<PlaceholderPage title={t.booking} icon={<Plane size={48} />} lang={lang} />} />
          </Routes>
        </main>

        <Footer lang={lang} onAction={handleAction} />

        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
          initialMode={authMode} 
          lang={lang}
          onAction={handleAction}
          onLogin={handleLogin}
        />

        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] bg-viva-dark text-white px-6 py-3 rounded-2xl font-bold shadow-2xl flex items-center gap-3"
            >
              <div className="w-2 h-2 bg-viva-red rounded-full animate-pulse"></div>
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
}
