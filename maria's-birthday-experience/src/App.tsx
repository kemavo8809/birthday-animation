import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, Camera } from 'lucide-react';

import { ScreenId, PhotoItem, TimelineItem } from './types.ts';
import { birthdayConfig } from './config/birthdayConfig.ts';

import { BackgroundAmbient } from './components/BackgroundAmbient.tsx';
import { AudioPlayer } from './components/AudioPlayer.tsx';
import { ScreenWelcome } from './components/ScreenWelcome.tsx';
import { ScreenPin } from './components/ScreenPin.tsx';
import { ScreenUnlockConfirmed } from './components/ScreenUnlockConfirmed.tsx';
import { ScreenEnvelope } from './components/ScreenEnvelope.tsx';
import { ScreenCardIntro } from './components/ScreenCardIntro.tsx';
import { ScreenTimeline } from './components/ScreenTimeline.tsx';
import { ScreenPhotoAlbum } from './components/ScreenPhotoAlbum.tsx';
import { ScreenMemoryCards } from './components/ScreenMemoryCards.tsx';
import { ScreenReasons } from './components/ScreenReasons.tsx';
import { ScreenQuiz } from './components/ScreenQuiz.tsx';
import { ScreenLetter } from './components/ScreenLetter.tsx';
import { ScreenCelebration } from './components/ScreenCelebration.tsx';
import { ScreenFinalGift } from './components/ScreenFinalGift.tsx';
import { ScreenReplay } from './components/ScreenReplay.tsx';
import { PhotoUploaderModal } from './components/PhotoUploaderModal.tsx';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('welcome');
  const [screenHistory, setScreenHistory] = useState<ScreenId[]>(['welcome']);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState<boolean>(false);

  // Photos state initialized from config or local storage if previously uploaded
  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    try {
      const saved = localStorage.getItem('maria_birthday_photos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return birthdayConfig.photos;
  });

  // Timeline with mapped photos
  const timelineData: TimelineItem[] = birthdayConfig.timeline.map((item, idx) => {
    // Map timeline photos if provided
    const matchingPhoto = photos[idx];
    return {
      ...item,
      imageSrc: matchingPhoto?.src || item.imageSrc
    };
  });

  const navigateTo = (nextScreen: ScreenId) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setScreenHistory(prev => [...prev, nextScreen]);
    setCurrentScreen(nextScreen);
  };

  const handleBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop();
      const prevScreen = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setCurrentScreen(prevScreen);
    }
  };

  const handleRestart = () => {
    setCurrentScreen('welcome');
    setScreenHistory(['welcome']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdatePhoto = (id: string, newSrc: string) => {
    const updated = photos.map(p => (p.id === id ? { ...p, src: newSrc } : p));
    setPhotos(updated);
    try {
      localStorage.setItem('maria_birthday_photos', JSON.stringify(updated));
    } catch {
      // LocalStorage quota handling
    }
  };

  const handleResetPhotos = () => {
    setPhotos(birthdayConfig.photos);
    try {
      localStorage.removeItem('maria_birthday_photos');
    } catch {
      // Fallback
    }
  };

  // Determine if back button should be visible (subtle, non-intrusive)
  const canGoBack =
    currentScreen !== 'welcome' &&
    currentScreen !== 'pin' &&
    currentScreen !== 'unlock_confirmed' &&
    currentScreen !== 'replay';

  return (
    <div className="relative min-h-screen bg-[#1F0A0E] text-[#3D1E24] overflow-x-hidden selection:bg-[#E8D7C7] selection:text-[#5A2630]">
      {/* Ambient romantic background */}
      <BackgroundAmbient />

      {/* Top Controls: Audio toggle & discreet photo manager button */}
      <div className="fixed top-0 inset-x-0 z-40 pointer-events-none">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between pointer-events-auto">
          {/* Subtle back button */}
          {canGoBack ? (
            <button
              type="button"
              id="global-back-button"
              onClick={handleBack}
              className="p-2 rounded-full bg-[#2A1017]/60 text-[#E8D7C7]/80 hover:text-[#FFF9F4] border border-[#C98F91]/25 backdrop-blur-md transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Previous scene"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-11 h-11" />
          )}

          {/* Right header controls */}
          <div className="flex items-center gap-2">
            {/* Discreet Photo Manager button for husband */}
            <button
              type="button"
              id="header-photo-manager-button"
              onClick={() => setIsPhotoModalOpen(true)}
              className="p-2 rounded-full bg-[#2A1017]/60 text-[#C7A56A] hover:text-[#FFF9F4] border border-[#C7A56A]/30 backdrop-blur-md transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center shadow-md"
              title="Add or update personal photos"
              aria-label="Manage personal photos"
            >
              <Camera className="w-4 h-4" />
            </button>

            {/* Audio Toggle */}
            <AudioPlayer />
          </div>
        </div>
      </div>

      {/* Mobile-first centered frame container */}
      <main className="relative z-10 w-full max-w-md mx-auto min-h-screen flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {currentScreen === 'welcome' && (
            <motion.div
              key="screen-welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ScreenWelcome onContinue={() => navigateTo('pin')} />
            </motion.div>
          )}

          {currentScreen === 'pin' && (
            <motion.div
              key="screen-pin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ScreenPin
                acceptedPins={birthdayConfig.acceptedPins}
                onSuccess={() => navigateTo('unlock_confirmed')}
              />
            </motion.div>
          )}

          {currentScreen === 'unlock_confirmed' && (
            <motion.div
              key="screen-unlock-confirmed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ScreenUnlockConfirmed onNext={() => navigateTo('envelope')} />
            </motion.div>
          )}

          {currentScreen === 'envelope' && (
            <motion.div
              key="screen-envelope"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ScreenEnvelope onOpen={() => navigateTo('card_intro')} />
            </motion.div>
          )}

          {currentScreen === 'card_intro' && (
            <motion.div
              key="screen-card-intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ScreenCardIntro
                birthdayDate={birthdayConfig.birthdayDate}
                introMessage={birthdayConfig.introMessage}
                onContinue={() => navigateTo('timeline')}
              />
            </motion.div>
          )}

          {currentScreen === 'timeline' && (
            <motion.div
              key="screen-timeline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ScreenTimeline
                timeline={timelineData}
                onContinue={() => navigateTo('photo_album')}
                onOpenPhotoManager={() => setIsPhotoModalOpen(true)}
                onUpdatePhoto={(index, newSrc) => {
                  const targetPhotoId = photos[index]?.id || `photo-0${index + 1}`;
                  handleUpdatePhoto(targetPhotoId, newSrc);
                }}
              />
            </motion.div>
          )}

          {currentScreen === 'photo_album' && (
            <motion.div
              key="screen-photo-album"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ScreenPhotoAlbum
                photos={photos}
                onContinue={() => navigateTo('memory_cards')}
                onOpenPhotoManager={() => setIsPhotoModalOpen(true)}
                onUpdatePhoto={handleUpdatePhoto}
              />
            </motion.div>
          )}

          {currentScreen === 'memory_cards' && (
            <motion.div
              key="screen-memory-cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ScreenMemoryCards
                memories={birthdayConfig.memories}
                onContinue={() => navigateTo('reasons')}
              />
            </motion.div>
          )}

          {currentScreen === 'reasons' && (
            <motion.div
              key="screen-reasons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ScreenReasons
                reasons={birthdayConfig.reasons}
                onContinue={() => navigateTo('quiz')}
              />
            </motion.div>
          )}

          {currentScreen === 'quiz' && (
            <motion.div
              key="screen-quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ScreenQuiz
                quiz={birthdayConfig.quiz}
                onContinue={() => navigateTo('letter')}
              />
            </motion.div>
          )}

          {currentScreen === 'letter' && (
            <motion.div
              key="screen-letter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ScreenLetter
                paragraphs={birthdayConfig.birthdayLetterParagraphs}
                onContinue={() => navigateTo('celebration')}
              />
            </motion.div>
          )}

          {currentScreen === 'celebration' && (
            <motion.div
              key="screen-celebration"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ScreenCelebration
                birthdayDate={birthdayConfig.birthdayDate}
                onContinue={() => navigateTo('final_gift')}
              />
            </motion.div>
          )}

          {currentScreen === 'final_gift' && (
            <motion.div
              key="screen-final-gift"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ScreenFinalGift
                finalMessage={birthdayConfig.finalGiftMessage}
                onContinue={() => navigateTo('replay')}
              />
            </motion.div>
          )}

          {currentScreen === 'replay' && (
            <motion.div
              key="screen-replay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ScreenReplay
                birthdayDate={birthdayConfig.birthdayDate}
                onRestart={handleRestart}
                onOpenPhotoManager={() => setIsPhotoModalOpen(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Photo Uploader / Manager Modal */}
      <PhotoUploaderModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        photos={photos}
        onUpdatePhoto={handleUpdatePhoto}
        onResetPhotos={handleResetPhotos}
      />
    </div>
  );
}
