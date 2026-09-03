import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Delete, Lock, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScreenPinProps {
  onSuccess: () => void;
  acceptedPins: string[];
}

export const ScreenPin: React.FC<ScreenPinProps> = ({ onSuccess, acceptedPins }) => {
  const [pin, setPin] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);
  const [isBalloonPopped, setIsBalloonPopped] = useState<boolean>(false);

  const playfulErrors = [
    "Almost... try again 😌",
    "Think about our special date. ❤️",
    "Pop the birthday balloon above for the secret code! 🎈",
    "Hint: The day our story took the sacred step! 💍"
  ];

  const handleDigit = (digit: string) => {
    if (isSuccess || pin.length >= 4) return;
    const nextPin = pin + digit;
    setPin(nextPin);
    setFeedback('');

    // Check if 4-digit PIN matches (0428)
    if (acceptedPins.includes(nextPin)) {
      handleSuccess();
    } else if (nextPin.length === 4) {
      triggerWrongPin();
    }
  };

  const handleDelete = () => {
    if (isSuccess || pin.length === 0) return;
    setPin(prev => prev.slice(0, -1));
    setFeedback('');
  };

  const triggerWrongPin = () => {
    setShake(true);
    const randomMsg = playfulErrors[Math.floor(Math.random() * playfulErrors.length)];
    setFeedback(randomMsg);
    setTimeout(() => {
      setShake(false);
      setPin('');
    }, 600);
  };

  const handleSuccess = () => {
    setIsSuccess(true);
    setFeedback("Welcome, my beautiful wifey! ❤️");

    // Celebratory confetti
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#C7A56A', '#C98F91', '#F6E6E5', '#FFF9F4'],
      disableForReducedMotion: true
    });

    setTimeout(() => {
      onSuccess();
    }, 1200);
  };

  const popBalloon = () => {
    if (isBalloonPopped) return;
    setIsBalloonPopped(true);

    // Pop sound & sparkle confetti
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.4 },
      colors: ['#FF6B8B', '#FFD166', '#C7A56A', '#FFF9F4'],
      disableForReducedMotion: true
    });

    setFeedback("Hint revealed: 0428 (April 28) 💍❤️");
  };

  const autoFillPin = () => {
    setPin('0428');
    handleSuccess();
  };

  // Keyboard support for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, isSuccess]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[92svh] px-4 py-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm mx-auto"
      >
        <div className="p-7 rounded-3xl bg-gradient-to-b from-[#FFF9F4] to-[#FDF4EE] text-[#3D1E24] shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-[#E8D7C7]/80 relative overflow-hidden">
          
          {/* Interactive Birthday Balloon Hint */}
          <div className="mb-4">
            <AnimatePresence mode="wait">
              {!isBalloonPopped ? (
                <motion.button
                  key="balloon-button"
                  type="button"
                  id="pop-balloon-hint-button"
                  onClick={popBalloon}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#F6E6E5] to-[#FDF0EB] border border-[#C98F91]/50 text-xs font-medium text-[#5A2630] shadow-sm hover:shadow cursor-pointer touch-manipulation min-h-[44px]"
                  title="Tap to pop the balloon for the secret PIN hint!"
                >
                  <span className="text-lg">🎈</span>
                  <span>Pop the balloon for the PIN hint!</span>
                </motion.button>
              ) : (
                <motion.div
                  key="balloon-popped-hint"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-flex flex-col items-center gap-1 px-4 py-2 rounded-2xl bg-[#5A2630]/10 border border-[#5A2630]/20 text-[#5A2630]"
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#C7A56A]" />
                    <span>Secret PIN: <strong className="font-mono text-sm tracking-wider text-[#3D1E24]">0428</strong></span>
                    <Heart className="w-3.5 h-3.5 fill-[#C98F91] text-[#C98F91]" />
                  </div>
                  <button
                    type="button"
                    onClick={autoFillPin}
                    className="text-[11px] underline text-[#73404B] hover:text-[#3D1E24] cursor-pointer"
                  >
                    Tap here to enter automatically
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-center mb-3">
            <div className="w-11 h-11 rounded-full bg-[#F6E6E5] flex items-center justify-center text-[#5A2630]">
              {isSuccess ? (
                <Sparkles className="w-5 h-5 text-[#C7A56A] animate-spin" style={{ animationDuration: '3s' }} />
              ) : (
                <Lock className="w-5 h-5 text-[#5A2630]" />
              )}
            </div>
          </div>

          <h2 className="text-2xl font-serif font-semibold text-[#3D1E24] mb-1">
            Enter The Secret Code
          </h2>
          <p className="text-xs text-[#73404B] mb-5">
            4 digits to unlock your personal birthday surprise ✨
          </p>

          {/* Masked PIN Indicators (4 dots for 0428) */}
          <motion.div
            animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-3.5 mb-5"
          >
            {[0, 1, 2, 3].map((index) => {
              const isFilled = pin.length > index;
              return (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-250 border ${
                    isSuccess
                      ? 'bg-[#C7A56A] border-[#C7A56A] scale-110 shadow-sm shadow-[#C7A56A]'
                      : isFilled
                      ? 'bg-[#5A2630] border-[#5A2630] scale-105'
                      : 'bg-[#FFF9F4] border-[#C98F91]/50'
                  }`}
                />
              );
            })}
          </motion.div>

          {/* Feedback message */}
          <div className="h-6 mb-3 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {feedback && (
                <motion.p
                  key={feedback}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className={`text-xs font-medium ${
                    isSuccess ? 'text-[#8A5A20]' : 'text-[#8F3E4D]'
                  }`}
                >
                  {feedback}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Custom keypad */}
          <div className="grid grid-cols-3 gap-2.5 max-w-[260px] mx-auto mb-1">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                type="button"
                id={`pin-key-${digit}`}
                onClick={() => handleDigit(digit)}
                disabled={isSuccess}
                className="w-16 h-14 mx-auto rounded-2xl bg-[#FFF9F4] border border-[#E8D7C7] text-lg font-semibold text-[#3D1E24] shadow-sm hover:bg-[#F6E6E5] active:bg-[#E8D7C7] transition-all flex items-center justify-center touch-manipulation min-h-[44px] min-w-[44px] cursor-pointer"
              >
                {digit}
              </button>
            ))}
            <div className="w-16 h-14" />
            <button
              type="button"
              id="pin-key-0"
              onClick={() => handleDigit('0')}
              disabled={isSuccess}
              className="w-16 h-14 mx-auto rounded-2xl bg-[#FFF9F4] border border-[#E8D7C7] text-lg font-semibold text-[#3D1E24] shadow-sm hover:bg-[#F6E6E5] active:bg-[#E8D7C7] transition-all flex items-center justify-center touch-manipulation min-h-[44px] min-w-[44px] cursor-pointer"
            >
              0
            </button>
            <button
              type="button"
              id="pin-key-delete"
              onClick={handleDelete}
              disabled={isSuccess || pin.length === 0}
              aria-label="Delete last digit"
              className="w-16 h-14 mx-auto rounded-2xl bg-[#FFF9F4] border border-[#E8D7C7] text-[#73404B] shadow-sm hover:bg-[#F6E6E5] active:bg-[#E8D7C7] transition-all flex items-center justify-center touch-manipulation min-h-[44px] min-w-[44px] cursor-pointer disabled:opacity-30"
            >
              <Delete className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
