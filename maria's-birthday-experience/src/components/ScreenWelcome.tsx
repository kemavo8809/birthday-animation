import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

interface ScreenWelcomeProps {
  onContinue: () => void;
}

export const ScreenWelcome: React.FC<ScreenWelcomeProps> = ({ onContinue }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90svh] px-4 py-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm mx-auto"
      >
        {/* Soft luxury romantic card */}
        <div className="relative p-8 rounded-3xl bg-gradient-to-b from-[#FFF9F4] to-[#FDF4EE] text-[#3D1E24] shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-[#E8D7C7]/80 overflow-hidden">
          {/* Subtle gold foil corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#C7A56A]/40 rounded-tl-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#C7A56A]/40 rounded-br-3xl pointer-events-none" />

          {/* Delicate heart icon */}
          <div className="flex justify-center mb-5">
            <div className="w-12 h-12 rounded-full bg-[#F6E6E5] flex items-center justify-center text-[#C98F91] shadow-inner">
              <Heart className="w-6 h-6 fill-[#C98F91]" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-serif font-semibold tracking-wide text-[#3D1E24] mb-3">
            Maria ❤️
          </h1>

          {/* Subtitle */}
          <p className="text-lg font-serif italic text-[#5A2630] mb-3">
            I made something just for you.
          </p>

          <p className="text-sm text-[#73404B] font-light leading-relaxed mb-8 max-w-xs mx-auto">
            Take your time. There is a little surprise waiting inside.
          </p>

          {/* Primary Action Button */}
          <motion.button
            id="open-surprise-button"
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onContinue}
            className="w-full py-4 px-6 rounded-2xl bg-[#5A2630] hover:bg-[#481B24] active:bg-[#38121A] text-[#FFF9F4] font-medium tracking-wide shadow-lg shadow-[#5A2630]/30 transition-colors flex items-center justify-center gap-2 min-h-[48px] touch-manipulation cursor-pointer"
          >
            <span>Open Your Surprise</span>
            <Sparkles className="w-4 h-4 text-[#C7A56A]" />
          </motion.button>
        </div>

        {/* Quiet footer note */}
        <p className="mt-6 text-xs text-[#E8D7C7]/50 tracking-widest uppercase">
          A Private Gift
        </p>
      </motion.div>
    </div>
  );
};
