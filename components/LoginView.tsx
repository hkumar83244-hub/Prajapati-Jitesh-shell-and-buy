
import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import { User } from '../types.ts';
import EagleLogo from './EagleLogo.tsx';

interface LoginViewProps {
  onLogin: (user: User) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [method, setMethod] = useState<'selection' | 'gmail' | 'mobile' | 'otp'>('selection');
  const [loading, setLoading] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleGmailLogin = () => {
    setLoading(true);
    // Simulate Google Auth
    setTimeout(() => {
      onLogin({
        id: 'u_' + Math.random().toString(36).substr(2, 9),
        name: 'Gamer Pro',
        email: 'gamer.pro@gmail.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GamerPro',
        balance: 0,
        joinedDate: 'Nov 2024',
        transactions: []
      });
      setLoading(false);
    }, 1500);
  };

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setLoading(true);
    setError('');
    
    // Simulate OTP Request
    setTimeout(() => {
      setMethod('otp');
      setLoading(false);
      setTimer(30);
    }, 1200);
  };

  const handleResendOtp = () => {
    if (timer > 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTimer(30);
      setOtp('');
    }, 1000);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 4) return;
    
    setLoading(true);
    setTimeout(() => {
      onLogin({
        id: 'u_' + Math.random().toString(36).substr(2, 9),
        name: 'Player_' + mobileNumber.slice(-4),
        phone: '+91 ' + mobileNumber,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${mobileNumber}`,
        balance: 0,
        joinedDate: 'Nov 2024',
        transactions: []
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="bg-blue-600 p-6 rounded-[2rem] shadow-xl shadow-blue-900/40">
            <EagleLogo className="text-white" size={64} />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tight uppercase">FF<span className="text-blue-500"> SHELL</span></h1>
            <p className="text-slate-400 text-sm">India's Premium Free Fire Marketplace</p>
          </div>

          {method === 'selection' && (
            <div className="w-full space-y-4 pt-6">
              <button 
                onClick={handleGmailLogin}
                disabled={loading}
                className="w-full py-4 bg-white text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-100 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : (
                  <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" className="h-4" alt="Google" />
                )}
                Continue with Gmail
              </button>
              
              <div className="flex items-center gap-4 text-slate-600 py-2">
                <div className="h-px flex-1 bg-slate-800"></div>
                <span className="text-[10px] font-black uppercase tracking-widest">OR</span>
                <div className="h-px flex-1 bg-slate-800"></div>
              </div>

              <button 
                onClick={() => setMethod('mobile')}
                className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold flex items-center justify-center gap-3 border border-slate-700 transition-all active:scale-95"
              >
                <Phone size={20} className="text-blue-500" />
                Login with Mobile
              </button>
            </div>
          )}

          {method === 'mobile' && (
            <form onSubmit={handleMobileSubmit} className="w-full space-y-6 pt-4 animate-in slide-in-from-bottom-4 duration-300">
              <div className="text-left space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Mobile Number</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">+91</span>
                  <input 
                    type="tel"
                    autoFocus
                    maxLength={10}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 10 digit number"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-14 pr-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono tracking-widest"
                  />
                </div>
                {error && <p className="text-red-500 text-[10px] font-bold ml-1 uppercase">{error}</p>}
              </div>
              
              <button 
                type="submit"
                disabled={loading || mobileNumber.length !== 10}
                className="w-full py-4 fire-gradient text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-blue-900/20 active:scale-95 disabled:opacity-50 disabled:grayscale transition-all"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Request OTP'}
                <ArrowRight size={18} />
              </button>
              
              <button 
                type="button"
                onClick={() => setMethod('selection')}
                className="text-slate-500 text-sm hover:text-white transition-colors"
              >
                Go Back
              </button>
            </form>
          )}

          {method === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="w-full space-y-6 pt-4 animate-in slide-in-from-bottom-4 duration-300">
              <div className="text-left space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Enter 4-Digit OTP</label>
                <input 
                  type="text"
                  autoFocus
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-4 text-center text-2xl font-black text-blue-500 tracking-[1.5rem] focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
                <div className="flex items-center justify-between px-1">
                  <p className="text-slate-500 text-[10px]">Sent to +91 {mobileNumber}</p>
                  <button 
                    type="button"
                    onClick={handleResendOtp}
                    disabled={timer > 0 || loading}
                    className={`text-[10px] font-bold uppercase transition-colors ${timer > 0 ? 'text-slate-700' : 'text-blue-500 hover:text-blue-400'}`}
                  >
                    {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
                  </button>
                </div>
              </div>
              
              <button 
                type="submit"
                disabled={loading || otp.length !== 4}
                className="w-full py-4 fire-gradient text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-blue-900/20 active:scale-95 disabled:opacity-50 disabled:grayscale transition-all"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Verify & Login'}
              </button>
              
              <button 
                type="button"
                onClick={() => setMethod('mobile')}
                className="text-slate-500 text-sm hover:text-white transition-colors"
              >
                Change Number
              </button>
            </form>
          )}

          <div className="pt-8 flex flex-col items-center gap-4 border-t border-slate-800/50 w-full">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
              <ShieldCheck className="text-emerald-500" size={14} />
              Secured by FF Shell Guard
            </div>
            <div className="flex gap-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" className="h-3 grayscale opacity-30" alt="UPI" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-3 grayscale opacity-30" alt="Mastercard" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
