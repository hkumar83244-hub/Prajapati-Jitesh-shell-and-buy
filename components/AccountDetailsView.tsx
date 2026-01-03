
import React from 'react';
import { FFAccount, SellerProfile } from '../types.ts';
import { 
  ArrowLeft, 
  ShieldCheck, 
  MapPin, 
  TrendingUp, 
  Star, 
  MessageCircle, 
  IndianRupee, 
  CheckCircle2, 
  Zap, 
  Info,
  BadgeCheck
} from 'lucide-react';

interface AccountDetailsViewProps {
  account: FFAccount;
  seller: SellerProfile | undefined;
  onBack: () => void;
  onBuy: (account: FFAccount) => void;
  onChat: (account: FFAccount) => void;
  onSellerClick: (sellerId: string) => void;
}

const AccountDetailsView: React.FC<AccountDetailsViewProps> = ({ account, seller, onBack, onBuy, onChat, onSellerClick }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 group transition-colors"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
        Back to Marketplace
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Images & Main Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
            <img src={account.thumbnail} alt={account.title} className="w-full h-full object-cover" />
            <div className="absolute top-6 left-6 flex flex-col gap-3">
              <span className="fire-gradient text-white text-sm font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-widest">
                {account.rank}
              </span>
              {account.isVerified && (
                <div className="flex items-center gap-2 bg-blue-600 text-white px-4 py-1 rounded-full shadow-lg border border-blue-400/30">
                  <ShieldCheck size={16} />
                  <span className="text-xs font-black uppercase">Verified Ownership</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-black leading-tight">{account.title}</h1>
            
            <div className="flex flex-wrap gap-6 items-center border-y border-slate-800 py-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-slate-800 rounded-2xl text-orange-500">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Player Level</div>
                  <div className="text-xl font-black">{account.level}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-slate-800 rounded-2xl text-orange-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Server Region</div>
                  <div className="text-xl font-black">{account.region}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-slate-800 rounded-2xl text-orange-500">
                  <Zap size={24} />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Inventory Size</div>
                  <div className="text-xl font-black">{account.rareItems.length} Rare Items</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Info size={20} className="text-orange-500" /> Description
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed bg-slate-800/20 p-6 rounded-2xl border border-slate-700/50 italic">
                "{account.description}"
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Star size={20} className="text-orange-500" /> Rare Skins & Items
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {account.rareItems.map((item, idx) => (
                  <div key={idx} className="bg-slate-800 border border-slate-700 p-4 rounded-2xl flex items-center gap-3 group hover:border-orange-500 transition-colors">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    <span className="text-sm font-medium text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Sidebar Sticky */}
        <div className="space-y-6">
          <div className="sticky top-32 space-y-6">
            {/* Price Card */}
            <div className="bg-slate-800 border border-slate-700 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 blur-[60px] rounded-full -mr-10 -mt-10"></div>
              
              <div className="space-y-2 mb-8">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Current Offer</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-white">₹{account.price.toLocaleString('en-IN')}</span>
                  <span className="text-slate-500 line-through text-sm">₹{(account.price * 1.2).toFixed(0)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => onBuy(account)}
                  className="w-full py-5 fire-gradient text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-900/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <IndianRupee size={20} /> Instant Buy
                </button>
                <button 
                  onClick={() => onChat(account)}
                  className="w-full py-5 bg-slate-700 hover:bg-slate-600 text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-3 transition-all"
                >
                  <MessageCircle size={20} /> Chat with Seller
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-700 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck size={16} /> Secure Escrow Active
                </div>
                <div className="flex items-center gap-3 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 size={16} /> ID Delivery in 5 Mins
                </div>
              </div>
            </div>

            {/* Seller Info */}
            {seller && (
              <div 
                onClick={() => onSellerClick(seller.id)}
                className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 hover:border-slate-700 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img src={seller.avatar} alt={seller.name} className="w-14 h-14 rounded-full border-2 border-slate-700" />
                  <div>
                    <h4 className="font-bold text-lg flex items-center gap-1">
                      {seller.name}
                      {seller.isVerified && <BadgeCheck size={18} className="text-purple-400" />}
                    </h4>
                    <div className="flex items-center gap-1 text-orange-400">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-bold">{seller.rating} Rating</span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-500 text-sm line-clamp-2 italic mb-4">
                  "{seller.bio}"
                </p>
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-500 tracking-widest pt-4 border-t border-slate-800">
                  <span>{seller.totalSales} Sales</span>
                  <span>Joined {seller.joinedDate}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsView;
