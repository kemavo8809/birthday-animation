import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, ChevronDown, Check } from 'lucide-react';
import { MemoryCardItem } from '../types.ts';

interface ScreenMemoryCardsProps {
  memories: MemoryCardItem[];
  onContinue: () => void;
}

export const ScreenMemoryCards: React.FC<ScreenMemoryCardsProps> = ({
  memories,
  onContinue
}) => {
  const [openedIds, setOpenedIds] = useState<string[]>([]);

  const toggleCard = (id: string) => {
    setOpenedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col min-h-[92svh] px-4 py-8 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9F4]/10 text-[#E8CA94] text-xs font-medium mb-3 border border-[#C7A56A]/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Little Vault of Memories</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-[#FFF9F4] tracking-tight mb-2">
          Tap To Reveal
        </h2>
        <p className="text-xs sm:text-sm text-[#E8D7C7]/80 font-light max-w-xs mx-auto">
          A few little moments that made an indelible mark on my heart.
        </p>
      </div>

      {/* Memory Cards list */}
      <div className="space-y-4 mb-8">
        {memories.map((card, idx) => {
          const isOpen = openedIds.includes(card.id);
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="rounded-2xl overflow-hidden border border-[#E8D7C7]/70 shadow-lg shadow-black/20 bg-gradient-to-b from-[#FFF9F4] to-[#FDF4EE] transition-all"
            >
              <button
                type="button"
                id={`memory-card-${card.id}`}
                onClick={() => toggleCard(card.id)}
                className="w-full p-4.5 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer min-h-[52px] touch-manipulation select-none"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                      isOpen
                        ? 'bg-[#5A2630] text-[#FFF9F4]'
                        : 'bg-[#F6E6E5] text-[#8F3E4D]'
                    }`}
                  >
                    {isOpen ? (
                      <Check className="w-4 h-4 text-[#E8CA94]" />
                    ) : (
                      <Heart className="w-4 h-4 fill-[#8F3E4D]" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C7A56A] block mb-0.5">
                      {card.tag}
                    </span>
                    <h3 className="text-base font-serif font-bold text-[#3D1E24] leading-snug">
                      {card.title}
                    </h3>
                  </div>
                </div>

                <div
                  className={`w-7 h-7 rounded-full bg-[#E8D7C7]/50 flex items-center justify-center text-[#5A2630] transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                  >
                    <div className="px-5 pb-5 pt-1 border-t border-[#E8D7C7]/60">
                      <p className="text-sm text-[#5A2630] font-serif leading-relaxed italic bg-[#F6E6E5]/40 p-3.5 rounded-xl border border-[#C98F91]/20">
                        "{card.revealedText}"
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Primary Action Button */}
      <div className="sticky bottom-4 pt-2 pb-safe">
        <button
          id="memories-continue-button"
          type="button"
          onClick={onContinue}
          className="w-full py-4 px-6 rounded-2xl bg-[#5A2630] hover:bg-[#481B24] active:bg-[#38121A] text-[#FFF9F4] font-medium tracking-wide shadow-xl shadow-black/40 transition-all flex items-center justify-center gap-2 min-h-[48px] touch-manipulation cursor-pointer border border-[#C98F91]/30"
        >
          <span>Reasons I Love You ❤️</span>
          <Heart className="w-4 h-4 fill-[#FFF9F4]" />
        </button>
      </div>
    </div>
  );
};
