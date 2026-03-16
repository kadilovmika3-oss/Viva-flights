import React from 'react';
import { Home, Key, DollarSign, Shield, Users, ArrowRight, MapPin, Camera, Star } from 'lucide-react';
import { Language, translations } from '../translations';
import { motion } from 'motion/react';

interface HostingPageProps {
  lang: Language;
}

export default function HostingPage({ lang }: HostingPageProps) {
  const t = translations[lang];

  const benefits = [
    {
      icon: <DollarSign size={32} />,
      title: 'Earn Extra Income',
      desc: 'Turn your spare room or entire home into a source of income.'
    },
    {
      icon: <Shield size={32} />,
      title: 'Secure & Protected',
      desc: 'We provide insurance and support to keep your home safe.'
    },
    {
      icon: <Users size={32} />,
      title: 'Global Community',
      desc: 'Connect with travelers from all over the world.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2000" 
          alt="Hosting Hero" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black mb-6 uppercase tracking-tight"
          >
            {(t as any).becomeHost}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl font-bold mb-10 text-white/90"
          >
            {(t as any).hostHeroSubtitle}
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-viva-red text-white px-10 py-4 rounded-full font-black text-lg hover:bg-viva-red/90 transition-all shadow-xl shadow-red-500/20"
          >
            START HOSTING
          </motion.button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-viva-dark mb-4 uppercase tracking-tight">
              Why Host on <span className="text-viva-red">Viva</span>?
            </h2>
            <p className="text-gray-500 font-bold text-lg">{(t as any).listProperty}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 hover:border-viva-red/20 transition-all group">
                <div className="w-16 h-16 bg-viva-red/10 rounded-2xl flex items-center justify-center text-viva-red mb-6 group-hover:bg-viva-red group-hover:text-white transition-colors">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-black text-viva-dark mb-4 uppercase tracking-tight">{benefit.title}</h3>
                <p className="text-gray-500 font-bold leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-viva-dark mb-8 uppercase tracking-tight">
                Three Simple Steps <br />
                <span className="text-viva-red text-2xl">To Start Earning</span>
              </h2>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-viva-dark text-white rounded-full flex items-center justify-center font-black shrink-0">1</div>
                  <div>
                    <h4 className="text-xl font-black text-viva-dark uppercase mb-2">List Your Space</h4>
                    <p className="text-gray-500 font-bold">Add photos, description, and set your price. It's free to list!</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-viva-dark text-white rounded-full flex items-center justify-center font-black shrink-0">2</div>
                  <div>
                    <h4 className="text-xl font-black text-viva-dark uppercase mb-2">Welcome Guests</h4>
                    <p className="text-gray-500 font-bold">Communicate with travelers and prepare your space for their arrival.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-viva-dark text-white rounded-full flex items-center justify-center font-black shrink-0">3</div>
                  <div>
                    <h4 className="text-xl font-black text-viva-dark uppercase mb-2">Get Paid</h4>
                    <p className="text-gray-500 font-bold">Receive payments securely through our platform after guests check in.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&q=80&w=1000" 
                alt="Hosting Steps" 
                className="rounded-[3rem] shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 max-w-xs">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                    <Star size={24} fill="currentColor" />
                  </div>
                  <div>
                    <p className="font-black text-viva-dark">Superhost Status</p>
                    <p className="text-xs text-gray-400 font-bold uppercase">Achieved in 3 months</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 font-bold italic">"Hosting has changed my life. I've met so many amazing people!"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ/CTA Section */}
      <section className="py-24 bg-viva-dark text-white rounded-t-[4rem]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-8 uppercase tracking-tight">
            Ready to share your space?
          </h2>
          <p className="text-white/60 font-bold text-lg mb-12">
            Join our community of hosts and start your journey today. We're here to support you every step of the way.
          </p>
          <button className="bg-viva-red text-white px-12 py-5 rounded-full font-black text-xl hover:bg-viva-red/90 transition-all shadow-2xl shadow-red-500/20">
            CREATE YOUR LISTING
          </button>
        </div>
      </section>
    </div>
  );
}
