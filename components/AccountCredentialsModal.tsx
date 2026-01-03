
import React, { useState } from 'react';
import { X, Copy, Eye, EyeOff, ShieldAlert, Key, Mail, CheckCircle2, Download } from 'lucide-react';
import { FFAccount } from '../types.ts';

interface AccountCredentialsModalProps {
  account: FFAccount;
  onClose: () => void;
}

const AccountCredentialsModal: React.FC<AccountCredentialsModalProps> = ({ account, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const mockCreds = {
    email: `${account.sellerName.toLowerCase().replace(/\s/g, '')}_vault@gmail.com`,
    password: 'FireMarketSecret99!',
    recoveryCode: 'FM-REC-9921-X01',
    loginMethod: 'Facebook / Garena'
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative bg-slate-900 border border-slate-700 w-full max-w-lg rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="fire-gradient p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
              <Key size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight">Account Access Vault</h3>
              <p className="text-white/80 text-xs">Credentials for {account.title}</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex gap-3 text-xs text-amber-500">
            <ShieldAlert size={20} className="shrink-0" />
            <p><strong>IMPORTANT:</strong> Please change these credentials immediately after your first login. FireMarket is not responsible for accounts after delivery.</p>
          </div>

          <div className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Login Email / ID</label>
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 p-1 rounded-xl">
                <div className="p-2 text-slate-500"><Mail size={18} /></div>
                <input 
                  type="text" 
                  readOnly 
                  value={mockCreds.email}
                  className="bg-transparent flex-1 text-sm font-mono text-slate-200 outline-none"
                />
                <button 
                  onClick={() => handleCopy(mockCreds.email, 'email')}
                  className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
                >
                  {copiedField === 'email' ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
                </button>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Password</label>
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 p-1 rounded-xl">
                <div className="p-2 text-slate-500"><Key size={18} /></div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  readOnly 
                  value={mockCreds.password}
                  className="bg-transparent flex-1 text-sm font-mono text-slate-200 outline-none"
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <button 
                  onClick={() => handleCopy(mockCreds.password, 'pass')}
                  className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
                >
                  {copiedField === 'pass' ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
                </button>
              </div>
            </div>

            {/* Recovery Code */}
            <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700 border-dashed flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Backup Recovery Code</div>
                <div className="font-mono text-xs text-orange-400">{mockCreds.recoveryCode}</div>
              </div>
              <button 
                onClick={() => handleCopy(mockCreds.recoveryCode, 'rec')}
                className="text-slate-400 hover:text-white"
              >
                {copiedField === 'rec' ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <button 
              className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all border border-slate-700"
              onClick={() => window.print()}
            >
              <Download size={18} /> Save as PDF
            </button>
            <button 
              onClick={onClose}
              className="w-full py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-100 transition-colors"
            >
              Finish & Go to Marketplace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCredentialsModal;
