import React from 'react';
import { User, Calendar, Mail, Shield, ArrowLeft, Plane, MapPin, Clock, CheckCircle, ArrowRight, Hotel, Car } from 'lucide-react';
import { Language, translations } from '../translations';
import { User as UserType } from '../App';
import { useNavigate } from 'react-router-dom';

interface ProfilePageProps {
  user: UserType | null;
  lang: Language;
}

export default function ProfilePage({ user, lang }: ProfilePageProps) {
  const t = translations[lang];
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-6">
          <User size={40} />
        </div>
        <h2 className="text-2xl font-black text-viva-dark mb-2 uppercase tracking-tight">Access Denied</h2>
        <p className="text-gray-500 font-bold mb-8">Please log in to view your profile.</p>
        <button onClick={() => navigate('/')} className="btn-viva flex items-center gap-2">
          <ArrowLeft size={18} />
          {t.goBack}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl md:text-5xl font-black text-viva-dark uppercase tracking-tight">
          {t.myProfile}
        </h1>
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-viva-dark" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-[2.5rem] shadow-xl p-8 text-center border border-gray-100">
            <div className="w-24 h-24 bg-viva-red rounded-full flex items-center justify-center text-white text-4xl font-black mx-auto mb-6 shadow-lg shadow-red-500/20">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-black text-viva-dark uppercase tracking-tight mb-1">{user.name}</h2>
            <p className="text-gray-400 font-bold text-sm mb-6">{user.email}</p>
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
              <Shield size={12} />
              Verified Account
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-gray-100">
            <h3 className="text-lg font-black text-viva-dark uppercase tracking-widest mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-viva-red">
                <User size={18} />
              </div>
              {(t as any).profileInfo}
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 shadow-sm">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{(t as any).fullName}</p>
                  <p className="font-bold text-viva-dark">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 shadow-sm">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{(t as any).email}</p>
                  <p className="font-bold text-viva-dark">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 shadow-sm">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{(t as any).registrationDate}</p>
                  <p className="font-bold text-viva-dark">
                    {user.registrationDate ? new Date(user.registrationDate).toLocaleDateString() : new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

            {/* Flight Bookings */}
            <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-gray-100 mb-6">
              <h3 className="text-lg font-black text-viva-dark uppercase tracking-widest mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-viva-red">
                  <Plane size={18} />
                </div>
                {(t as any).myBookings}
              </h3>

              {user.bookings && user.bookings.length > 0 ? (
                <div className="space-y-4">
                  {user.bookings.map((booking) => (
                    <div key={booking.id} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:border-viva-red/20 transition-all">
                      <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div className="flex-grow grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{(t as any).flightNumber}</p>
                            <p className="font-black text-viva-dark">{booking.flightNumber}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Route</p>
                            <p className="font-bold text-viva-dark text-sm">{booking.from} <ArrowRight size={12} className="inline mx-1" /> {booking.to}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Date</p>
                            <p className="font-bold text-viva-dark text-sm">{new Date(booking.date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Class</p>
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                              booking.class === 'business' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                            }`}>
                              {(t as any)[booking.class === 'business' ? 'businessClass' : 'economyClass']}
                            </span>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Price</p>
                            <p className="font-black text-viva-dark text-sm">AMD {booking.price}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{(t as any).status}</p>
                            <div className="flex items-center gap-1 text-green-600">
                              <CheckCircle size={12} />
                              <span className="text-[10px] font-black uppercase tracking-widest">{(t as any).confirmed}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-300 mx-auto mb-4">
                    <Plane size={32} />
                  </div>
                  <p className="text-gray-400 font-bold">{(t as any).noBookings}</p>
                </div>
              )}
            </div>

            {/* Hotel Bookings */}
            <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-gray-100 mb-6">
              <h3 className="text-lg font-black text-viva-dark uppercase tracking-widest mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-viva-red">
                  <Hotel size={18} />
                </div>
                {(t as any).myHotelBookings}
              </h3>

              {user.hotelBookings && user.hotelBookings.length > 0 ? (
                <div className="space-y-4">
                  {user.hotelBookings.map((booking) => (
                    <div key={booking.id} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:border-viva-red/20 transition-all">
                      <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div className="flex-grow grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{(t as any).hotels || 'Hotel'}</p>
                            <p className="font-black text-viva-dark">{booking.hotelName}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{(t as any).city || 'City'}</p>
                            <p className="font-bold text-viva-dark text-sm">{booking.city}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{(t as any).dates || 'Dates'}</p>
                            <p className="font-bold text-viva-dark text-sm">
                              {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Price</p>
                            <p className="font-black text-viva-dark text-sm">AMD {booking.price}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{(t as any).status}</p>
                            <div className="flex items-center gap-1 text-green-600">
                              <CheckCircle size={12} />
                              <span className="text-[10px] font-black uppercase tracking-widest">{(t as any).confirmed}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-300 mx-auto mb-4">
                    <Hotel size={32} />
                  </div>
                  <p className="text-gray-400 font-bold">No hotel bookings yet</p>
                </div>
              )}
            </div>

            {/* Car Bookings */}
            <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-gray-100 mb-6">
              <h3 className="text-lg font-black text-viva-dark uppercase tracking-widest mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-viva-red">
                  <Car size={18} />
                </div>
                {(t as any).myCarBookings}
              </h3>

              {user.carBookings && user.carBookings.length > 0 ? (
                <div className="space-y-4">
                  {user.carBookings.map((booking) => (
                    <div key={booking.id} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:border-viva-red/20 transition-all">
                      <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div className="flex-grow grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{(t as any).carRental || 'Vehicle'}</p>
                            <p className="font-black text-viva-dark">{booking.carName}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{(t as any).type || 'Type'}</p>
                            <p className="font-bold text-viva-dark text-sm">{booking.type}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{(t as any).dates || 'Dates'}</p>
                            <p className="font-bold text-viva-dark text-sm">
                              {new Date(booking.pickupDate).toLocaleDateString()} - {new Date(booking.dropoffDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Price</p>
                            <p className="font-black text-viva-dark text-sm">AMD {booking.price}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{(t as any).status}</p>
                            <div className="flex items-center gap-1 text-green-600">
                              <CheckCircle size={12} />
                              <span className="text-[10px] font-black uppercase tracking-widest">{(t as any).confirmed}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-300 mx-auto mb-4">
                    <Car size={32} />
                  </div>
                  <p className="text-gray-400 font-bold">No car rentals yet</p>
                </div>
              )}
            </div>

          <div className="bg-viva-red/5 rounded-[2.5rem] p-8 border border-viva-red/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-viva-red rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-500/20">
                <Shield size={24} />
              </div>
              <div>
                <h4 className="text-lg font-black text-viva-dark uppercase tracking-tight mb-2">Exclusive Benefits</h4>
                <p className="text-gray-600 font-bold text-sm leading-relaxed">
                  As a registered member, you're eligible for a 10% discount on your next booking. Use code <span className="text-viva-red font-black">VIVA10</span> at checkout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
