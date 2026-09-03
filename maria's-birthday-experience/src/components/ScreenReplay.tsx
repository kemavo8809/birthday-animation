import React from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Heart, Sparkles, Camera } from 'lucide-react';

interface ScreenReplayProps {
  onRestart: () => void;
  onOpenPhotoManager?: () => void;
  birthdayDate: string;
}

export const ScreenReplay: React.FC<ScreenReplayProps> = ({
  onRestart,
  onOpenPhotoManager,
  birthdayDate
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90svh] px-4 py-8 text-center max-w-sm mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full"
      >
        <div className="p-8 rounded-3xl bg-gradient-to-b from-[#FFF9F4] to-[#FAF0E6] text-[#3D1E24] shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-[#E8D7C7] relative">
          <div className="w-14 h-14 rounded-full bg-[#5A2630] text-[#E8CA94] flex items-center justify-center mx-auto mb-5 shadow-md">
            <Heart className="w-7 h-7 fill-[#E8CA94]" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3D1E24] mb-2 tracking-tight">
            Happy Birthday, My Love, My Wifey, Maria ❤️
          </h2>

          <p className="text-sm font-serif italic text-[#C7A56A] font-semibold mb-4">
            {birthdayDate}
          </p>

          <div className="w-12 h-0.5 bg-[#C7A56A]/40 mx-auto mb-5" />

          <p className="text-base text-[#5A2630] font-serif leading-relaxed mb-8">
            Made with all my love, for you and our beautiful boys Zohan & Azlan. 👨‍👩‍👦‍👦❤️
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              id="start-again-button"
              type="button"
              onClick={onRestart}
              className="w-full py-4 px-6 rounded-2xl bg-[#5A2630] hover:bg-[#481B24] active:bg-[#38121A] text-[#FFF9F4] font-medium tracking-wide shadow-lg transition-colors flex items-center justify-center gap-2 min-h-[48px] touch-manipulation cursor-pointer border border-[#C98F91]/30"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Start Again</span>
            </button>

            {onOpenPhotoManager && (
              <button
                type="button"
                onClick={onOpenPhotoManager}
                className="w-full py-3 px-5 rounded-xl bg-transparent hover:bg-[#F6E6E5] text-[#73404B] text-xs font-medium transition-colors flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-[#C7A56A]" />
                <span>Manage Photo Memories</span>
              </button>
            )}
          </div>
        </div>

        <p className="mt-6 text-xs text-[#E8D7C7]/40 tracking-widest uppercase">
          Forever and Always
        </p>
      </motion.div>
    </div>
  );
};
