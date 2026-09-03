import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Cake } from 'lucide-react';

interface ScreenLetterProps {
  paragraphs: string[];
  onContinue: () => void;
}

export const ScreenLetter: React.FC<ScreenLetterProps> = ({
  paragraphs,
  onContinue
}) => {
  const [revealedCount, setRevealedCount] = useState<number>(paragraphs.length);

  return (
    <div className="flex flex-col min-h-[92svh] px-4 py-8 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9F4]/10 text-[#E8CA94] text-xs font-medium mb-3 border border-[#C7A56A]/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>A Letter From My Heart</span>
        </div>

        <h2 className="text-3xl font-serif font-bold text-[#FFF9F4] tracking-tight">
          For Maria ❤️
        </h2>
      </div>

      {/* Luxury Stationery Paper Aesthetic */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative p-7 sm:p-8 rounded-3xl bg-[#FFF9F4] text-[#3D1E24] shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-[#E8D7C7] mb-8"
      >
        {/* Subtle decorative stationery watermark */}
        <div className="absolute top-4 right-4 text-[#E8D7C7]/50 pointer-events-none">
          <Heart className="w-12 h-12" />
        </div>

        {/* Date header */}
        <div className="flex justify-between items-center pb-4 border-b border-[#E8D7C7]/60 mb-5">
          <span className="text-xs font-serif italic text-[#8F3E4D]">
            September 4, 2026
          </span>
          <span className="text-[11px] uppercase tracking-widest text-[#C7A56A] font-medium">
            To My Wife
          </span>
        </div>

        {/* Letter Paragraphs */}
        <div className="space-y-4 font-serif text-base sm:text-lg leading-relaxed text-[#4A2029]">
          {paragraphs.slice(0, revealedCount).map((p, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === paragraphs.length - 1;
            return (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`${
                  isFirst
                    ? 'text-xl sm:text-2xl font-bold text-[#3D1E24]'
                    : isLast
                    ? 'font-semibold text-[#5A2630] pt-2'
                    : 'text-[#4A2029]'
                }`}
              >
                {p}
              </motion.p>
            );
          })}
        </div>

        {/* Tender husband signature */}
        <div className="mt-8 pt-6 border-t border-[#E8D7C7]/60 text-right">
          <p className="text-xs font-light text-[#73404B] mb-1">
            Always and completely yours,
          </p>
          <p className="font-handwriting text-3xl sm:text-4xl text-[#5A2630]">
            Your Husband ❤️
          </p>
        </div>
      </motion.div>

      {/* Primary Action Button */}
      <div className="sticky bottom-4 pt-2 pb-safe">
        <button
          id="letter-continue-button"
          type="button"
          onClick={onContinue}
          className="w-full py-4 px-6 rounded-2xl bg-[#5A2630] hover:bg-[#481B24] active:bg-[#38121A] text-[#FFF9F4] font-medium tracking-wide shadow-xl shadow-black/40 transition-all flex items-center justify-center gap-2 min-h-[48px] touch-manipulation cursor-pointer border border-[#C98F91]/30"
        >
          <span>Celebrate Your Birthday 🎂</span>
          <Cake className="w-4 h-4 text-[#E8CA94]" />
        </button>
      </div>
    </div>
  );
};
