import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Heart, ArrowRight } from 'lucide-react';

interface ScreenCardIntroProps {
  onContinue: () => void;
  birthdayDate: string;
  introMessage: string;
}

export const ScreenCardIntro: React.FC<ScreenCardIntroProps> = ({
  onContinue,
  birthdayDate,
  introMessage
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90svh] px-4 py-8 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="p-8 rounded-3xl bg-gradient-to-b from-[#FFF9F4] to-[#FDF4EE] text-[#3D1E24] shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-[#E8D7C7] relative overflow-hidden">
          {/* Subtle gold ribbon top header */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F6E6E5] text-[#5A2630] text-xs font-medium mb-4 border border-[#C98F91]/30">
            <Calendar className="w-3.5 h-3.5 text-[#C7A56A]" />
            <span>{birthdayDate}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#3D1E24] tracking-tight mb-2">
            Happy Birthday, My Love, My Wifey, Maria ❤️
          </h1>

          <div className="w-12 h-0.5 bg-[#C7A56A]/50 mx-auto my-4" />

          {/* Genuine conversational husband note */}
          <p className="text-base sm:text-lg text-[#5A2630] font-serif leading-relaxed mb-5">
            {introMessage}
          </p>

          <div className="p-4 rounded-2xl bg-[#FFF9F4] border border-[#E8D7C7] text-left mb-6 shadow-inner">
            <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold text-[#C7A56A] uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 fill-[#C7A56A]" />
              <span>A Walk Through Our Story</span>
            </div>
            <p className="text-xs sm:text-sm text-[#73404B] leading-relaxed">
              Before the rest of the celebration unfolds, let us take a gentle stroll through a few moments that mean the world to me.
            </p>
          </div>

          {/* Primary Action Button */}
          <motion.button
            id="intro-lets-go-button"
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onContinue}
            className="w-full py-4 px-6 rounded-2xl bg-[#5A2630] hover:bg-[#481B24] active:bg-[#38121A] text-[#FFF9F4] font-medium tracking-wide shadow-lg shadow-[#5A2630]/30 transition-colors flex items-center justify-center gap-2 min-h-[48px] touch-manipulation cursor-pointer"
          >
            <span>Let us Go ❤️</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
