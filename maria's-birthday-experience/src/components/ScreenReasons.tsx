import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, ArrowRight, Check } from 'lucide-react';
import { ReasonItem } from '../types.ts';

interface ScreenReasonsProps {
  reasons: ReasonItem[];
  onContinue: () => void;
}

export const ScreenReasons: React.FC<ScreenReasonsProps> = ({
  reasons,
  onContinue
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const total = reasons.length;
  const currentReason = reasons[currentIndex] || reasons[0];
  const isLast = currentIndex === total - 1;

  const handleNext = () => {
    if (!isLast) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onContinue();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <div className="flex flex-col justify-between min-h-[92svh] px-4 py-8 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9F4]/10 text-[#E8CA94] text-xs font-medium mb-3 border border-[#C7A56A]/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Little Things I Love About You</span>
        </div>

        <h2 className="text-3xl font-serif font-bold text-[#FFF9F4] tracking-tight">
          Why You Mean The World
        </h2>
      </div>

      {/* Main Single Reason Card */}
      <div className="my-auto py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentReason.id}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -16 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full"
          >
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#FFF9F4] to-[#FDF4EE] text-[#3D1E24] shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-[#E8D7C7] relative overflow-hidden text-center">
              {/* Step counter badge */}
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#F6E6E5] text-[#5A2630] font-serif text-2xl font-bold mb-4 shadow-inner border border-[#C98F91]/40">
                {formatNumber(currentIndex + 1)}
              </div>

              <div className="w-12 h-0.5 bg-[#C7A56A]/50 mx-auto mb-4" />

              {/* Reason Title */}
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#3D1E24] mb-3 leading-snug">
                {currentReason.title}
              </h3>

              {/* Reason Description */}
              <p className="text-base text-[#73404B] font-light leading-relaxed max-w-xs mx-auto">
                {currentReason.description}
              </p>

              {/* Progress bar */}
              <div className="w-full bg-[#E8D7C7]/50 h-1.5 rounded-full overflow-hidden mt-8">
                <div
                  className="bg-[#C7A56A] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
                />
              </div>

              <span className="text-[11px] text-[#73404B]/70 tracking-widest uppercase mt-3 block font-mono">
                {formatNumber(currentIndex + 1)} of {formatNumber(total)}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action Controls */}
      <div className="pt-2 pb-safe space-y-3">
        <div className="flex gap-3">
          {currentIndex > 0 && (
            <button
              type="button"
              onClick={handlePrev}
              className="py-4 px-5 rounded-2xl bg-[#FFF9F4]/10 hover:bg-[#FFF9F4]/20 text-[#FFF9F4] text-sm font-medium border border-[#FFF9F4]/20 transition-all cursor-pointer min-h-[48px]"
            >
              Previous
            </button>
          )}

          <button
            id="reasons-next-button"
            type="button"
            onClick={handleNext}
            className="flex-1 py-4 px-6 rounded-2xl bg-[#5A2630] hover:bg-[#481B24] active:bg-[#38121A] text-[#FFF9F4] font-medium tracking-wide shadow-xl shadow-black/40 transition-all flex items-center justify-center gap-2 min-h-[48px] touch-manipulation cursor-pointer border border-[#C98F91]/30"
          >
            {isLast ? (
              <>
                <span>Take The Quiz ❤️</span>
                <Check className="w-4 h-4 text-[#E8CA94]" />
              </>
            ) : (
              <>
                <span>Next ❤️</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
