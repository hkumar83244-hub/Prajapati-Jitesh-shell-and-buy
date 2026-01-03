
export interface Review {
  id: string;
  buyerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  title: string;
  amount: number;
  date: string;
  type: 'BUY' | 'SELL';
  status: 'COMPLETED' | 'ESCROW' | 'CANCELLED';
  thumbnail: string;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar: string;
  balance: number;
  joinedDate: string;
  transactions: Transaction[];
}

export interface FFAccount {
  id: string;
  sellerId: string;
  title: string;
  rank: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond' | 'Heroic' | 'Grandmaster';
  level: number;
  rareItems: string[];
  price: number;
  sellerName: string;
  description: string;
  thumbnail: string;
  isVerified: boolean;
  verificationCode?: string;
  likes: number;
  region: string;
}

export interface SellerProfile {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  totalSales: number;
  joinedDate: string;
  isVerified: boolean;
  bio: string;
  location: string;
  reviews: Review[];
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  isAiResponse?: boolean;
}

export interface ChatSession {
  partnerId: string;
  partnerName: string;
  partnerAvatar: string;
  messages: Message[];
  contextAccount?: string;
}

export interface ValuationResult {
  estimatedPrice: number;
  suggestedTitle: string;
  generatedDescription: string;
  highlights: string[];
}

export enum ViewState {
  AUTH = 'AUTH',
  HOME = 'HOME',
  MARKETPLACE = 'MARKETPLACE',
  SELL = 'SELL',
  ACCOUNT_DETAILS = 'ACCOUNT_DETAILS',
  SELLER_PROFILE = 'SELLER_PROFILE',
  VERIFY_ID = 'VERIFY_ID',
  MY_PROFILE = 'MY_PROFILE',
  HISTORY = 'HISTORY'
}
