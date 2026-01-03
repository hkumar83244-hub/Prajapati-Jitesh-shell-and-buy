
import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Copy, CheckCircle2, Loader2, Info, ArrowRight, Camera, AlertCircle, XCircle, RotateCcw } from 'lucide-react';
import { verifyProfileScreenshot } from '../services/geminiService.ts';

interface VerificationModuleProps {
  onVerified: () => void;
  onSkip: () => void;
}

const VerificationModule: React.FC<VerificationModuleProps> = ({ onVerified, onSkip }) => {
  const [step, setStep] = useState(1);
  const [code, setCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  // Fixed: Added const keyword to fileInputRef to correctly declare the hook reference
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Generate a random 6-digit verification code with FFS prefix
    const newCode = 'FFS-' + Math.floor(100000 + Math.random() * 900000).toString();
    setCode(newCode);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshot(reader.result as string);
        setVerificationError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startVerification = async () => {
    if (!screenshot) {
      setVerificationError("Please upload a screenshot first.");
      return;
    }

    setVerifying(true);
    setVerificationError(null);

    try {
      // Remove data:image/jpeg;base64, prefix for the API
      const base64Data = screenshot.split(',')[1];
      const result = await verifyProfileScreenshot(base64Data, code);
      
      if (result.verified && result.confidence > 0.6) {
        setStep(4); // Move to success step
      } else {
        setVerificationError(result.reason || "Code not detected. Ensure the screenshot clearly shows your bio with the correct code.");
      }
    } catch (err) {
      setVerificationError("An error occurred during verification. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-slate-800/40 border border-slate-700 rounded-3xl p-8 backdrop-blur-md overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[60px] rounded-full -mr-10 -mt-10"></div>
        
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-10">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step >= s ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-500'
              }`}>
                {step > s ? <CheckCircle2 size={16} /> : s}
              </div>
              {s < 4 && (
                <div className={`h-1 flex-1 mx-2 rounded-full ${
                  step > s ? 'bg-blue-600' : 'bg-slate-700'
                }`} />
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Ownership Verification</h2>
              <p className="text-slate-400">Increase your trust score and sell up to 3x faster.</p>
            </div>

            <div className="bg-blue-600/10 border border-blue-500/20 p-4 rounded-2xl flex gap-3 text-sm text-blue-400">
              <Info size={20} className="shrink-0" />
              <p>We use AI to verify that you actually own this Free Fire account. You'll need to update your in-game signature temporarily.</p>
            </div>

            <div className="space-y-4">
              <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-700 border-dashed text-center space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Your Unique Code</span>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-3xl font-black text-white tracking-widest">{code}</span>
                  <button 
                    onClick={handleCopy}
                    className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-400"
                  >
                    {copied ? <CheckCircle2 className="text-emerald-500" /> : <Copy size={20} />}
                  </button>
                </div>
              </div>
              
              <button 
                onClick={() => setStep(2)}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                I've copied the code <ArrowRight size={18} />
              </button>
              
              <button 
                onClick={onSkip}
                className="w-full text-slate-500 text-sm hover:text-slate-300 transition-colors"
              >
                Skip verification for now (Not recommended)
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Step 1: Update Your Bio</h2>
              <p className="text-slate-400">Follow these steps in the Free Fire app</p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 items-start bg-slate-900/50 p-4 rounded-xl">
                <div className="bg-slate-700 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-1">1</div>
                <p className="text-slate-300 text-sm">Open your FF Profile and tap on the <strong>Edit icon</strong>.</p>
              </div>
              <div className="flex gap-4 items-start bg-slate-900/50 p-4 rounded-xl">
                <div className="bg-slate-700 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-1">2</div>
                <p className="text-slate-300 text-sm">Locate the <strong>Signature</strong> section at the bottom.</p>
              </div>
              <div className="flex gap-4 items-start bg-slate-900/50 p-4 rounded-xl border border-blue-500/30">
                <div className="bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-1">3</div>
                <p className="text-slate-300 text-sm">Paste your code <span className="text-blue-400 font-mono font-bold">{code}</span> and save.</p>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button 
                onClick={() => setStep(3)}
                className="w-full fire-gradient text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-orange-900/20"
              >
                Done! Move to Next Step <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => setStep(1)}
                className="w-full text-slate-500 text-sm"
              >
                Go back
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Step 2: Upload Proof</h2>
              <p className="text-slate-400">Upload a screenshot of your profile showing the code</p>
            </div>

            <div className="space-y-4">
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              
              {!screenshot ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="group cursor-pointer border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-3xl p-12 text-center transition-all bg-slate-900/50"
                >
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Camera className="text-slate-500 group-hover:text-blue-500" size={32} />
                  </div>
                  <h4 className="font-bold text-slate-300 mb-2">Upload Profile Screenshot</h4>
                  <p className="text-xs text-slate-500">Must be a clear image of your in-game profile card</p>
                </div>
              ) : (
                <div className="relative group rounded-3xl overflow-hidden border border-slate-700 bg-slate-900/50 p-2">
                  <img 
                    src={screenshot} 
                    className="w-full aspect-video object-cover rounded-2xl" 
                    alt="Profile proof" 
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="p-3 bg-white text-slate-900 rounded-xl font-bold flex items-center gap-2 text-sm"
                    >
                      <RotateCcw size={16} /> Change
                    </button>
                    <button 
                      onClick={() => setScreenshot(null)}
                      className="p-3 bg-red-600 text-white rounded-xl font-bold flex items-center gap-2 text-sm"
                    >
                      <XCircle size={16} /> Remove
                    </button>
                  </div>
                </div>
              )}

              {verificationError && (
                <div className="flex gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs items-start">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <p>{verificationError}</p>
                </div>
              )}

              <div className="pt-4 space-y-3">
                <button 
                  onClick={startVerification}
                  disabled={verifying || !screenshot}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-xl shadow-blue-900/20"
                >
                  {verifying ? <Loader2 size={18} className="animate-spin" /> : <ShieldCheck size={18} />}
                  {verifying ? 'Verifying with AI...' : 'Verify My Account Now'}
                </button>
                <button 
                  onClick={() => setStep(2)}
                  className="w-full text-slate-500 text-sm"
                >
                  Go back
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 text-center py-4">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="text-emerald-500" size={40} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Verification Successful!</h2>
              <p className="text-slate-400">AI has confirmed your ownership. Your listing will now feature the "Verified Account" badge.</p>
            </div>
            <button 
              onClick={onVerified}
              className="w-full py-4 fire-gradient text-white rounded-2xl font-bold shadow-xl shadow-orange-900/20"
            >
              Finish Listing
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Ensure default export is present to fix import error in App.tsx
export default VerificationModule;
