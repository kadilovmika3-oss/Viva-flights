import React from 'react';
import { Tag, ArrowRight, Percent, Gift, Zap } from 'lucide-react';
import { Language, translations } from '../translations';

interface DealsPageProps {
  lang: Language;
}

const DEALS = (t: any) => [
  {
    id: 1,
    title: t.earlyBirdTitle,
    description: t.earlyBirdDesc,
    code: 'EARLY20',
    icon: <Zap className="text-yellow-500" />,
    color: 'bg-yellow-50'
  },
  {
    id: 2,
    title: t.weekendGetawayTitle,
    description: t.weekendGetawayDesc,
    code: 'WEEKEND',
    icon: <Gift className="text-viva-red" />,
    color: 'bg-red-50'
  },
  {
    id: 3,
    title: t.studentDiscountTitle,
    description: t.studentDiscountDesc,
    code: 'STUDENT10',
    icon: <Percent className="text-blue-500" />,
    color: 'bg-blue-50'
  }
];

export default function DealsPage({ lang }: DealsPageProps) {
  const t = translations[lang];

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-viva-red/10 rounded-full flex items-center justify-center text-viva-red mx-auto mb-6">
            <Tag size={40} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-viva-dark mb-4 uppercase tracking-tight">
            {(t as any).exclusive} <span className="text-viva-red">{t.deals}</span>
          </h1>
          <p className="text-gray-500 font-bold text-lg max-w-2xl mx-auto">
            {(t as any).dealsHeroSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DEALS(t).map((deal) => (
            <div key={deal.id} className={`p-8 rounded-[2.5rem] ${deal.color} border-2 border-transparent hover:border-viva-red/20 transition-all group`}>
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                {deal.icon}
              </div>
              <h3 className="text-2xl font-black text-viva-dark mb-4 uppercase tracking-tight">{deal.title}</h3>
              <p className="text-gray-500 font-bold mb-8 leading-relaxed">
                {deal.description}
              </p>
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border-2 border-dashed border-gray-200">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{(t as any).promoCode}</p>
                  <p className="text-lg font-black text-viva-dark tracking-tighter">{deal.code}</p>
                </div>
                <button className="bg-viva-red text-white px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-viva-dark transition-colors">
                  {(t as any).copy}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-20 bg-viva-dark rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-viva-red rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-64 h-64 bg-viva-red rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight">{(t as any).neverMissDeal}</h2>
            <p className="text-white/60 font-bold text-lg mb-10 max-w-xl mx-auto">
              {(t as any).newsletterSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="flex-grow bg-white/10 border-2 border-white/20 rounded-full px-6 py-4 outline-none focus:border-viva-red transition-colors font-bold"
              />
              <button className="btn-viva px-8 py-4 whitespace-nowrap">
                {(t as any).subscribe}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
