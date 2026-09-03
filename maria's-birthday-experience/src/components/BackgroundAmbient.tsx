import React from 'react';

export const BackgroundAmbient: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Deep romantic gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#220D12] via-[#2A1017] to-[#1A0A0E]" />

      {/* Warm soft glowing orbs */}
      <div 
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#C98F91] opacity-20 blur-3xl animate-subtle-glow"
        style={{ animationDuration: '8s' }}
      />
      <div 
        className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-[#C7A56A] opacity-15 blur-3xl animate-subtle-glow"
        style={{ animationDuration: '10s', animationDelay: '2s' }}
      />
      <div 
        className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-[#5A2630] opacity-35 blur-3xl animate-subtle-glow"
        style={{ animationDuration: '12s', animationDelay: '4s' }}
      />

      {/* Subtle floating birthday balloons in background */}
      <div className="absolute inset-0 opacity-15 overflow-hidden">
        {/* Balloon 1: Soft rose */}
        <div 
          className="absolute bottom-[-60px] left-[10%] w-10 h-13 rounded-full bg-[#C98F91] blur-[1px] animate-bounce"
          style={{ animationDuration: '7s' }}
        >
          <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0.5 h-6 bg-[#C98F91]/50" />
        </div>
        {/* Balloon 2: Soft gold */}
        <div 
          className="absolute bottom-[-90px] right-[12%] w-12 h-15 rounded-full bg-[#C7A56A] blur-[1px] animate-bounce"
          style={{ animationDuration: '9s', animationDelay: '1.5s' }}
        >
          <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0.5 h-7 bg-[#C7A56A]/50" />
        </div>
        {/* Balloon 3: Warm ivory */}
        <div 
          className="absolute top-[20%] right-[6%] w-8 h-10 rounded-full bg-[#F6E6E5] blur-[1px] animate-pulse"
          style={{ animationDuration: '6s' }}
        >
          <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-0.5 h-5 bg-[#F6E6E5]/40" />
        </div>
      </div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_center,_transparent_50%,_rgba(15,5,8,0.7)_100%]" />

      {/* Tiny floating fairy-light sparkles */}
      <div className="absolute inset-0 opacity-30 mix-blend-screen">
        <span className="absolute top-[15%] left-[20%] w-1.5 h-1.5 rounded-full bg-[#E8CA94] blur-[0.5px] animate-pulse" style={{ animationDuration: '3s' }} />
        <span className="absolute top-[35%] left-[80%] w-2 h-2 rounded-full bg-[#F6E6E5] blur-[0.5px] animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '1s' }} />
        <span className="absolute top-[65%] left-[15%] w-1.5 h-1.5 rounded-full bg-[#C7A56A] blur-[0.5px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        <span className="absolute top-[80%] left-[75%] w-2 h-2 rounded-full bg-[#C98F91] blur-[0.5px] animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
        <span className="absolute top-[48%] left-[45%] w-1 h-1 rounded-full bg-[#FFF9F4] blur-[0.5px] animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '1.5s' }} />
      </div>
    </div>
  );
};
