
import React, { useState, useMemo, useEffect } from 'react';
import { ViewState, FFAccount, SellerProfile, ChatSession, Message, Review, User as AppUser, Transaction } from './types.ts';
import ListingCard from './components/ListingCard.tsx';
import SellForm from './components/SellForm.tsx';
import VerificationModule from './components/VerificationModule.tsx';
import ChatOverlay from './components/ChatOverlay.tsx';
import ReviewModal from './components/ReviewModal.tsx';
import ReviewList from './components/ReviewList.tsx';
import AccountCredentialsModal from './components/AccountCredentialsModal.tsx';
import LoginView from './components/LoginView.tsx';
import UserProfileView from './components/UserProfileView.tsx';
import HistoryView from './components/HistoryView.tsx';
import AccountDetailsView from './components/AccountDetailsView.tsx';
import EagleLogo from './components/EagleLogo.tsx';
import { 
  ShoppingBag, 
  PlusSquare, 
  Search, 
  ShieldCheck, 
  CreditCard,
  ArrowLeft,
  X,
  CheckCircle2,
  MapPin,
  Star,
  Calendar,
  Package,
  Check,
  Filter,
  IndianRupee,
  SlidersHorizontal,
  MessageCircle,
  RotateCcw,
  Key,
  BadgeCheck,
  Fingerprint,
  Heart,
  LogOut,
  User as UserIcon,
  AlertTriangle,
  LayoutDashboard
} from 'lucide-react';

const MOCK_SELLERS: SellerProfile[] = [
  {
    id: 's1',
    name: 'ProPlayerIN',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ProPlayerIN',
    rating: 4.9,
    totalSales: 154,
    joinedDate: 'Jan 2023',
    isVerified: true,
    bio: 'Professional FF account collector and trader. Specializing in OG accounts and Grandmaster IDs.',
    location: 'Mumbai, India',
    reviews: [
      { id: 'r1', buyerName: 'Grinder99', rating: 5, comment: 'Amazing account, exactly as described! The process was so smooth.', date: 'Oct 12, 2023' },
      { id: 'r2', buyerName: 'RohanFF', rating: 4, comment: 'Good seller, response time was a bit slow but the account is top notch.', date: 'Nov 5, 2023' }
    ]
  },
  {
    id: 's2',
    name: 'LegendX',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LegendX',
    rating: 4.7,
    totalSales: 82,
    joinedDate: 'Mar 2023',
    isVerified: true,
    bio: 'Trading rare bundles and skin-heavy IDs. Quick delivery guaranteed.',
    location: 'Delhi, India',
    reviews: [
      { id: 'r3', buyerName: 'AceGamer', rating: 5, comment: 'Legendary indeed! Got my Heroic ID within minutes.', date: 'Dec 1, 2023' }
    ]
  },
  {
    id: 's3',
    name: 'RiteshGamer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RiteshGamer',
    rating: 4.5,
    totalSales: 23,
    joinedDate: 'Aug 2023',
    isVerified: false,
    bio: 'Budget IDs for serious grinders. Fair prices, no nonsense.',
    location: 'Bangalore, India',
    reviews: []
  },
  {
    id: 's4',
    name: 'KingOfFire',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KingOfFire',
    rating: 5.0,
    totalSales: 310,
    joinedDate: 'Dec 2022',
    isVerified: true,
    bio: 'The biggest ID marketplace in the North. All Evo maxed specialists.',
    location: 'Chandigarh, India',
    reviews: [
      { id: 'r4', buyerName: 'ViperKing', rating: 5, comment: 'Best deal for Evo guns. Trustworthy seller.', date: 'Sep 20, 2023' }
    ]
  }
];

