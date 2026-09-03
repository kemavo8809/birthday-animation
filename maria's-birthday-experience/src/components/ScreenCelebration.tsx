import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Gift, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScreenCelebrationProps {
  onContinue: () => void;
  birthdayDate: string;
}

export const ScreenCelebration: React.FC<ScreenCelebrationProps> = ({
  onContinue,
  birthdayDate
}) => {
  useEffect(() => {
    // Elegant warm rose, gold, ivory confetti
    const triggerConfetti = () => {
      confetti({
        particleCount: 55,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#C7A56A', '#C98F91', '#F6E6E5', '#FFF9F4', '#5A2630'],
        disableForReducedMotion: true
      });
    };

    triggerConfetti();
    const timeout = setTimeout(triggerConfetti, 1400);
    return () => clearTimeout(timeout);
  }, []);

  // September calendar grid
  const daysInSeptember = Array.from({ length: 30 }, (_, i) => i + 1);
  const leadingBlanks = [null, null]; // Sun, Mon blank

  return (
    <div className="flex flex-col items-center justify-between min-h-[92svh] px-4 py-8 max-w-md mx-auto text-center">
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9F4]/10 text-[#E8CA94] text-xs font-medium mb-3 border border-[#C7A56A]/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Your Special Day ✨</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#FFF9F4] tracking-tight mb-2">
          Happy Birthday, My Love, My Wifey, Maria 🎂❤️
        </h1>

        <p className="text-base text-[#E8D7C7] font-serif italic">
          {birthdayDate}
        </p>
      </motion.div>

      {/* Keepsake Calendar Visual Element */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full my-6"
      >
        <div className="p-6 rounded-3xl bg-gradient-to-b from-[#FFF9F4] to-[#FAF0E6] text-[#3D1E24] shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-[#E8D7C7] relative">
          {/* Calendar top header (No 2026, cleanly 'September') */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E8D7C7]">
            <span className="text-xs tracking-widest uppercase font-bold text-[#C7A56A]">
              September
            </span>
            <div className="flex items-center gap-1 text-xs text-[#5A2630] font-serif font-semibold">
              <Heart className="w-3.5 h-3.5 fill-[#5A2630]" />
              <span>Your Special Day</span>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-[11px] font-semibold text-[#8F3E4D] uppercase mb-2">
            <span>S</span>
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
          </div>

          {/* Calendar Day Grid */}
          <div className="grid grid-cols-7 gap-1 text-xs">
            {leadingBlanks.map((_, i) => (
              <div key={`blank-${i}`} className="h-8" />
            ))}
            {daysInSeptember.map((day) => {
              const isBirthday = day === 4;
              return (
                <div
                  key={day}
                  className={`h-8 rounded-full flex items-center justify-center font-medium transition-all ${
                    isBirthday
                      ? 'bg-[#5A2630] text-[#FFF9F4] font-bold shadow-md shadow-[#5A2630]/40 scale-110 ring-2 ring-[#C7A56A]'
                      : 'text-[#5A2630]/70'
                  }`}
                >
                  {day}
                  {isBirthday && (
                    <span className="absolute -top-1 -right-1 text-[10px]">✨</span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-[#E8D7C7]/70 text-center">
            <p className="text-xs text-[#73404B] font-serif italic">
              "Every day with you is a gift, but September 4 is my favorite."
            </p>
          </div>
        </div>
      </motion.div>

      {/* Action to proceed to the Final Gift */}
      <div className="w-full pt-2 pb-safe">
        <button
          id="celebration-continue-button"
          type="button"
          onClick={onContinue}
          className="w-full py-4 px-6 rounded-2xl bg-[#5A2630] hover:bg-[#481B24] active:bg-[#38121A] text-[#FFF9F4] font-medium tracking-wide shadow-xl shadow-black/40 transition-all flex items-center justify-center gap-2 min-h-[48px] touch-manipulation cursor-pointer border border-[#C98F91]/30"
        >
          <span>Open Your Final Gift 🎁</span>
          <Gift className="w-4 h-4 text-[#E8CA94]" />
        </button>
      </div>
    </div>
  );
};
