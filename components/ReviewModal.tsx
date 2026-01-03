
import React, { useState } from 'react';
import { Star, X, CheckCircle2 } from 'lucide-react';
import { Review } from '../types.ts';

interface ReviewModalProps {
  sellerName: string;
  onSubmit: (review: Omit<Review, 'id' | 'date'>) => void;
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ sellerName, onSubmit, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    
    onSubmit({
      buyerName: 'Current User', // Placeholder for logged in user
      rating,
      comment
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose}></div>
        <div className="relative bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl p-12 text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="text-emerald-500" size={40} />
          </div>
          <h3 className="text-2xl font-black">Review Submitted!</h3>
          <p className="text-slate-400 text-sm">Thank you for helping the community by sharing your experience.</p>
          <button onClick={onClose} className="w-full py-4 fire-gradient rounded-2xl font-bold">Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-full transition-colors">
          <X size={20} className="text-slate-400" />
        </button>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black">Rate Your Experience</h3>
            <p className="text-slate-400 text-sm">How was your transaction with <span className="text-orange-500 font-bold">{sellerName}</span>?</p>
          </div>

          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="transition-transform active:scale-90"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                <Star
                  size={40}
                  className={`${
                    (hover || rating) >= star ? 'text-orange-500 fill-orange-500' : 'text-slate-700'
                  } transition-colors`}
                />
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Your Feedback</label>
            <textarea
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell others about the account quality, speed of delivery, etc..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 min-h-[120px] focus:ring-2 focus:ring-orange-500 outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={rating === 0}
            className="w-full py-4 fire-gradient rounded-2xl font-bold shadow-xl shadow-orange-900/30 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