const MOCK_LISTINGS: FFAccount[] = [
  {
    id: '1',
    sellerId: 's1',
    title: 'Grandmaster Account | S1 to S10 Heroic | Rare Bunny MP40',
    rank: 'Grandmaster',
    level: 78,
    rareItems: ['Bunny MP40', 'Cobra MP40', 'S1 Elite Pass'],
    price: 15500,
    sellerName: 'ProPlayerIN',
    description: 'Ultra rare account with OG items. Max skins for all primary weapons.',
    thumbnail: 'https://picsum.photos/seed/ff1/800/450',
    isVerified: true,
    likes: 245,
    region: 'India'
  },
  {
    id: '2',
    sellerId: 's2',
    title: 'Heroic ID | Angelic Pants | Criminal Bundle Blue',
    rank: 'Heroic',
    level: 65,
    rareItems: ['Angelic Pants', 'Blue Criminal', 'V Badge'],
    price: 8900,
    sellerName: 'LegendX',
    description: 'High level ID with rare seasonal rewards and bundles.',
    thumbnail: 'https://picsum.photos/seed/ff2/800/450',
    isVerified: false,
    likes: 120,
    region: 'India'
  },
  {
    id: '3',
    sellerId: 's3',
    title: 'Diamond 4 Account | Budget Friendly | Good Skins',
    rank: 'Diamond',
    level: 52,
    rareItems: ['Evo AK max', 'Incubator M1014'],
    price: 3200,
    sellerName: 'RiteshGamer',
    description: 'Perfect for someone starting out with high level gun skins.',
    thumbnail: 'https://picsum.photos/seed/ff3/800/450',
    isVerified: true,
    likes: 88,
    region: 'India'
  },
  {
    id: '4',
    sellerId: 's4',
    title: 'Veteran Grandmaster | All Evo Guns Maxed',
    rank: 'Grandmaster',
    level: 82,
    rareItems: ['All Evo Max', 'Sakura Bundle', 'Hip Hop'],
    price: 45000,
    sellerName: 'KingOfFire',
    description: 'The ultimate veteran account for serious collectors.',
    thumbnail: 'https://picsum.photos/seed/ff4/800/450',
    isVerified: true,
    likes: 532,
    region: 'India'
  }
];

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx1',
    accountId: '2',
    title: 'Heroic ID | Angelic Pants',
    amount: 8900,
    date: 'Dec 12, 2023',
    type: 'BUY',
    status: 'COMPLETED',
    thumbnail: 'https://picsum.photos/seed/ff2/800/450'
  }
];

