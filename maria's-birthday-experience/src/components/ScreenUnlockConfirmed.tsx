import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

interface ScreenUnlockConfirmedProps {
  onNext: () => void;
}

export const ScreenUnlockConfirmed: React.FC<ScreenUnlockConfirmedProps> = ({ onNext }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[90svh] px-4 py-8 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm mx-auto"
      >
        <div className="p-8 rounded-3xl bg-gradient-to-b from-[#FFF9F4] to-[#FDF4EE] text-[#3D1E24] shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-[#E8D7C7]">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#F6E6E5] flex items-center justify-center text-[#C98F91] shadow-inner"
          >
            <Heart className="w-8 h-8 fill-[#C98F91] text-[#C98F91]" />
          </motion.div>

          <h2 className="text-3xl font-serif font-semibold text-[#3D1E24] mb-3">
            Welcome in, Maria. ❤️
          </h2>

          <p className="text-base text-[#73404B] font-light">
            Now the fun part begins.
          </p>

          <div className="flex items-center justify-center gap-1.5 mt-6 text-[#C7A56A]">
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
            <span className="text-xs tracking-wider uppercase">Unfolding your surprise</span>
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
