
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, User, ShieldCheck, Loader2, MessageSquare } from 'lucide-react';
import { Message, ChatSession } from '../types.ts';
import { getSellerResponse } from '../services/geminiService.ts';

interface ChatOverlayProps {
  session: ChatSession;
  onClose: () => void;
  onSendMessage: (text: string) => void;
  onSellerReply: (text: string) => void;
}

const ChatOverlay: React.FC<ChatOverlayProps> = ({ session, onClose, onSendMessage, onSellerReply }) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [session.messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText;
    setInputText('');
    onSendMessage(userText);

    // Simulate seller typing
    setIsTyping(true);
    
    // Prepare history for Gemini
    const history = session.messages.map(m => ({
      role: m.senderId === 'user' ? 'user' as const : 'model' as const,
      text: m.text
    }));
    history.push({ role: 'user', text: userText });

    const reply = await getSellerResponse(session.partnerName, session.contextAccount || "the account", history);
    
    setIsTyping(false);
    onSellerReply(reply);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-[360px] flex flex-col h-[500px] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="fire-gradient p-4 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={session.partnerAvatar} className="w-10 h-10 rounded-full border-2 border-white/20" alt="" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
          </div>
          <div>
            <div className="font-bold text-sm flex items-center gap-1">
              {session.partnerName}
              <ShieldCheck size={14} className="opacity-80" />
            </div>
            <div className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Online Now</div>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
        {session.contextAccount && (
          <div className="bg-slate-800/50 border border-slate-700 p-3 rounded-2xl flex items-center gap-3 mb-6">
            <MessageSquare size={16} className="text-orange-500" />
            <div className="text-[10px] text-slate-400 font-medium">
              You're asking about: <span className="text-slate-200">{session.contextAccount}</span>
            </div>
          </div>
        )}

        {session.messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
              msg.senderId === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-900/20' 
                : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
            }`}>
              {msg.text}
              <div className={`text-[9px] mt-1 opacity-50 ${msg.senderId === 'user' ? 'text-right' : 'text-left'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-800 border border-slate-700 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
              <Loader2 size={14} className="animate-spin text-orange-500" />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider italic">Seller is typing...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
        />
        <button 
          type="submit" 
          disabled={!inputText.trim()}
          className="p-2 fire-gradient text-white rounded-xl shadow-lg disabled:opacity-50 transition-all active:scale-90"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatOverlay;
