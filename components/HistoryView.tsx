
import React from 'react';
import { Transaction } from '../types.ts';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Tag, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  XCircle,
  IndianRupee 
} from 'lucide-react';

interface HistoryViewProps {
  transactions: Transaction[];
  onBack: () => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ transactions, onBack }) => {
  const getStatusIcon = (status: Transaction['status']) => {
    switch(status) {
      case 'COMPLETED': return <CheckCircle2 size={16} className="text-emerald-500" />;
      case 'ESCROW': return <Clock size={16} className="text-amber-500" />;
      case 'CANCELLED': return <XCircle size={16} className="text-red-500" />;
    }
  };

  const getStatusLabel = (status: Transaction['status']) => {
    switch(status) {
      case 'COMPLETED': return 'Completed';
      case 'ESCROW': return 'In Escrow';
      case 'CANCELLED': return 'Cancelled';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 group transition-colors"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
        Back to Profile
      </button>

      <div className="space-y-6">
        <h2 className="text-3xl font-black">Transaction History</h2>
        
        {transactions.length > 0 ? (
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div 
                key={tx.id}
                className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex flex-col sm:flex-row items-center gap-6 group hover:border-slate-700 transition-all"
              >
                <div className="w-full sm:w-32 aspect-video rounded-2xl overflow-hidden shrink-0">
                  <img src={tx.thumbnail} alt={tx.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 space-y-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    {tx.type === 'BUY' ? (
                      <span className="bg-blue-600/10 text-blue-500 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-blue-500/20 flex items-center gap-1">
                        <ShoppingBag size={10} /> Buy Order
                      </span>
                    ) : (
                      <span className="bg-orange-600/10 text-orange-500 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-orange-500/20 flex items-center gap-1">
                        <Tag size={10} /> Account Sale
                      </span>
                    )}
                    <span className="text-[10px] font-bold text-slate-500 tracking-widest">{tx.date}</span>
                  </div>
                  <h4 className="font-bold text-lg">{tx.title}</h4>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold uppercase tracking-wider">
                    {getStatusIcon(tx.status)}
                    <span className={
                      tx.status === 'COMPLETED' ? 'text-emerald-500' :
                      tx.status === 'ESCROW' ? 'text-amber-500' : 'text-red-500'
                    }>{getStatusLabel(tx.status)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Amount</div>
                    <div className="text-xl font-black flex items-center gap-1">
                      <IndianRupee size={16} className="text-slate-500" />
                      {tx.amount.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-2xl transition-all">
                    <ChevronRight size={20} className="text-slate-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-slate-900/50 border border-slate-800 border-dashed rounded-[3rem]">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <History size={32} className="text-slate-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-300">No transactions found</h3>
            <p className="text-slate-500 mt-2">Start trading to see your history here!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryView;
