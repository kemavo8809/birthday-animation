import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizQuestion } from '../types.ts';

interface ScreenQuizProps {
  quiz: QuizQuestion[];
  onContinue: () => void;
}

export const ScreenQuiz: React.FC<ScreenQuizProps> = ({ quiz, onContinue }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentQ = quiz[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);

    // Every option is a loving, sweet correct answer!
    setFeedback(currentQ.correctMessage);

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#C7A56A', '#C98F91', '#FFF9F4', '#FF6B8B'],
      disableForReducedMotion: true
    });

    setTimeout(() => {
      if (currentIndex < quiz.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
        setFeedback(null);
      } else {
        setIsCompleted(true);
      }
    }, 1800);
  };

  return (
    <div className="flex flex-col justify-between min-h-[92svh] px-4 py-8 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF9F4]/15 text-[#E8CA94] text-xs font-medium mb-3 border border-[#C7A56A]/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>A Sweet Birthday Quiz 🎂</span>
        </div>

        <h2 className="text-3xl font-serif font-bold text-[#FFF9F4] tracking-tight">
          Just For Fun 🥰
        </h2>
      </div>

      {/* Main Quiz Area */}
      <div className="my-auto py-4">
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key={currentQ.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <div className="p-7 rounded-3xl bg-gradient-to-b from-[#FFF9F4] to-[#FDF4EE] text-[#3D1E24] shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-[#E8D7C7]">
                <div className="flex items-center justify-between text-xs text-[#C7A56A] font-mono mb-3">
                  <span>QUESTION 0{currentQ.id}</span>
                  <span>0{quiz.length} TOTAL</span>
                </div>

                <h3 className="text-xl font-serif font-bold text-[#3D1E24] mb-6 leading-snug">
                  {currentQ.question}
                </h3>

                {/* Option Buttons */}
                <div className="space-y-3 mb-4">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    let btnStyle =
                      'bg-[#FFF9F4] text-[#3D1E24] border-[#E8D7C7] hover:bg-[#F6E6E5]';

                    if (selectedOption !== null && isSelected) {
                      btnStyle =
                        'bg-[#5A2630] text-[#FFF9F4] border-[#5A2630] scale-[1.02] shadow-md';
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        id={`quiz-option-${currentQ.id}-${idx}`}
                        disabled={selectedOption !== null}
                        onClick={() => handleSelectOption(idx)}
                        className={`w-full p-4 rounded-2xl border text-sm font-medium text-left transition-all flex items-center justify-between gap-3 cursor-pointer min-h-[48px] touch-manipulation ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {selectedOption !== null && isSelected && (
                          <Heart className="w-4 h-4 shrink-0 fill-[#E8CA94] text-[#E8CA94] animate-pulse" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback note */}
                <div className="min-h-10 flex items-center justify-center text-center">
                  {feedback && (
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs sm:text-sm font-serif italic text-[#5A2630] font-semibold"
                    >
                      {feedback}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            /* Quiz Completed Stage */
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full text-center"
            >
              <div className="p-8 rounded-3xl bg-gradient-to-b from-[#FFF9F4] to-[#FDF4EE] text-[#3D1E24] shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-[#E8D7C7]">
                <div className="w-16 h-16 rounded-full bg-[#5A2630] text-[#E8CA94] flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Check className="w-8 h-8" />
                </div>

                <h3 className="text-3xl font-serif font-bold text-[#3D1E24] mb-2">
                  100% Correct! 😌❤️
                </h3>

                <p className="text-base text-[#5A2630] font-serif leading-relaxed mb-6">
                  Every answer you picked is true. You are the heart of our home and the love of my life.
                </p>

                <button
                  id="quiz-continue-button"
                  type="button"
                  onClick={onContinue}
                  className="w-full py-4 px-6 rounded-2xl bg-[#5A2630] hover:bg-[#481B24] active:bg-[#38121A] text-[#FFF9F4] font-medium tracking-wide shadow-lg transition-colors flex items-center justify-center gap-2 min-h-[48px] touch-manipulation cursor-pointer"
                >
                  <span>Read Your Birthday Letter ❤️</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Footer */}
      {!isCompleted && (
        <div className="pt-2 pb-safe text-center">
          <p className="text-xs text-[#E8D7C7]/70">
            Pick whichever answer touches your heart ✨
          </p>
        </div>
      )}
    </div>
  );
};
