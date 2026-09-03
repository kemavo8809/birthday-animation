import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, X, Camera, Sparkles, Heart } from 'lucide-react';
import { PhotoItem } from '../types.ts';

interface ScreenPhotoAlbumProps {
  photos: PhotoItem[];
  onContinue: () => void;
  onOpenPhotoManager?: () => void;
  onUpdatePhoto?: (id: string, newSrc: string) => void;
}

export const ScreenPhotoAlbum: React.FC<ScreenPhotoAlbumProps> = ({
  photos,
  onContinue,
  onOpenPhotoManager,
  onUpdatePhoto
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [fullScreenPhoto, setFullScreenPhoto] = useState<PhotoItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Swipe gesture tracking
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const totalPhotos = photos.length;
  const currentPhoto = photos[currentIndex] || photos[0];

  const handleTriggerChangePhoto = () => {
    if (onUpdatePhoto) {
      fileInputRef.current?.click();
    } else if (onOpenPhotoManager) {
      onOpenPhotoManager();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdatePhoto && currentPhoto) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onUpdatePhoto(currentPhoto.id, result);
        }
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeDistance = touchEndX.current - touchStartX.current;
    if (swipeDistance < -45) {
      // Swiped left, go to next
      handleNext();
    } else if (swipeDistance > 45) {
      // Swiped right, go to previous
      handlePrev();
    }
  };

  const handleNext = () => {
    if (currentIndex < totalPhotos - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Loop or stay
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(totalPhotos - 1);
    }
  };

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <div className="flex flex-col justify-between min-h-[92svh] px-4 py-6 max-w-md mx-auto">
      {/* Hidden file input for direct seamless changing of current photo */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/*"
        className="hidden"
      />

      {/* Header with counter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9F4]/10 text-[#E8CA94] text-xs font-medium border border-[#C7A56A]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Memory Album</span>
          </div>

          {/* Dynamic counter: e.g. 03 / 20 */}
          <div className="px-3 py-1 rounded-full bg-[#5A2630]/60 border border-[#C98F91]/30 text-xs font-mono font-medium text-[#FFF9F4]">
            <span>{formatNumber(currentIndex + 1)}</span>
            <span className="text-[#C7A56A] mx-1">/</span>
            <span>{formatNumber(totalPhotos)}</span>
          </div>
        </div>

        <p className="text-xs text-[#E8D7C7]/70 mb-3 text-center">
          Swipe left or right to explore each moment
        </p>
      </div>

      {/* Main Single Photo Stage */}
      <div
        className="relative my-auto select-none touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhoto.id}
            initial={{ opacity: 0, scale: 0.96, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.96, x: -20 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="w-full"
          >
            {/* Elegant Polaroid / Keepsake Frame */}
            <div className="p-4 sm:p-5 rounded-3xl bg-[#FFF9F4] text-[#3D1E24] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#E8D7C7] flex flex-col">
              {/* Image Frame strictly 1:1 SQUARE */}
              <div
                className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#2D1219] border border-[#E8D7C7] flex items-center justify-center"
              >
                {currentPhoto.src ? (
                  <>
                    <img
                      src={currentPhoto.src}
                      alt={currentPhoto.caption || currentPhoto.category}
                      className="w-full h-full object-cover object-center cursor-pointer"
                      onClick={() => setFullScreenPhoto(currentPhoto)}
                      loading="lazy"
                    />

                    {/* Change Image Button - Clean & direct, strictly no 'add photo' text */}
                    <button
                      type="button"
                      id="change-current-photo-button"
                      onClick={handleTriggerChangePhoto}
                      className="absolute bottom-2.5 left-2.5 px-3 py-1.5 rounded-xl bg-black/75 hover:bg-black/90 text-white backdrop-blur-md transition-all shadow-md flex items-center gap-1.5 text-xs font-medium cursor-pointer border border-white/25 min-h-[36px]"
                      title="Change Image"
                    >
                      <Camera className="w-3.5 h-3.5 text-[#E8CA94]" />
                      <span>Change Image</span>
                    </button>

                    {/* Fullscreen zoom tap prompt button */}
                    <button
                      type="button"
                      onClick={() => setFullScreenPhoto(currentPhoto)}
                      className="absolute bottom-2.5 right-2.5 p-2 rounded-xl bg-black/75 hover:bg-black/90 text-white backdrop-blur-md transition-colors shadow-md border border-white/25 min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
                      aria-label="View photo full screen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  /* Placeholder Keepsake Card */
                  <div
                    onClick={handleTriggerChangePhoto}
                    className="p-6 text-center flex flex-col items-center justify-center cursor-pointer group w-full h-full"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#3D1E24] text-[#E8CA94] flex items-center justify-center mb-3 shadow-inner group-hover:scale-105 transition-transform">
                      <Camera className="w-7 h-7" />
                    </div>
                    <span className="font-mono text-xs text-[#C7A56A] font-semibold tracking-wider uppercase mb-1">
                      {currentPhoto.placeholderLabel}
                    </span>
                    <span className="text-sm font-serif font-medium text-[#FFF9F4] max-w-[200px]">
                      {currentPhoto.category}
                    </span>
                    <span className="mt-3 text-[11px] text-[#E8D7C7]/70 underline">
                      Tap to select image
                    </span>
                  </div>
                )}
              </div>

              {/* Caption & Category below photo */}
              <div className="pt-4 text-center px-1">
                <span className="inline-block text-[11px] uppercase tracking-widest text-[#C7A56A] font-semibold mb-1">
                  {currentPhoto.category}
                </span>
                {currentPhoto.caption && (
                  <p className="text-sm font-serif italic text-[#5A2630] leading-snug">
                    "{currentPhoto.caption}"
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrow buttons */}
        <button
          type="button"
          id="photo-prev-button"
          onClick={handlePrev}
          aria-label="Previous photograph"
          className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#3D1E24]/80 text-[#FFF9F4] border border-[#C7A56A]/40 shadow-lg backdrop-blur-md flex items-center justify-center hover:bg-[#5A2630] transition-colors cursor-pointer min-h-[44px] min-w-[44px]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          type="button"
          id="photo-next-button"
          onClick={handleNext}
          aria-label="Next photograph"
          className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#3D1E24]/80 text-[#FFF9F4] border border-[#C7A56A]/40 shadow-lg backdrop-blur-md flex items-center justify-center hover:bg-[#5A2630] transition-colors cursor-pointer min-h-[44px] min-w-[44px]"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Action Footer */}
      <div className="pt-4 pb-safe space-y-3">
        {/* Subtle indicator dots */}
        <div className="flex items-center justify-center gap-1.5 overflow-x-auto py-1">
          {photos.slice(0, 15).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === currentIndex
                  ? 'w-6 bg-[#C7A56A]'
                  : 'w-1.5 bg-[#FFF9F4]/30 hover:bg-[#FFF9F4]/60'
              }`}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
          {photos.length > 15 && (
            <span className="text-[10px] text-[#E8D7C7]/50">...</span>
          )}
        </div>

        <button
          id="album-continue-button"
          type="button"
          onClick={onContinue}
          className="w-full py-4 px-6 rounded-2xl bg-[#5A2630] hover:bg-[#481B24] active:bg-[#38121A] text-[#FFF9F4] font-medium tracking-wide shadow-xl shadow-black/40 transition-all flex items-center justify-center gap-2 min-h-[48px] touch-manipulation cursor-pointer border border-[#C98F91]/30"
        >
          <span>Open Memory Cards ❤️</span>
          <Heart className="w-4 h-4 fill-[#FFF9F4]" />
        </button>
      </div>

      {/* Full screen modal preview */}
      <AnimatePresence>
        {fullScreenPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 flex flex-col items-center justify-center"
            onClick={() => setFullScreenPhoto(null)}
          >
            <button
              type="button"
              onClick={() => setFullScreenPhoto(null)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close photo preview"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={fullScreenPhoto.src}
              alt={fullScreenPhoto.caption || fullScreenPhoto.category}
              className="max-h-[80vh] max-w-full rounded-xl object-contain shadow-2xl"
            />
            {fullScreenPhoto.caption && (
              <p className="mt-4 text-center text-sm font-serif italic text-white/90 max-w-sm">
                "{fullScreenPhoto.caption}"
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
