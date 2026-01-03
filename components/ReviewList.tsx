
import React from 'react';
import { Star, User } from 'lucide-react';
import { Review } from '../types.ts';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-800/20 rounded-3xl border border-dashed border-slate-700">
        <p className="text-slate-500">No reviews yet for this seller.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-400">
                <User size={20} />
              </div>
              <div>
                <div className="font-bold text-sm text-slate-200">{review.buyerName}</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest">{review.date}</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < review.rating ? 'text-orange-500 fill-orange-500' : 'text-slate-700'}
                />
              ))}
            </div>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed italic">
            "{review.comment}"
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
