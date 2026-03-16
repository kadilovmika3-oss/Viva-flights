import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import { Language, translations } from '../translations';

interface FooterProps {
  lang: Language;
  onAction: (action: string) => void;
}

export default function Footer({ lang, onAction }: FooterProps) {
  const t = translations[lang];

  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-viva-red rounded-full flex items-center justify-center text-white font-bold text-xl">
                V
              </div>
              <span className="text-2xl font-black tracking-tighter text-viva-dark">VIVA <span className="text-viva-red">FLIGHTS</span></span>
            </div>
            <p className="text-gray-500 font-medium leading-relaxed">
              Armenia's leading digital flight booking platform. Connecting you to the world with comfort and reliability.
            </p>
            <div className="flex gap-4">
              <button onClick={() => onAction('Facebook')} className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-viva-red hover:text-white hover:border-viva-red transition-all">
                <Facebook size={18} />
              </button>
              <button onClick={() => onAction('Instagram')} className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-viva-red hover:text-white hover:border-viva-red transition-all">
                <Instagram size={18} />
              </button>
              <button onClick={() => onAction('Twitter')} className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-viva-red hover:text-white hover:border-viva-red transition-all">
                <Twitter size={18} />
              </button>
              <button onClick={() => onAction('Youtube')} className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-viva-red hover:text-white hover:border-viva-red transition-all">
                <Youtube size={18} />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-black text-viva-dark mb-6 uppercase tracking-tight">{t.services}</h4>
            <ul className="space-y-4 font-bold text-gray-500">
              <li><Link to="/flights" className="hover:text-viva-red transition-colors">{t.flights}</Link></li>
              <li><Link to="/hotels" className="hover:text-viva-red transition-colors">{t.hotels}</Link></li>
              <li><Link to="/car-rental" className="hover:text-viva-red transition-colors">{t.carRental}</Link></li>
              <li><Link to="/insurance" className="hover:text-viva-red transition-colors">Travel Insurance</Link></li>
              <li><Link to="/group-bookings" className="hover:text-viva-red transition-colors">Group Bookings</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-black text-viva-dark mb-6 uppercase tracking-tight">{t.support}</h4>
            <ul className="space-y-4 font-bold text-gray-500">
              <li><Link to="/support" className="hover:text-viva-red transition-colors">Help Center</Link></li>
              <li><Link to="/check-in" className="hover:text-viva-red transition-colors">Manage Booking</Link></li>
              <li><Link to="/refund" className="hover:text-viva-red transition-colors">Refund Policy</Link></li>
              <li><Link to="/privacy" className="hover:text-viva-red transition-colors">{t.privacy}</Link></li>
              <li><Link to="/support" className="hover:text-viva-red transition-colors">Contact Us</Link></li>
              <li><Link to="/admin" className="text-viva-red hover:text-viva-dark transition-colors flex items-center gap-2">
                <div className="w-2 h-2 bg-viva-red rounded-full animate-pulse"></div>
                {t.adminPanel}
              </Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-black text-viva-dark mb-6 uppercase tracking-tight">{t.contact}</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-viva-red shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">{t.callUs}</p>
                  <p className="font-black text-viva-dark">+374 12 345 678</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-viva-red shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">{t.emailUs}</p>
                  <p className="font-black text-viva-dark">support@vivaflights.am</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-viva-red shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">{t.visitUs}</p>
                  <p className="font-black text-viva-dark text-sm">4/7 Amiryan St, Yerevan, Armenia</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold text-gray-400">
          <p>{t.rights}</p>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-viva-dark transition-colors">{t.terms}</Link>
            <Link to="/cookie-policy" className="hover:text-viva-dark transition-colors">{t.cookie}</Link>
            <Link to="/sitemap" className="hover:text-viva-dark transition-colors">{t.sitemap}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
