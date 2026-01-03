
import React, { useState } from 'react';
import { getAccountValuation } from '../services/geminiService.ts';
import { Sparkles, Loader2, IndianRupee, Tag, ShieldCheck } from 'lucide-react';
import { ValuationResult } from '../types.ts';

interface SellFormProps {
  onSuccess: (listing: any) => void;
}

const SellForm: React.FC<SellFormProps> = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    rank: 'Gold',
    level: 50,
    items: '',
    seller: ''
  });
  const [valuation, setValuation] = useState<ValuationResult | null>(null);

  const handleValuation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const itemsArray = formData.items.split(',').map(i => i.trim());
    const result = await getAccountValuation(formData.rank, formData.level, itemsArray);
    setValuation(result);
    setLoading(false);
  };

  const finalizeListing = () => {
    if (!valuation) return;
    onSuccess({
      ...formData,
      ...valuation,
      id: Math.random().toString(36).substr(2, 9),
      isVerified: false,
      thumbnail: 'https://picsum.photos/seed/' + Math.random() + '/800/450'
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="bg-slate-800/40 border border-slate-700 p-8 rounded-3xl backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-orange-600/20 rounded-2xl">
            <Tag className="text-orange-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">List Your Account</h2>
            <p className="text-slate-400 text-sm">Sell securely on India's #1 FF Exchange</p>
          </div>
        </div>

        <form onSubmit={handleValuation} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Account Rank</label>
            <select 
              value={formData.rank}
              onChange={(e) => setFormData({...formData, rank: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none"
            >
              <option>Bronze</option><option>Silver</option><option>Gold</option>
              <option>Platinum</option><option>Diamond</option><option>Heroic</option>
              <option>Grandmaster</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Player Level</label>
            <input 
              type="number" 
              value={formData.level}
              onChange={(e) => setFormData({...formData, level: parseInt(e.target.value)})}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="e.g. 72"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-medium text-slate-300">Rare Items / Skins (Comma separated)</label>
            <textarea 
              value={formData.items}
              onChange={(e) => setFormData({...formData, items: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none min-h-[100px]"
              placeholder="e.g. Bunny MP40, Cobra Bundle, Angelic Pants..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Your Seller Name</label>
            <input 
              type="text" 
              value={formData.seller}
              onChange={(e) => setFormData({...formData, seller: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="e.g. GamerX88"
            />
          </div>

          <div className="md:col-span-2">
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-white text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} className="text-orange-500" />}
              {loading ? 'AI is analyzing your account...' : 'Get AI Price Valuation'}
            </button>
          </div>
        </form>
      </div>

      {valuation && (
        <div className="bg-gradient-to-br from-orange-600/10 to-red-600/10 border border-orange-500/30 p-8 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-orange-500">
                <Sparkles size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">AI Result</span>
              </div>
              <h3 className="text-3xl font-extrabold">{valuation.suggestedTitle}</h3>
              <p className="text-slate-300 text-lg leading-relaxed">{valuation.generatedDescription}</p>
              
              <div className="flex flex-wrap gap-2">
                {valuation.highlights.map((h, i) => (
                  <span key={i} className="bg-orange-600/20 text-orange-400 px-3 py-1 rounded-full text-xs font-bold border border-orange-500/20">
                    {h}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full md:w-64 flex flex-col items-center justify-center p-6 bg-slate-900/80 rounded-2xl border border-slate-700 text-center">
              <span className="text-slate-400 text-sm mb-1 uppercase tracking-tighter">Recommended Price</span>
              <div className="flex items-center text-4xl font-black text-white mb-6">
                <IndianRupee className="text-emerald-500" size={32} />
                {valuation.estimatedPrice.toLocaleString('en-IN')}
              </div>
              <button 
                onClick={finalizeListing}
                className="w-full py-4 fire-gradient rounded-xl font-bold shadow-xl shadow-orange-900/20"
              >
                Post Listing Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellForm;
