
import React from 'react';
import { User, ViewState } from '../types.ts';
import EagleLogo from './EagleLogo.tsx';
import { 
  Settings, 
  Wallet, 
  History, 
  LogOut, 
  ShieldCheck, 
  IndianRupee, 
  TrendingUp, 
  Package, 
  ArrowRight
} from 'lucide-react';

interface UserProfileViewProps {
  user: User;
  onLogout: () => void;
  onNavigate: (view: ViewState) => void;
}

const UserProfileView: React.FC<UserProfileViewProps> = ({ user, onLogout, onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-in fade-in zoom-in-95 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar / User Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 fire-gradient opacity-20"></div>
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-24 h-24 rounded-full border-4 border-slate-800 mx-auto mb-4 bg-slate-900 shadow-2xl" 
              />
              <h2 className="text-2xl font-black">{user.name}</h2>
              <p className="text-slate-500 text-sm mb-6">{user.email || user.phone}</p>
              
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => onNavigate(ViewState.HISTORY)}
                  className="flex items-center justify-between p-4 bg-slate-800 hover:bg-slate-700 rounded-2xl transition-all group"
                >
                  <div className="flex items-center gap-3 text-sm font-bold">
                    <History size={18} className="text-blue-500" /> History
                  </div>
                  <ArrowRight size={16} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="flex items-center justify-between p-4 bg-slate-800 hover:bg-slate-700 rounded-2xl transition-all group">
                  <div className="flex items-center gap-3 text-sm font-bold">
                    <Settings size={18} className="text-slate-400" /> Settings
                  </div>
                  <ArrowRight size={16} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={onLogout}
                  className="flex items-center justify-between p-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-2xl transition-all group"
                >
                  <div className="flex items-center gap-3 text-sm font-bold">
                    <LogOut size={18} /> Logout
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-3xl flex items-center gap-4">
            <div className="bg-emerald-500/10 p-3 rounded-2xl text-emerald-500">
              <ShieldCheck size={24} />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-emerald-500/60 tracking-widest">Trust Status</div>
              <div className="text-sm font-bold text-emerald-400">Identity Verified</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] flex flex-col justify-between group hover:border-blue-500 transition-all">
              <div className="flex items-center justify-between mb-8">
                <div className="p-3 bg-blue-600/10 rounded-2xl text-blue-500 group-hover:scale-110 transition-transform">
                  <Wallet size={24} />
                </div>
                <button className="text-[10px] font-black uppercase text-blue-500 tracking-widest border border-blue-500/20 px-3 py-1 rounded-full hover:bg-blue-500 hover:text-white transition-all">
                  Top Up
                </button>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Wallet Balance</div>
                <div className="text-4xl font-black">₹{user.balance.toLocaleString('en-IN')}</div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] flex flex-col justify-between group hover:border-cyan-500 transition-all">
              <div className="flex items-center justify-between mb-8">
                <div className="p-3 bg-cyan-600/10 rounded-2xl text-cyan-500 group-hover:scale-110 transition-transform">
                  <TrendingUp size={24} />
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Total Transactions</div>
                <div className="text-4xl font-black">{user.transactions.length}</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 px-2">
              <EagleLogo size={20} className="text-blue-500" /> Active Deals
            </h3>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-2">
                <Package size={24} className="text-slate-600" />
              </div>
              <h4 className="font-bold text-slate-300">No active listings</h4>
              <p className="text-slate-500 text-sm max-w-xs mx-auto">You haven't listed any accounts for sale yet. Turn your FF ID into real cash!</p>
              <button 
                onClick={() => onNavigate(ViewState.SELL)}
                className="fire-gradient text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-900/20"
              >
                Start Selling
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;