export default function App() {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [view, setView] = useState<ViewState>(ViewState.AUTH);
  const [listings, setListings] = useState<FFAccount[]>(MOCK_LISTINGS);
  const [sellers, setSellers] = useState<SellerProfile[]>(MOCK_SELLERS);
  const [selectedAccount, setSelectedAccount] = useState<FFAccount | null>(null);
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);
  const [pendingListing, setPendingListing] = useState<FFAccount | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [profileTab, setProfileTab] = useState<'listings' | 'reviews'>('listings');
  const [isVerifyingSeller, setIsVerifyingSeller] = useState(false);
  
  // Marketplace Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [rankFilter, setRankFilter] = useState('All');
  const [maxPrice, setMaxPrice] = useState(50000);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  // Chat State
  const [activeChat, setActiveChat] = useState<ChatSession | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('fm_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setView(ViewState.HOME);
    }
  }, []);

  const handleLogin = (user: any) => {
    const fullUser: AppUser = {
      ...user,
      balance: 15000,
      joinedDate: 'Oct 2023',
      transactions: MOCK_TRANSACTIONS
    };
    setCurrentUser(fullUser);
    localStorage.setItem('fm_user', JSON.stringify(fullUser));
    setView(ViewState.HOME);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('fm_user');
    setView(ViewState.AUTH);
    setShowLogoutConfirm(false);
  };

  const activeSeller = useMemo(() => {
    return sellers.find(s => s.id === (selectedSellerId || selectedAccount?.sellerId)) || null;
  }, [selectedSellerId, selectedAccount, sellers]);

  const sellerListings = useMemo(() => {
    return listings.filter(l => l.sellerId === selectedSellerId);
  }, [listings, selectedSellerId]);

  const filteredListings = useMemo(() => {
    return listings.filter(acc => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = acc.title.toLowerCase().includes(query) || 
                            acc.rareItems.some(i => i.toLowerCase().includes(query)) ||
                            acc.sellerName.toLowerCase().includes(query);
      const matchesRank = rankFilter === 'All' || acc.rank === rankFilter;
      const matchesPrice = acc.price <= maxPrice;
      return matchesSearch && matchesRank && matchesPrice;
    });
  }, [listings, searchQuery, rankFilter, maxPrice]);

  const handleSellSuccess = (newListing: any) => {
    const formatted: FFAccount = {
      id: newListing.id,
      sellerId: currentUser?.id || 'anonymous',
      title: newListing.suggestedTitle,
      rank: newListing.rank as any,
      level: newListing.level,
      rareItems: newListing.items.split(','),
      price: newListing.estimatedPrice,
      sellerName: currentUser?.name || newListing.seller || 'Anonymous',
      description: newListing.generatedDescription,
      thumbnail: newListing.thumbnail,
      isVerified: false,
      likes: 0,
      region: 'India'
    };
    setPendingListing(formatted);
    setView(ViewState.VERIFY_ID);
  };

  const handleVerificationComplete = (verified: boolean) => {
    if (pendingListing) {
      const finalListing = { ...pendingListing, isVerified: verified };
      setListings([finalListing, ...listings]);
      setPendingListing(null);
      setView(ViewState.MARKETPLACE);
    }
  };

  const handleSelectAccount = (account: FFAccount) => {
    setSelectedAccount(account);
    setView(ViewState.ACCOUNT_DETAILS);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBuy = (account: FFAccount) => {
    setSelectedAccount(account);
    setShowPayment(true);
  };

  const handleSellerClick = (sellerId: string) => {
    setSelectedSellerId(sellerId);
    setProfileTab('listings');
    setView(ViewState.SELLER_PROFILE);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChatClick = (account: FFAccount) => {
    const seller = sellers.find(s => s.id === account.sellerId);
    if (!seller) return;

    setActiveChat({
      partnerId: seller.id,
      partnerName: seller.name,
      partnerAvatar: seller.avatar,
      contextAccount: account.title,
      messages: [{
        id: 'initial',
        senderId: 'seller',
        text: `Hey! Thanks for your interest in my ${account.rank} ID. Any questions?`,
        timestamp: Date.now()
      }]
    });
  };

  const handleChatFromProfile = (seller: SellerProfile) => {
    setActiveChat({
      partnerId: seller.id,
      partnerName: seller.name,
      partnerAvatar: seller.avatar,
      messages: [{
        id: 'initial',
        senderId: 'seller',
        text: `Hey! How can I help you today? I have several high-level accounts available.`,
        timestamp: Date.now()
      }]
    });
  };

  const handleSendMessage = (text: string) => {
    if (!activeChat) return;
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: 'user',
      text,
      timestamp: Date.now()
    };
    setActiveChat({
      ...activeChat,
      messages: [...activeChat.messages, newMessage]
    });
  };

  const handleSellerReply = (text: string) => {
    if (!activeChat) return;
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: 'seller',
      text,
      timestamp: Date.now(),
      isAiResponse: true
    };
    setActiveChat(prev => prev ? {
      ...prev,
      messages: [...prev.messages, newMessage]
    } : null);
  };

  const handleReviewSubmit = (reviewData: Omit<Review, 'id' | 'date'>) => {
    if (!selectedAccount) return;
    
    const newReview: Review = {
      ...reviewData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setSellers(prev => prev.map(s => {
      if (s.id === selectedAccount.sellerId) {
        const updatedReviews = [newReview, ...s.reviews];
        const newRating = Number((updatedReviews.reduce((acc, curr) => acc + curr.rating, 0) / updatedReviews.length).toFixed(1));
        return { ...s, reviews: updatedReviews, rating: newRating };
      }
      return s;
    }));
  };

  const handleLike = (accountId: string) => {
    setListings(prev => prev.map(acc => 
      acc.id === accountId ? { ...acc, likes: acc.likes + 1 } : acc
    ));
  };

  const verifySellerIdentity = () => {
    if (!selectedSellerId) return;
    setIsVerifyingSeller(true);
    setTimeout(() => {
      setSellers(prev => prev.map(s => s.id === selectedSellerId ? { ...s, isVerified: true } : s));
      setIsVerifyingSeller(false);
    }, 2000);
  };

  const processPayment = () => {
    setPaymentStep(2);
    setTimeout(() => {
      // Add transaction to user history
      if (currentUser && selectedAccount) {
        const newTx: Transaction = {
          id: 'tx_' + Date.now(),
          accountId: selectedAccount.id,
          title: selectedAccount.title,
          amount: selectedAccount.price,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          type: 'BUY',
          status: 'COMPLETED',
          thumbnail: selectedAccount.thumbnail
        };
        const updatedUser = {
          ...currentUser,
          balance: currentUser.balance - selectedAccount.price,
          transactions: [newTx, ...currentUser.transactions]
        };
        setCurrentUser(updatedUser);
        localStorage.setItem('fm_user', JSON.stringify(updatedUser));
      }
      setPaymentStep(3);
    }, 2000);
  };

  const resetFilters = () => {
    setRankFilter('All');
    setMaxPrice(50000);
    setSearchQuery('');
  };

  const ranks = ['All', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Heroic', 'Grandmaster'];

  if (view === ViewState.AUTH) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            onClick={() => setView(ViewState.HOME)}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-blue-900/40">
              <EagleLogo className="text-white" size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">FF<span className="text-blue-500"> SHELL</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-400">
            <button 
              onClick={() => setView(ViewState.MARKETPLACE)}
              className={`${view === ViewState.MARKETPLACE ? 'text-white' : 'hover:text-white'} transition-colors`}
            >
              Marketplace
            </button>
            <button className="hover:text-white transition-colors">Safety Guide</button>
            <button className="hover:text-white transition-colors">FAQ</button>
          </div>

          <div className="flex items-center gap-3">
            <div 
              onClick={() => setView(ViewState.MY_PROFILE)}
              className="flex items-center gap-3 mr-4 border-r border-slate-800 pr-4 cursor-pointer group"
            >
              <div className="text-right hidden sm:block">
                <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest group-hover:text-blue-500 transition-colors">Wallet: ₹{currentUser?.balance.toLocaleString()}</div>
                <div className="text-xs font-bold text-white truncate max-w-[100px]">{currentUser?.name}</div>
              </div>
              <img src={currentUser?.avatar} className="w-8 h-8 rounded-full border border-slate-700 group-hover:border-blue-500 transition-colors" alt="" />
            </div>

            <button 
              onClick={() => setView(ViewState.SELL)}
              className="hidden md:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors"
            >
              <PlusSquare size={18} /> Sell ID
            </button>
            <button 
              onClick={() => setView(ViewState.MARKETPLACE)}
              className="fire-gradient text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
            >
              Buy Now
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {view === ViewState.HOME && (
          <div className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-32">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest animate-pulse">
                    <ShieldCheck size={14} /> India's Safest FF Exchange
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
                    Trade Your <br />
                    <span className="fire-text-gradient">FF Accounts</span> <br />
                    with Confidence.
                  </h1>
                  <p className="text-lg text-slate-400 max-w-lg mx-auto lg:mx-0">
                    Buy and sell Free Fire IDs securely using UPI. Powered by AI valuation and instant verification. No more scams.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <button 
                      onClick={() => setView(ViewState.MARKETPLACE)}
                      className="w-full sm:w-auto px-10 py-4 fire-gradient rounded-2xl font-bold text-lg shadow-2xl shadow-blue-900/40 hover:scale-105 active:scale-95 transition-all"
                    >
                      Browse Marketplace
                    </button>
                    <button 
                      onClick={() => setView(ViewState.SELL)}
                      className="w-full sm:w-auto px-10 py-4 bg-slate-800 text-white rounded-2xl font-bold text-lg border border-slate-700 hover:bg-slate-700 transition-all"
                    >
                      Sell Your ID
                    </button>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative aspect-[4/3] bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
                    <img 
                      src="https://picsum.photos/seed/hero/800/600" 
                      alt="Free Fire Hero" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                              <ShieldCheck className="text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-sm">Verified Seller</div>
                              <div className="text-[10px] text-slate-300">Instant UPI Release</div>
                            </div>
                          </div>
                          <div className="text-blue-400 font-black">₹18,499</div>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full w-3/4 fire-gradient"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === ViewState.MARKETPLACE && (
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
              <div>
                <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
                  Live Marketplace 
                  <span className="bg-blue-500/10 text-blue-500 text-xs px-2 py-1 rounded-md font-bold uppercase tracking-widest">
                    {filteredListings.length} Active
                  </span>
                </h2>
                <p className="text-slate-400 flex items-center gap-2">
                  <MapPin size={16} className="text-blue-500" /> Indian Server Region
                </p>
              </div>
              
              <div className="w-full md:w-auto flex items-center gap-3">
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search skins, ranks, or players..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-lg"
                  />
                </div>
                <button 
                  onClick={() => setShowFilterDrawer(!showFilterDrawer)}
                  className={`p-3 rounded-2xl border transition-all ${showFilterDrawer ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}
                >
                  <SlidersHorizontal size={20} />
                </button>
              </div>
            </div>

            {showFilterDrawer && (
              <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-6 mb-10 space-y-8 animate-in slide-in-from-top duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Filter size={14} className="text-blue-500" /> Filter by Rank
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {ranks.map(rank => (
                        <button
                          key={rank}
                          onClick={() => setRankFilter(rank)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                            rankFilter === rank 
                              ? 'fire-gradient border-transparent text-white shadow-lg' 
                              : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                          }`}
                        >
                          {rank}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <IndianRupee size={14} className="text-blue-500" /> Max Budget
                      </label>
                      <span className="text-blue-500 font-black text-lg">₹{maxPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <input 
                      type="range" 
                      min="500" 
                      max="50000" 
                      step="500"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      <span>₹500</span>
                      <span>₹50,000+</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end pt-6 border-t border-slate-700/50 gap-4">
                  <button 
                    onClick={resetFilters}
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-blue-500 border border-slate-700 rounded-2xl text-xs font-bold transition-all uppercase tracking-widest group"
                  >
                    <RotateCcw size={16} className="group-active:rotate-[-180deg] transition-transform" />
                    Clear All Filters
                  </button>
                  <button 
                    onClick={() => setShowFilterDrawer(false)}
                    className="flex items-center justify-center gap-2 px-8 py-3 fire-gradient text-white rounded-2xl text-xs font-bold transition-all uppercase tracking-widest shadow-xl shadow-blue-900/20 active:scale-95"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}

            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">
                {filteredListings.map(acc => (
                  <ListingCard 
                    key={acc.id} 
                    account={acc} 
                    onSelect={handleSelectAccount} 
                    onSellerClick={handleSellerClick}
                    onChatClick={handleChatClick}
                    onLike={handleLike}
                    isSellerVerified={sellers.find(s => s.id === acc.sellerId)?.isVerified}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-slate-800/20 rounded-3xl border border-dashed border-slate-700">
                <Search size={48} className="mx-auto text-slate-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-300">No matching accounts found</h3>
                <p className="text-slate-500 mt-2">Try adjusting your filters or search query.</p>
                <button 
                  onClick={resetFilters}
                  className="mt-6 text-blue-500 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}

        {view === ViewState.ACCOUNT_DETAILS && selectedAccount && (
          <AccountDetailsView 
            account={selectedAccount}
            seller={activeSeller || undefined}
            onBack={() => setView(ViewState.MARKETPLACE)}
            onBuy={handleBuy}
            onChat={handleChatClick}
            onSellerClick={handleSellerClick}
          />
        )}

        {view === ViewState.MY_PROFILE && currentUser && (
          <UserProfileView 
            user={currentUser} 
            onLogout={() => setShowLogoutConfirm(true)} 
            onNavigate={setView}
          />
        )}

        {view === ViewState.HISTORY && currentUser && (
          <HistoryView 
            transactions={currentUser.transactions} 
            onBack={() => setView(ViewState.MY_PROFILE)}
          />
        )}

        {view === ViewState.SELL && (
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
            <button 
              onClick={() => setView(ViewState.HOME)}
              className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft size={18} /> Back to Home
            </button>
            <SellForm onSuccess={handleSellSuccess} />
          </div>
        )}

        {view === ViewState.VERIFY_ID && (
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
            <button 
              onClick={() => setView(ViewState.SELL)}
              className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft size={18} /> Back to Details
            </button>
            <VerificationModule 
              onVerified={() => handleVerificationComplete(true)}
              onSkip={() => handleVerificationComplete(false)}
            />
          </div>
        )}

        {view === ViewState.SELLER_PROFILE && activeSeller && (
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
            <button 
              onClick={() => setView(ViewState.MARKETPLACE)}
              className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft size={18} /> Back to Marketplace
            </button>

            <div className="bg-slate-800/40 border border-slate-700 rounded-3xl p-8 mb-12 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full"></div>
               <div className="relative flex flex-col md:flex-row gap-8 items-center md:items-start">
                  <div className="relative">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-slate-700 overflow-hidden bg-slate-900">
                       <img src={activeSeller.avatar} alt={activeSeller.name} className="w-full h-full object-cover" />
                    </div>
                    {activeSeller.isVerified && (
                      <div className="absolute bottom-2 right-2 bg-purple-600 p-2 rounded-full border-4 border-slate-800 shadow-xl" title="Identity Verified Seller">
                        <BadgeCheck size={20} className="text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-center md:text-left space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start">
                      <h2 className="text-4xl font-black flex items-center gap-2">
                        {activeSeller.name}
                        {activeSeller.isVerified && (
                          <BadgeCheck className="text-purple-400" size={32} />
                        )}
                      </h2>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {activeSeller.isVerified && (
                          <span className="inline-flex items-center gap-1.5 bg-purple-600/10 text-purple-400 px-3 py-1 rounded-full text-xs font-bold border border-purple-500/20 shadow-sm">
                            <Fingerprint size={14} /> Identity Verified
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 bg-blue-600/10 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/20">
                          <ShieldCheck size={14} /> Active Trader
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-400 max-w-2xl leading-relaxed italic">
                      "{activeSeller.bio}"
                    </p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm">
                      <div className="flex items-center gap-2 text-slate-300">
                        <MapPin size={16} className="text-blue-500" />
                        {activeSeller.location}
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Calendar size={16} className="text-blue-500" />
                        Joined {activeSeller.joinedDate}
                      </div>
                    </div>
                    <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
                      <button 
                        onClick={() => handleChatFromProfile(activeSeller)}
                        className="fire-gradient text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-blue-900/20 active:scale-95 transition-all"
                      >
                        <MessageCircle size={20} /> Chat with {activeSeller.name}
                      </button>
                      {!activeSeller.isVerified && (
                        <button 
                          onClick={verifySellerIdentity}
                          disabled={isVerifyingSeller}
                          className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 border border-slate-700 active:scale-95 transition-all disabled:opacity-50"
                        >
                          {isVerifyingSeller ? <RotateCcw size={18} className="animate-spin" /> : <Fingerprint size={20} className="text-purple-400" />}
                          {isVerifyingSeller ? 'Verifying Identity...' : 'Apply for Seller Badge'}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-1 gap-4 w-full md:w-48">
                    <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/50 text-center">
                       <div className="flex items-center justify-center gap-1 text-blue-400 font-bold text-xl mb-1">
                         <Star size={18} fill="currentColor" /> {activeSeller.rating}
                       </div>
                       <div className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Trust Score</div>
                    </div>
                    <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/50 text-center">
                       <div className="flex items-center justify-center gap-1 text-emerald-400 font-bold text-xl mb-1">
                         <Package size={18} /> {activeSeller.totalSales}
                       </div>
                       <div className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Successful Deals</div>
                    </div>
                  </div>
               </div>
            </div>

            <div className="space-y-12">
              <div className="flex items-center gap-8 border-b border-slate-800">
                <button
                  onClick={() => setProfileTab('listings')}
                  className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all ${
                    profileTab === 'listings' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Active Listings ({sellerListings.length})
                </button>
                <button
                  onClick={() => setProfileTab('reviews')}
                  className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all ${
                    profileTab === 'reviews' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Buyer Reviews ({activeSeller.reviews.length})
                </button>
              </div>
              
              {profileTab === 'listings' ? (
                <div className="animate-in fade-in duration-300">
                  {sellerListings.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {sellerListings.map(acc => (
                        <ListingCard 
                          key={acc.id} 
                          account={acc} 
                          onSelect={handleSelectAccount} 
                          onSellerClick={() => {}} 
                          onChatClick={handleChatClick}
                          onLike={handleLike}
                          isSellerVerified={activeSeller.isVerified}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-slate-800/20 rounded-3xl border border-dashed border-slate-700">
                      <Package size={48} className="mx-auto text-slate-600 mb-4" />
                      <p className="text-slate-500">This seller currently has no active listings.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="animate-in fade-in duration-300 max-w-3xl mx-auto">
                  <ReviewList reviews={activeSeller.reviews} />
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Chat Overlay */}
      {activeChat && (
        <ChatOverlay 
          session={activeChat} 
          onClose={() => setActiveChat(null)}
          onSendMessage={handleSendMessage}
          onSellerReply={handleSellerReply}
        />
      )}

      {/* Review Modal */}
      {showReviewModal && selectedAccount && (
        <ReviewModal
          sellerName={selectedAccount.sellerName}
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleReviewSubmit}
        />
      )}

      {/* Credentials Modal */}
      {showCredentialsModal && selectedAccount && (
        <AccountCredentialsModal
          account={selectedAccount}
          onClose={() => {
            setShowCredentialsModal(false);
            setView(ViewState.MARKETPLACE);
          }}
        />
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setShowLogoutConfirm(false)}></div>
          <div className="relative bg-slate-900 border border-slate-700 w-full max-w-sm rounded-[2rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
                <AlertTriangle size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Logout Confirmation</h3>
                <p className="text-slate-400 text-sm">Are you sure you want to sign out from FF SHELL?</p>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <button 
                  onClick={() => setShowLogoutConfirm(false)}
                  className="py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleLogout}
                  className="py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-500 transition-all shadow-lg shadow-red-900/20"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4 md:px-8 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <EagleLogo className="text-white" size={24} />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase">FF<span className="text-blue-500"> SHELL</span></span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              India's premier digital marketplace for gaming assets. We provide a safe haven for buyers and sellers to connect via our escrow-powered UPI payment system.
            </p>
            <div className="flex items-center gap-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" alt="UPI" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold uppercase text-xs tracking-widest text-slate-400">Marketplace</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li onClick={() => { setView(ViewState.MARKETPLACE); setRankFilter('Heroic'); }} className="hover:text-blue-500 cursor-pointer transition-colors">Heroic IDs</li>
              <li onClick={() => { setView(ViewState.MARKETPLACE); setRankFilter('Grandmaster'); }} className="hover:text-blue-500 cursor-pointer transition-colors">Grandmaster Accounts</li>
              <li onClick={() => setView(ViewState.MARKETPLACE)} className="hover:text-blue-500 cursor-pointer transition-colors">Evo Gun Sets</li>
              <li onClick={() => setView(ViewState.MARKETPLACE)} className="hover:text-blue-500 cursor-pointer transition-colors">Rare Bundles</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold uppercase text-xs tracking-widest text-slate-400">Legal & Trust</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="hover:text-blue-500 cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">Terms of Service</li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">Refund Policy</li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">Anti-Scam Guide</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-slate-600 text-xs">
          © 2024 FF SHELL India. This platform is not affiliated with Garena Free Fire. 
        </div>
      </footer>

      {showPayment && selectedAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setShowPayment(false)}></div>
          <div className="relative bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowPayment(false)}
              className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-full transition-colors"
            >
              <X size={20} className="text-slate-400" />
            </button>

            {paymentStep === 1 && (
              <div className="p-8 space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-black">Secure UPI Checkout</h3>
                  <p className="text-slate-400 text-sm">Escrow payment protected by FF Shell</p>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-2xl flex items-center gap-4 border border-slate-700">
                  <img src={selectedAccount.thumbnail} className="w-20 h-12 object-cover rounded-lg" alt="" />
                  <div className="flex-1 overflow-hidden">
                    <div className="font-bold text-sm truncate">{selectedAccount.title}</div>
                    <div className="text-blue-500 text-sm font-bold">₹{selectedAccount.price.toLocaleString('en-IN')}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Your UPI ID</label>
                    <input 
                      type="text" 
                      placeholder="e.g. mobile@ybl or user@okaxis"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                    <ShieldCheck className="text-emerald-500" />
                    <span className="text-xs text-emerald-500/80 font-medium">Funds will be held in Escrow until you confirm account access.</span>
                  </div>

                  <button 
                    onClick={processPayment}
                    className="w-full py-4 fire-gradient rounded-2xl font-bold shadow-xl shadow-blue-900/30 flex items-center justify-center gap-2 transition-transform active:scale-95"
                  >
                    Proceed to Pay ₹{selectedAccount.price.toLocaleString('en-IN')}
                  </button>
                </div>

                <div className="flex justify-center gap-4 pt-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" className="h-4 opacity-50" />
                  <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" className="h-4 opacity-50" />
                </div>
              </div>
            )}

            {paymentStep === 2 && (
              <div className="p-12 flex flex-col items-center justify-center text-center space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CreditCard className="text-blue-500" size={32} />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Waiting for UPI Confirmation</h3>
                  <p className="text-slate-400 text-sm">Please open your UPI app (GPay, PhonePe, etc.) and authorize the payment request.</p>
                </div>
                <div className="bg-slate-800 px-4 py-2 rounded-full text-xs text-slate-300 font-mono">
                  REF: TXN{Math.floor(Math.random() * 999999)}
                </div>
              </div>
            )}

            {paymentStep === 3 && (
              <div className="p-12 flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="text-emerald-500" size={48} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black">Payment Successful!</h3>
                  <p className="text-slate-400 text-sm">The credentials have been sent to your registered email and FF Shell Inbox.</p>
                </div>
                <div className="w-full space-y-3">
                  <button 
                    onClick={() => { setShowPayment(false); setPaymentStep(1); setShowCredentialsModal(true); }}
                    className="w-full py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                  >
                    <Key size={18} className="text-blue-500" /> View Account Details
                  </button>
                  <button 
                    onClick={() => { setShowPayment(false); setPaymentStep(1); setShowReviewModal(true); }}
                    className="w-full py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Star size={18} fill="currentColor" className="text-blue-500" /> Leave a Review
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 flex gap-3 z-40">
        <button 
          onClick={() => setView(ViewState.MARKETPLACE)}
          className={`flex-1 py-4 rounded-2xl font-bold shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-all border ${view === ViewState.MARKETPLACE ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
        >
          <ShoppingBag size={20} /> Market
        </button>
        <button 
          onClick={() => setView(ViewState.SELL)}
          className={`flex-1 py-4 rounded-2xl font-bold shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-all ${view === ViewState.SELL ? 'fire-gradient text-white' : 'bg-slate-800 text-slate-300'}`}
        >
          <PlusSquare size={20} /> Sell ID
        </button>
        <button 
          onClick={() => setView(ViewState.MY_PROFILE)}
          className={`w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center active:scale-90 transition-all border ${view === ViewState.MY_PROFILE ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
        >
          <UserIcon size={20} />
        </button>
      </div>
    </div>
  );
}
