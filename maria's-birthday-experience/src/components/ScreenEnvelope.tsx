import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

interface ScreenEnvelopeProps {
  onOpen: () => void;
}

export const ScreenEnvelope: React.FC<ScreenEnvelopeProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleTap = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90svh] px-4 py-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-sm mx-auto"
      >
        <p className="text-xs uppercase tracking-[0.25em] text-[#E8CA94]/80 mb-3">
          A Special Delivery
        </p>

        {/* Envelope Container */}
        <div
          id="birthday-envelope-card"
          onClick={handleTap}
          className="relative cursor-pointer group select-none"
        >
          {/* Subtle glowing halo */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#C7A56A]/20 via-[#C98F91]/25 to-[#C7A56A]/20 rounded-3xl blur-xl transition-opacity opacity-75 group-hover:opacity-100" />

          <motion.div
            animate={isOpening ? { scale: [1, 1.03, 1] } : {}}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-b from-[#FFF9F4] to-[#F5E8DC] p-7 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-[#E8D7C7] overflow-hidden min-h-[300px] flex flex-col justify-between"
          >
            {/* Wax seal / stamp decoration at the top */}
            <div className="flex justify-between items-start">
              <span className="text-[11px] tracking-widest text-[#73404B]/60 uppercase font-serif">
                Special Edition
              </span>
              <div className="w-9 h-9 rounded-full bg-[#5A2630] flex items-center justify-center text-[#E8CA94] shadow-md border border-[#C7A56A]/40">
                <Heart className="w-4 h-4 fill-[#E8CA94]" />
              </div>
            </div>

            {/* Main Envelope Face */}
            <div className="my-6">
              <div className="w-16 h-0.5 bg-[#C7A56A]/40 mx-auto mb-5" />
              <h2 className="text-4xl font-serif font-bold text-[#3D1E24] tracking-wide mb-2">
                For Maria
              </h2>
              <p className="text-sm font-handwriting text-2xl text-[#5A2630] mt-1">
                With all my love
              </p>
              <div className="w-16 h-0.5 bg-[#C7A56A]/40 mx-auto mt-5" />
            </div>

            {/* Letter peek animation when opening */}
            <motion.div
              initial={false}
              animate={isOpening ? { y: -70, opacity: 1 } : { y: 0, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute inset-x-5 -bottom-10 h-32 bg-white rounded-xl shadow-lg border border-[#C7A56A]/30 flex items-center justify-center p-4 pointer-events-none"
            >
              <p className="text-base font-serif text-[#5A2630]">
                Happy Birthday, Maria...
              </p>
            </motion.div>

            {/* Bottom prompt */}
            <div className="pt-2">
              <p className="text-xs text-[#73404B]/80 font-light flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C7A56A]" />
                <span>Open when you are ready</span>
                <Sparkles className="w-3.5 h-3.5 text-[#C7A56A]" />
              </p>
            </div>
          </motion.div>
        </div>

        {/* Action Button for easy tapping */}
        <button
          id="tap-envelope-button"
          type="button"
          onClick={handleTap}
          className="mt-6 w-full py-3.5 px-6 rounded-2xl bg-[#5A2630]/90 hover:bg-[#5A2630] active:bg-[#3D141C] text-[#FFF9F4] text-sm font-medium tracking-wide shadow-md transition-colors border border-[#C98F91]/30 cursor-pointer min-h-[48px] touch-manipulation"
        >
          {isOpening ? 'Opening for you...' : 'Tap To Open Envelope'}
        </button>
      </motion.div>
    </div>
  );
};
