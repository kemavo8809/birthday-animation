import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerIdsRef = useRef<number[]>([]);
  const loopTimeoutRef = useRef<number | null>(null);

  // Sweet music box notes for "Happy Birthday to you"
  // Notes in key of F major:
  // C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, Bb4 = 466.16, C5 = 523.25
  const MELODY: Array<{ note: number; duration: number }> = [
    // Happy (C4) Birth- (C4) -day (D4) to (C4) you (F4), (E4)
    { note: 261.63, duration: 0.35 },
    { note: 261.63, duration: 0.2 },
    { note: 293.66, duration: 0.55 },
    { note: 261.63, duration: 0.55 },
    { note: 349.23, duration: 0.55 },
    { note: 329.63, duration: 1.1 },

    // Happy (C4) Birth- (C4) -day (D4) to (C4) you (G4), (F4)
    { note: 261.63, duration: 0.35 },
    { note: 261.63, duration: 0.2 },
    { note: 293.66, duration: 0.55 },
    { note: 261.63, duration: 0.55 },
    { note: 392.00, duration: 0.55 },
    { note: 349.23, duration: 1.1 },

    // Happy (C4) Birth- (C4) -day (C5) dear (A4) Ma- (F4) -ria (E4) (D4)
    { note: 261.63, duration: 0.35 },
    { note: 261.63, duration: 0.2 },
    { note: 523.25, duration: 0.55 },
    { note: 440.00, duration: 0.55 },
    { note: 349.23, duration: 0.55 },
    { note: 329.63, duration: 0.55 },
    { note: 293.66, duration: 0.9 },

    // Happy (Bb4) Birth- (Bb4) -day (A4) to (F4) you (G4), (F4)
    { note: 466.16, duration: 0.35 },
    { note: 466.16, duration: 0.2 },
    { note: 440.00, duration: 0.55 },
    { note: 349.23, duration: 0.55 },
    { note: 392.00, duration: 0.55 },
    { note: 349.23, duration: 1.4 }
  ];

  const playMusicBoxChime = (freq: number, duration: number) => {
    if (!audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;

      // Primary sine tone for pure celesta/music-box sweetness
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();

      // Soft harmonic overtone for romantic chime texture
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now);

      // Delicate envelope
      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.exponentialRampToValueAtTime(0.045, now + 0.03);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(duration + 0.6, 1.2));

      gain2.gain.setValueAtTime(0.001, now);
      gain2.gain.exponentialRampToValueAtTime(0.015, now + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + Math.max(duration + 0.7, 1.3));

      osc2.start(now);
      osc2.stop(now + 0.7);
    } catch {
      // AudioContext fallback
    }
  };

  const scheduleMelodyLoop = () => {
    // Clear any previous scheduled timeouts
    timerIdsRef.current.forEach(id => clearTimeout(id));
    timerIdsRef.current = [];

    let accumulatedDelay = 0;
    MELODY.forEach((step) => {
      const id = window.setTimeout(() => {
        playMusicBoxChime(step.note, step.duration);
      }, accumulatedDelay * 1000);
      timerIdsRef.current.push(id);
      accumulatedDelay += step.duration + 0.12;
    });

    // Loop after song finishes + pleasant pause
    const totalDurationMs = (accumulatedDelay + 2.5) * 1000;
    loopTimeoutRef.current = window.setTimeout(() => {
      scheduleMelodyLoop();
    }, totalDurationMs);
  };

  const stopMusic = () => {
    timerIdsRef.current.forEach(id => clearTimeout(id));
    timerIdsRef.current = [];
    if (loopTimeoutRef.current) {
      clearTimeout(loopTimeoutRef.current);
      loopTimeoutRef.current = null;
    }
  };

  const toggleAudio = () => {
    if (!isPlaying) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      setIsPlaying(true);
      scheduleMelodyLoop();
    } else {
      stopMusic();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      stopMusic();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      id="audio-toggle-button"
      type="button"
      onClick={toggleAudio}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border backdrop-blur-md shadow-md min-h-[44px] min-w-[44px] cursor-pointer ${
        isPlaying
          ? 'bg-[#C7A56A]/25 border-[#C7A56A]/70 text-[#E8CA94]'
          : 'bg-[#2A1017]/70 border-[#C98F91]/30 text-[#E8D7C7]/70 hover:text-[#FFF9F4]'
      }`}
      aria-label={isPlaying ? 'Pause birthday tune' : 'Play soft birthday tune'}
    >
      <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-bounce text-[#E8CA94]' : ''}`} />
      <span className="font-serif tracking-wide hidden sm:inline">
        {isPlaying ? 'Birthday Melody' : 'Play Music'}
      </span>
      {isPlaying ? (
        <Volume2 className="w-3.5 h-3.5 text-[#E8CA94]" />
      ) : (
        <VolumeX className="w-3.5 h-3.5 text-[#E8D7C7]/50" />
      )}
    </button>
  );
};
