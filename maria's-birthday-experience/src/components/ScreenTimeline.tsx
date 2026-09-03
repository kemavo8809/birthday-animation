import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, ArrowRight, Camera } from 'lucide-react';
import { TimelineItem } from '../types.ts';

interface ScreenTimelineProps {
  timeline: TimelineItem[];
  onContinue: () => void;
  onOpenPhotoManager?: () => void;
  onUpdatePhoto?: (index: number, newSrc: string) => void;
}

export const ScreenTimeline: React.FC<ScreenTimelineProps> = ({
  timeline,
  onContinue,
  onOpenPhotoManager,
  onUpdatePhoto
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const targetIndexRef = useRef<number | null>(null);

  const handleTriggerChangeTimelinePhoto = (idx: number) => {
    targetIndexRef.current = idx;
    if (onUpdatePhoto) {
      fileInputRef.current?.click();
    } else if (onOpenPhotoManager) {
      onOpenPhotoManager();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdatePhoto && targetIndexRef.current !== null) {
      const idx = targetIndexRef.current;
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onUpdatePhoto(idx, result);
        }
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col min-h-[92svh] px-4 py-8 max-w-md mx-auto">
      {/* Hidden file input for timeline photo updates */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9F4]/10 text-[#E8CA94] text-xs font-medium mb-3 border border-[#C7A56A]/30 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Story So Far</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-[#FFF9F4] tracking-tight mb-2">
          Milestones Along The Way
        </h2>
        <p className="text-sm text-[#E8D7C7]/80 font-light max-w-xs mx-auto">
          Every single step with you has been my favorite chapter.
        </p>
      </motion.div>

      {/* Timeline Vertical Track */}
      <div className="relative pl-6 sm:pl-8 space-y-6 mb-10">
        {/* Continuous delicate vertical line */}
        <div className="absolute left-[13px] sm:left-[17px] top-3 bottom-6 w-[2px] bg-gradient-to-b from-[#C7A56A] via-[#C98F91] to-[#C7A56A]/40" />

        {timeline.map((item, idx) => {
          const isWedding = item.isWeddingMilestone;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="relative"
            >
              {/* Timeline node icon */}
              <div
                className={`absolute -left-[25px] sm:-left-[29px] top-3.5 w-6 h-6 rounded-full flex items-center justify-center shadow-md ${
                  isWedding
                    ? 'bg-[#C7A56A] text-[#36141B] ring-4 ring-[#C7A56A]/30'
                    : 'bg-[#5A2630] border-2 border-[#C7A56A] text-[#FFF9F4]'
                }`}
              >
                <Heart className={`w-3 h-3 ${isWedding ? 'fill-[#36141B]' : 'fill-[#C7A56A]'}`} />
              </div>

              {/* Card */}
              <div
                className={`p-5 rounded-2xl transition-all ${
                  isWedding
                    ? 'bg-gradient-to-br from-[#FFF9F4] to-[#FAF0E6] border-2 border-[#C7A56A] shadow-[0_12px_30px_rgba(199,165,106,0.25)]'
                    : 'bg-[#FFF9F4] border border-[#E8D7C7] shadow-lg shadow-black/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider ${
                      isWedding ? 'text-[#C7A56A]' : 'text-[#8F3E4D]'
                    }`}
                  >
                    {item.date}
                  </span>
                  {isWedding && (
                    <span className="px-2 py-0.5 rounded-full bg-[#C7A56A]/20 text-[#5A2630] text-[10px] font-bold tracking-wider uppercase">
                      Our Wedding Day
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-serif font-bold text-[#3D1E24] mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-[#5A2630] leading-relaxed mb-3">
                  {item.text}
                </p>

                {/* Photo frame strictly 1:1 SQUARE */}
                {item.imageSrc ? (
                  <div className="mt-3 relative overflow-hidden rounded-2xl border border-[#E8D7C7] shadow-sm aspect-square w-full bg-[#2A1017]">
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                    {/* Only Change Image button is shown once image is added */}
                    <button
                      type="button"
                      onClick={() => handleTriggerChangeTimelinePhoto(idx)}
                      className="absolute bottom-2.5 right-2.5 px-3 py-1.5 rounded-xl bg-black/75 hover:bg-black/90 text-white backdrop-blur-md transition-all shadow-md flex items-center gap-1.5 text-xs font-medium cursor-pointer border border-white/25 min-h-[36px]"
                      title="Change Image"
                    >
                      <Camera className="w-3.5 h-3.5 text-[#E8CA94]" />
                      <span>Change Image</span>
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => handleTriggerChangeTimelinePhoto(idx)}
                    className="mt-3 p-3.5 rounded-xl bg-[#F6E6E5]/60 border border-dashed border-[#C98F91]/50 flex items-center justify-between gap-2 text-xs text-[#73404B] cursor-pointer hover:bg-[#F6E6E5]"
                  >
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-[#C7A56A]" />
                      <span className="font-mono text-[11px]">{item.imagePlaceholder}</span>
                    </div>
                    <span className="text-[11px] text-[#C7A56A] font-medium underline">
                      Select Image
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Primary Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="sticky bottom-4 pt-2 pb-safe"
      >
        <button
          id="timeline-continue-button"
          type="button"
          onClick={onContinue}
          className="w-full py-4 px-6 rounded-2xl bg-[#5A2630] hover:bg-[#481B24] active:bg-[#38121A] text-[#FFF9F4] font-medium tracking-wide shadow-xl shadow-black/40 transition-all flex items-center justify-center gap-2 min-h-[48px] touch-manipulation cursor-pointer border border-[#C98F91]/30"
        >
          <span>See Our Memories ❤️</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
};
