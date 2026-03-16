import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, Menu, X, Globe, ChevronDown, LogOut, Tag } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Language, translations } from '../translations';
import { User as UserType } from '../App';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HeaderProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  onAction: (action: string) => void;
  user: UserType | null;
  onLogout: () => void;
}

export default function Header({ onLoginClick, onRegisterClick, lang, setLang, onAction, user, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const t = translations[lang];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/search-results');
      setSearchQuery('');
    }
  };

  const toggleLang = (newLang: Language) => {
    setLang(newLang);
    setIsLangMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-sm">
      {/* Top Bar */}
      <div className="bg-gray-50 border-bottom border-gray-200 py-1 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs font-medium text-gray-500">
          <div className="flex gap-6">
            <Link to="/" className="hover:text-viva-red transition-colors cursor-pointer">{t.personal}</Link>
            <Link to="/business" className="hover:text-viva-red transition-colors cursor-pointer">{t.business}</Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1 hover:text-viva-red transition-colors cursor-pointer"
              >
                <Globe size={14} />
                <span>{lang === 'en' ? 'English' : lang === 'hy' ? 'Հայերեն' : 'Русский'}</span>
                <ChevronDown size={12} className={cn("transition-transform", isLangMenuOpen && "rotate-180")} />
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-100 shadow-xl rounded-xl py-2 min-w-[120px] z-[60]">
                  <button 
                    onClick={() => toggleLang('en')}
                    className={cn("w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors", lang === 'en' && "text-viva-red font-bold")}
                  >
                    English
                  </button>
                  <button 
                    onClick={() => toggleLang('hy')}
                    className={cn("w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors", lang === 'hy' && "text-viva-red font-bold")}
                  >
                    Հայերեն
                  </button>
                  <button 
                    onClick={() => toggleLang('ru')}
                    className={cn("w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors", lang === 'ru' && "text-viva-red font-bold")}
                  >
                    Русский
                  </button>
                </div>
              )}
            </div>
            <Link to="/support" className="hover:text-viva-red transition-colors cursor-pointer">{t.support}</Link>
            <Link to="/shops" className="hover:text-viva-red transition-colors cursor-pointer">{t.shops}</Link>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 bg-viva-red rounded-full flex items-center justify-center text-white font-bold text-xl transition-transform group-hover:scale-105">
              V
            </div>
            <span className="text-2xl font-black tracking-tighter text-viva-dark">VIVA <span className="text-viva-red">FLIGHTS</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 font-semibold text-sm uppercase tracking-wide">
            <Link to="/flights" className={cn("pb-1 border-b-2 transition-all", (isActive('/') || isActive('/flights')) ? "text-viva-red border-viva-red" : "hover:text-viva-red border-transparent")}>{t.flights}</Link>
            <Link to="/hotels" className={cn("pb-1 border-b-2 transition-all", isActive('/hotels') ? "text-viva-red border-viva-red" : "hover:text-viva-red border-transparent")}>{t.hotels}</Link>
            <Link to="/car-rental" className={cn("pb-1 border-b-2 transition-all", isActive('/car-rental') ? "text-viva-red border-viva-red" : "hover:text-viva-red border-transparent")}>{t.carRental}</Link>
            <Link to="/hosting" className={cn("pb-1 border-b-2 transition-all", isActive('/hosting') ? "text-viva-red border-viva-red" : "hover:text-viva-red border-transparent")}>{(t as any).hosting}</Link>
            <Link to="/deals" className={cn("pb-1 border-b-2 transition-all", isActive('/deals') ? "text-viva-red border-viva-red" : "hover:text-viva-red border-transparent")}>{t.deals}</Link>
            <Link to="/airlines" className={cn("pb-1 border-b-2 transition-all", isActive('/airlines') ? "text-viva-red border-viva-red" : "hover:text-viva-red border-transparent")}>{t.airlines}</Link>
            <Link to="/check-in" className={cn("pb-1 border-b-2 transition-all", isActive('/check-in') ? "text-viva-red border-viva-red" : "hover:text-viva-red border-transparent")}>{t.checkIn}</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative group hidden md:block">
            <div className="flex items-center bg-gray-50 border-2 border-transparent focus-within:border-viva-red rounded-full px-4 py-1.5 transition-all w-64">
              <Search size={16} className="text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder={t.searchPlaceholder} 
                className="bg-transparent w-full outline-none text-sm font-bold text-viva-dark placeholder:text-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-full transition-all border border-gray-100"
                >
                  <div className="w-6 h-6 bg-viva-red rounded-full flex items-center justify-center text-white text-[10px] font-black">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-bold text-viva-dark">{user.name}</span>
                  <ChevronDown size={14} className={cn("transition-transform", isUserMenuOpen && "rotate-180")} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-white border border-gray-100 shadow-2xl rounded-2xl py-3 min-w-[180px] z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-gray-50 mb-2">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{(t as any).signedInAs}</p>
                      <p className="text-xs font-bold text-viva-dark truncate">{user.email}</p>
                    </div>
                    <Link 
                      to="/profile" 
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-sm font-bold text-gray-600 transition-colors"
                    >
                      <User size={16} />
                      {t.myProfile}
                    </Link>
                    <button 
                      onClick={() => { onLogout(); setIsUserMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-sm font-bold text-viva-red transition-colors"
                    >
                      <LogOut size={16} />
                      {t.logout}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="hidden xl:flex items-center gap-2 text-[10px] font-black text-viva-red uppercase tracking-widest bg-red-50 px-3 py-1.5 rounded-full animate-pulse">
                  <Tag size={12} />
                  {t.registerToGetDiscount}
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={onLoginClick}
                    className="text-sm font-bold text-viva-dark hover:text-viva-red transition-colors px-3 py-2"
                  >
                    {t.logIn}
                  </button>
                  <button 
                    onClick={onRegisterClick}
                    className="btn-viva text-sm"
                  >
                    {t.register}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-viva-dark"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col p-4 gap-4 font-bold text-lg">
            <Link to="/flights" onClick={() => setIsMenuOpen(false)} className={cn("text-left", (isActive('/') || isActive('/flights')) ? "text-viva-red" : "hover:text-viva-red")}>{t.flights}</Link>
            <Link to="/hotels" onClick={() => setIsMenuOpen(false)} className={cn("text-left", isActive('/hotels') ? "text-viva-red" : "hover:text-viva-red")}>{t.hotels}</Link>
            <Link to="/car-rental" onClick={() => setIsMenuOpen(false)} className={cn("text-left", isActive('/car-rental') ? "text-viva-red" : "hover:text-viva-red")}>{t.carRental}</Link>
            <Link to="/hosting" onClick={() => setIsMenuOpen(false)} className={cn("text-left", isActive('/hosting') ? "text-viva-red" : "hover:text-viva-red")}>{(t as any).hosting}</Link>
            <Link to="/deals" onClick={() => setIsMenuOpen(false)} className={cn("text-left", isActive('/deals') ? "text-viva-red" : "hover:text-viva-red")}>{t.deals}</Link>
            <Link to="/airlines" onClick={() => setIsMenuOpen(false)} className={cn("text-left", isActive('/airlines') ? "text-viva-red" : "hover:text-viva-red")}>{t.airlines}</Link>
            <div className="flex gap-4 py-2">
              <button 
                onClick={() => toggleLang('en')}
                className={cn("px-4 py-2 rounded-xl border-2 transition-all", lang === 'en' ? "border-viva-red text-viva-red bg-red-50" : "border-gray-100 text-gray-400")}
              >
                EN
              </button>
              <button 
                onClick={() => toggleLang('hy')}
                className={cn("px-4 py-2 rounded-xl border-2 transition-all", lang === 'hy' ? "border-viva-red text-viva-red bg-red-50" : "border-gray-100 text-gray-400")}
              >
                ՀՅ
              </button>
              <button 
                onClick={() => toggleLang('ru')}
                className={cn("px-4 py-2 rounded-xl border-2 transition-all", lang === 'ru' ? "border-viva-red text-viva-red bg-red-50" : "border-gray-100 text-gray-400")}
              >
                РУ
              </button>
            </div>
            <hr className="border-gray-100" />
            <div className="flex flex-col gap-3 pt-2">
              {user ? (
                <>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                    <div className="w-10 h-10 bg-viva-red rounded-full flex items-center justify-center text-white font-black">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-black text-viva-dark">{user.name}</p>
                      <p className="text-xs font-bold text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="btn-viva-outline w-full flex items-center justify-center gap-2">
                    <LogOut size={18} />
                    {t.logout}
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => { onLoginClick(); setIsMenuOpen(false); }} className="btn-viva-outline w-full">{t.logIn}</button>
                  <button onClick={() => { onRegisterClick(); setIsMenuOpen(false); }} className="btn-viva w-full">{t.register}</button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
