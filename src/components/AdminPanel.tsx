import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../translations';
import { Users, MapPin, Plus, Trash2, Save, X, Database } from 'lucide-react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
}

interface AdminDestination {
  id: number;
  cityKey: string;
  countryKey: string;
  price: string;
  image: string;
  tagKey: string;
}

export function AdminPanel({ lang }: { lang: Language }) {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<'users' | 'destinations'>('users');
  
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [destinations, setDestinations] = useState<AdminDestination[]>([]);
  
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  
  const [isAddingDest, setIsAddingDest] = useState(false);
  const [newDest, setNewDest] = useState({ cityKey: '', countryKey: '', price: '', image: '', tagKey: 'trending' });

  useEffect(() => {
    const storedUsers = localStorage.getItem('viva_users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Default mock users
      const initialUsers = [
        { id: '1', name: 'Admin User', email: 'admin@viva.am' },
        { id: '2', name: 'John Doe', email: 'john@example.com' }
      ];
      setUsers(initialUsers);
      localStorage.setItem('viva_users', JSON.stringify(initialUsers));
    }

    const storedDestinations = localStorage.getItem('viva_destinations');
    if (storedDestinations) {
      setDestinations(JSON.parse(storedDestinations));
    } else {
      // These should match the initial POPULAR_DESTINATIONS in App.tsx
      const initialDestinations = [
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
        }
      ];
      setDestinations(initialDestinations);
      localStorage.setItem('viva_destinations', JSON.stringify(initialDestinations));
    }
  }, []);

  const saveUsers = (updatedUsers: AdminUser[]) => {
    setUsers(updatedUsers);
    localStorage.setItem('viva_users', JSON.stringify(updatedUsers));
  };

  const saveDestinations = (updatedDests: AdminDestination[]) => {
    setDestinations(updatedDests);
    localStorage.setItem('viva_destinations', JSON.stringify(updatedDests));
    // Trigger a storage event so other components know to update
    window.dispatchEvent(new Event('storage'));
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;
    const user = { ...newUser, id: Date.now().toString() };
    saveUsers([...users, user]);
    setNewUser({ name: '', email: '' });
    setIsAddingUser(false);
  };

  const handleDeleteUser = (id: string) => {
    saveUsers(users.filter(u => u.id !== id));
  };

  const handleAddDest = () => {
    if (!newDest.cityKey || !newDest.countryKey || !newDest.price) return;
    const dest = { 
      ...newDest, 
      id: Date.now(),
      image: newDest.image || 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=800'
    };
    saveDestinations([...destinations, dest]);
    setNewDest({ cityKey: '', countryKey: '', price: '', image: '', tagKey: 'trending' });
    setIsAddingDest(false);
  };

  const handleDeleteDest = (id: number) => {
    saveDestinations(destinations.filter(d => d.id !== id));
  };

  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-viva-dark uppercase tracking-tight mb-2">
              {t.adminDashboard}
            </h1>
            <p className="text-gray-500 font-bold flex items-center gap-2">
              <Database size={18} />
              {t.manageDatabase}
            </p>
          </div>
          
          <div className="flex bg-white p-1 rounded-2xl shadow-md border border-gray-100">
            <button 
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-2 ${activeTab === 'users' ? 'bg-viva-red text-white' : 'text-gray-400 hover:text-viva-red'}`}
            >
              <Users size={16} />
              {t.users}
            </button>
            <button 
              onClick={() => setActiveTab('destinations')}
              className={`px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-2 ${activeTab === 'destinations' ? 'bg-viva-red text-white' : 'text-gray-400 hover:text-viva-red'}`}
            >
              <MapPin size={16} />
              {t.destinations}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'users' ? (
            <motion.div 
              key="users"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-2xl font-black text-viva-dark uppercase tracking-tight">{t.users}</h2>
                <button 
                  onClick={() => setIsAddingUser(true)}
                  className="bg-viva-dark text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-viva-red transition-colors"
                >
                  <Plus size={16} />
                  {t.addUser}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                      <th className="px-8 py-4">{t.name}</th>
                      <th className="px-8 py-4">{t.email}</th>
                      <th className="px-8 py-4 text-right">{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {isAddingUser && (
                      <tr className="bg-red-50/30">
                        <td className="px-8 py-4">
                          <input 
                            type="text" 
                            placeholder={t.name}
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:border-viva-red"
                            value={newUser.name}
                            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                          />
                        </td>
                        <td className="px-8 py-4">
                          <input 
                            type="email" 
                            placeholder={t.email}
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:border-viva-red"
                            value={newUser.email}
                            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                          />
                        </td>
                        <td className="px-8 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={handleAddUser} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                              <Save size={16} />
                            </button>
                            <button onClick={() => setIsAddingUser(false)} className="p-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors">
                              <X size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                    {users.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-8 py-6 font-bold text-viva-dark">{user.name}</td>
                        <td className="px-8 py-6 font-medium text-gray-500">{user.email}</td>
                        <td className="px-8 py-6 text-right">
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-2 text-gray-300 hover:text-viva-red transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="destinations"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-2xl font-black text-viva-dark uppercase tracking-tight">{t.destinations}</h2>
                <button 
                  onClick={() => setIsAddingDest(true)}
                  className="bg-viva-dark text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-viva-red transition-colors"
                >
                  <Plus size={16} />
                  {t.addDestination}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                      <th className="px-8 py-4">{t.city}</th>
                      <th className="px-8 py-4">{t.country}</th>
                      <th className="px-8 py-4">{t.price}</th>
                      <th className="px-8 py-4 text-right">{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {isAddingDest && (
                      <tr className="bg-red-50/30">
                        <td className="px-8 py-4">
                          <input 
                            type="text" 
                            placeholder={(t as any).placeholderCity}
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:border-viva-red"
                            value={newDest.cityKey}
                            onChange={(e) => setNewDest({...newDest, cityKey: e.target.value})}
                          />
                        </td>
                        <td className="px-8 py-4">
                          <input 
                            type="text" 
                            placeholder={(t as any).placeholderCountry}
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:border-viva-red"
                            value={newDest.countryKey}
                            onChange={(e) => setNewDest({...newDest, countryKey: e.target.value})}
                          />
                        </td>
                        <td className="px-8 py-4">
                          <input 
                            type="text" 
                            placeholder="45,000"
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:border-viva-red"
                            value={newDest.price}
                            onChange={(e) => setNewDest({...newDest, price: e.target.value})}
                          />
                        </td>
                        <td className="px-8 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={handleAddDest} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                              <Save size={16} />
                            </button>
                            <button onClick={() => setIsAddingDest(false)} className="p-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors">
                              <X size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                    {destinations.map(dest => (
                      <tr key={dest.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <img src={dest.image} className="w-10 h-10 rounded-lg object-cover" alt="" referrerPolicy="no-referrer" />
                            <span className="font-bold text-viva-dark uppercase tracking-tight">{t[dest.cityKey as keyof typeof t] || dest.cityKey}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 font-medium text-gray-500">{t[dest.countryKey as keyof typeof t] || dest.countryKey}</td>
                        <td className="px-8 py-6 font-black text-viva-red">{dest.price} AMD</td>
                        <td className="px-8 py-6 text-right">
                          <button 
                            onClick={() => handleDeleteDest(dest.id)}
                            className="p-2 text-gray-300 hover:text-viva-red transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
