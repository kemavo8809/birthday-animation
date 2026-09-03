import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Heart, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScreenFinalGiftProps {
  finalMessage: string[];
  onContinue: () => void;
}

export const ScreenFinalGift: React.FC<ScreenFinalGiftProps> = ({
  finalMessage,
  onContinue
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    if (isOpen) return;
    setIsOpen(true);

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#C7A56A', '#C98F91', '#F6E6E5', '#FFF9F4'],
      disableForReducedMotion: true
    });
  };

  return (
    <div className="flex flex-col justify-between min-h-[92svh] px-4 py-8 max-w-md mx-auto text-center">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9F4]/10 text-[#E8CA94] text-xs font-medium mb-3 border border-[#C7A56A]/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>One Last Surprise</span>
        </div>

        <h2 className="text-3xl font-serif font-bold text-[#FFF9F4] tracking-tight mb-1">
          {isOpen ? 'For My Maria' : 'A Gift For You'}
        </h2>
        <p className="text-xs sm:text-sm text-[#E8D7C7]/80 font-light">
          {isOpen ? 'With all my love, now and always' : 'Tap the box to open your final keepsake'}
        </p>
      </div>

      {/* Main Stage: Gift Box or Revealed Card */}
      <div className="my-auto py-6">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Interactive Gift Box */
            <motion.div
              key="closed-gift"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              onClick={handleOpenGift}
              className="cursor-pointer group select-none relative max-w-[280px] mx-auto"
            >
              {/* Soft warm glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#C7A56A]/30 via-[#C98F91]/40 to-[#C7A56A]/30 rounded-3xl blur-2xl group-hover:scale-110 transition-transform duration-500" />

              <div className="relative p-8 rounded-3xl bg-gradient-to-b from-[#FFF9F4] to-[#FAF0E6] border border-[#E8D7C7] shadow-[0_25px_60px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center">
                {/* Gift Ribbon Graphic */}
                <motion.div
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#5A2630] to-[#36141B] flex items-center justify-center text-[#E8CA94] shadow-xl border-2 border-[#C7A56A]/50 relative"
                >
                  {/* Vertical Ribbon */}
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 bg-[#C7A56A]/70" />
                  {/* Horizontal Ribbon */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-4 bg-[#C7A56A]/70" />
                  <Gift className="w-12 h-12 relative z-10 text-[#FFF9F4]" />
                </motion.div>

                <p className="mt-6 text-base font-serif font-semibold text-[#3D1E24]">
                  Tap To Unwrap
                </p>
                <span className="text-xs text-[#73404B] font-light mt-1">
                  Something straight from my heart
                </span>
              </div>
            </motion.div>
          ) : (
            /* Revealed Final Message Card */
            <motion.div
              key="opened-message"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-b from-[#FFF9F4] to-[#FAF0E6] text-[#3D1E24] shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-[#C7A56A]/60 relative text-center">
                <div className="w-12 h-12 rounded-full bg-[#F6E6E5] text-[#5A2630] flex items-center justify-center mx-auto mb-4 border border-[#C98F91]/40">
                  <Heart className="w-6 h-6 fill-[#5A2630]" />
                </div>

                <div className="space-y-3.5 font-serif text-base sm:text-lg leading-relaxed text-[#4A2029]">
                  {finalMessage.map((line, idx) => (
                    <p
                      key={idx}
                      className={
                        idx === 0
                          ? 'text-2xl font-bold text-[#3D1E24]'
                          : idx === finalMessage.length - 1
                          ? 'font-bold text-[#5A2630] pt-2'
                          : ''
                      }
                    >
                      {line}
                    </p>
                  ))}
                </div>

                <div className="w-16 h-0.5 bg-[#C7A56A]/50 mx-auto mt-6 mb-2" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Footer */}
      <div className="pt-2 pb-safe">
        {isOpen ? (
          <button
            id="gift-continue-button"
            type="button"
            onClick={onContinue}
            className="w-full py-4 px-6 rounded-2xl bg-[#5A2630] hover:bg-[#481B24] active:bg-[#38121A] text-[#FFF9F4] font-medium tracking-wide shadow-xl shadow-black/40 transition-all flex items-center justify-center gap-2 min-h-[48px] touch-manipulation cursor-pointer border border-[#C98F91]/30"
          >
            <span>Our Forever Keepsake ❤️</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            id="gift-open-button"
            type="button"
            onClick={handleOpenGift}
            className="w-full py-4 px-6 rounded-2xl bg-[#5A2630] hover:bg-[#481B24] active:bg-[#38121A] text-[#FFF9F4] font-medium tracking-wide shadow-xl shadow-black/40 transition-all flex items-center justify-center gap-2 min-h-[48px] touch-manipulation cursor-pointer border border-[#C98F91]/30"
          >
            <span>Open Gift 🎁</span>
          </button>
        )}
      </div>
    </div>
  );
};
