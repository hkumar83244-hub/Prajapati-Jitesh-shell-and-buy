
import React, { useState } from 'react';
import { FFAccount } from '../types.ts';
import { ShieldCheck, TrendingUp, User, MessageCircle, BadgeCheck, Heart } from 'lucide-react';

interface ListingCardProps {
  account: FFAccount;
  onSelect: (account: FFAccount) => void;
  onSellerClick?: (sellerId: string) => void;
  onChatClick?: (account: FFAccount) => void;
  onLike?: (accountId: string) => void;
  isSellerVerified?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({ account, onSelect, onSellerClick, onChatClick, onLike, isSellerVerified }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleSellerClick = (e: React.MouseEvent) => {
    if (onSellerClick) {
      e.stopPropagation();
      onSellerClick(account.sellerId);
    }
  };

  const handleChatClick = (e: React.MouseEvent) => {
    if (onChatClick) {
      e.stopPropagation();
      onChatClick(account);
    }
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLiked && onLike) {
      onLike(account.id);
      setIsLiked(true);
    }
  };

  return (
    <div 
      onClick={() => onSelect(account)}
      className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-orange-500 transition-all cursor-pointer group flex flex-col h-full"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={account.thumbnail} 
          alt={account.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="bg-orange-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-lg w-fit">
            {account.rank}
          </span>
          {account.isVerified && (
            <div className="flex items-center gap-1.5 bg-blue-600 px-2 py-0.5 rounded-full shadow-lg w-fit" title="Account Ownership Verified">
              <ShieldCheck size={12} className="text-white" />
              <span className="text-[8px] font-black uppercase text-white">Verified Account</span>
            </div>
          )}
        </div>
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg">
          <span className="text-orange-400 font-bold">₹{account.price.toLocaleString('en-IN')}</span>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-bold text-lg line-clamp-1 group-hover:text-orange-400 transition-colors flex-1">
            {account.title}
          </h3>
          <div className="flex items-center gap-1 bg-slate-900/50 px-2 py-1 rounded-lg">
            <Heart size={14} className={isLiked ? "text-red-500 fill-red-500" : "text-slate-500"} />
            <span className="text-xs font-bold text-slate-300">{account.likes}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-400 text-sm mb-3">
          <span className="flex items-center gap-1">
            <TrendingUp size={14} className="text-emerald-400" />
            Lvl {account.level}
          </span>
          <button 
            onClick={handleSellerClick}
            className="flex items-center gap-1 hover:text-orange-400 transition-colors group/seller"
          >
            <User size={14} />
            <span className="truncate max-w-[80px]">{account.sellerName}</span>
            {isSellerVerified && (
              <BadgeCheck size={14} className="text-purple-400" title="Identity Verified Seller" />
            )}
          </button>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {account.rareItems.slice(0, 2).map((item, idx) => (
            <span key={idx} className="bg-slate-700/50 text-slate-300 text-[10px] px-2 py-0.5 rounded border border-slate-600">
              {item}
            </span>
          ))}
          {account.rareItems.length > 2 && (
            <span className="text-slate-500 text-[10px] self-center">+{account.rareItems.length - 2} more</span>
          )}
        </div>

        <div className="mt-auto flex gap-2">
          <button 
            onClick={handleLikeClick}
            className={`p-2 rounded-xl transition-all active:scale-90 border ${isLiked ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-slate-700 border-slate-600 text-slate-400 hover:text-white hover:bg-slate-600'}`}
            title="Like this ID"
          >
            <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={handleChatClick}
            className="p-2 bg-slate-700 border border-slate-600 hover:bg-slate-600 text-white rounded-xl transition-all active:scale-90"
            title="Chat with seller"
          >
            <MessageCircle size={20} />
          </button>
          <button className="flex-1 py-2 fire-gradient rounded-xl font-bold text-sm shadow-lg shadow-orange-900/20 active:scale-95 transition-all">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
