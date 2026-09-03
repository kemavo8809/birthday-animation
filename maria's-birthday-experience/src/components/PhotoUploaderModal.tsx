import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { X, Upload, Camera, CheckCircle2, RefreshCw } from 'lucide-react';
import { PhotoItem } from '../types.ts';

interface PhotoUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: PhotoItem[];
  onUpdatePhoto: (id: string, newSrc: string) => void;
  onResetPhotos: () => void;
}

export const PhotoUploaderModal: React.FC<PhotoUploaderModalProps> = ({
  isOpen,
  onClose,
  photos,
  onUpdatePhoto,
  onResetPhotos
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const targetPhotoIdRef = useRef<string | null>(null);

  if (!isOpen) return null;

  const handleSelectFileForPhoto = (photoId: string) => {
    targetPhotoIdRef.current = photoId;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && targetPhotoIdRef.current) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result && targetPhotoIdRef.current) {
          onUpdatePhoto(targetPhotoIdRef.current, result);
        }
      };
      reader.readAsDataURL(file);
    }
    // Reset file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const filledCount = photos.filter(p => !!p.src).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-[#FFF9F4] text-[#3D1E24] rounded-3xl shadow-2xl border border-[#E8D7C7] flex flex-col max-h-[88vh] overflow-hidden"
      >
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* Modal Header */}
        <div className="p-5 border-b border-[#E8D7C7] flex items-center justify-between bg-[#FDF4EE]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#5A2630] text-[#E8CA94] flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#3D1E24]">
                Personal Photo Manager
              </h3>
              <p className="text-xs text-[#73404B]">
                {filledCount} of {photos.length} photos added
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#E8D7C7] text-[#5A2630] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Instructions */}
        <div className="px-5 py-3 bg-[#F6E6E5]/40 border-b border-[#E8D7C7] text-xs text-[#5A2630] leading-relaxed">
          <p className="font-semibold text-[#8F3E4D] mb-0.5">
            SQUARE PHOTO KEEPSAKES
          </p>
          <p>
            All images are displayed in a balanced 1:1 square format. Once an image is added, tap <span className="font-medium text-[#8F3E4D]">Change Image</span> at any time to replace it.
          </p>
        </div>

        {/* Photos list */}
        <div className="p-4 overflow-y-auto space-y-2.5 flex-1 no-scrollbar">
          {photos.map((item) => {
            const hasPhoto = !!item.src;
            return (
              <div
                key={item.id}
                className={`p-3 rounded-2xl border flex items-center justify-between gap-3 transition-colors ${
                  hasPhoto
                    ? 'bg-[#F6E6E5]/30 border-[#C7A56A]/50'
                    : 'bg-white border-[#E8D7C7] hover:border-[#C98F91]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Photo thumbnail strictly square */}
                  <div className="w-12 h-12 rounded-xl bg-[#2A1017] border border-[#E8D7C7] overflow-hidden shrink-0 flex items-center justify-center aspect-square">
                    {hasPhoto ? (
                      <img
                        src={item.src}
                        alt={item.category}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera className="w-5 h-5 text-[#C7A56A]" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] font-bold text-[#8F3E4D] uppercase">
                        {item.placeholderLabel}
                      </span>
                      {hasPhoto && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                    </div>
                    <p className="text-sm font-medium text-[#3D1E24] truncate">
                      {item.category}
                    </p>
                    <p className="text-[11px] text-[#73404B]/80 truncate">
                      {item.caption}
                    </p>
                  </div>
                </div>

                {hasPhoto ? (
                  <button
                    type="button"
                    onClick={() => handleSelectFileForPhoto(item.id)}
                    className="px-3.5 py-2 rounded-xl text-xs font-medium shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer min-h-[44px] bg-[#FFF9F4] text-[#5A2630] border border-[#C7A56A]/60 hover:bg-[#F6E6E5]"
                    title="Change Image"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#C7A56A]" />
                    <span>Change Image</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSelectFileForPhoto(item.id)}
                    className="px-3.5 py-2 rounded-xl text-xs font-medium shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer min-h-[44px] bg-[#5A2630] text-[#FFF9F4] hover:bg-[#481B24]"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Select Image</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E8D7C7] bg-[#FDF4EE] flex items-center justify-between gap-3">
          {filledCount > 0 ? (
            <button
              type="button"
              onClick={onResetPhotos}
              className="text-xs text-[#8F3E4D] hover:underline flex items-center gap-1 cursor-pointer min-h-[44px] px-2"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset to placeholders</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-6 rounded-xl bg-[#5A2630] text-[#FFF9F4] text-xs font-semibold hover:bg-[#481B24] transition-colors cursor-pointer min-h-[44px]"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
};
