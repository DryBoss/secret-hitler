import React from "react";

import skullIcon from "./../assets/player-icon-hitler.png"; // <-- Import the image as a variable

// Tiny helper component to render a perfect 5-pointed star SVG
const Star = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export function MainMenu({ onNewGame }) {
  return (
    <div className="relative min-h-screen bg-game-bg text-white font-sans overflow-hidden flex flex-col justify-between selection:bg-game-primary/40">
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Star className="absolute top-16 left-12 w-3 h-3 text-slate-200/50" />
        <Star className="absolute top-24 left-1/4 w-4 h-4 text-slate-200/40" />
        <Star className="absolute top-12 right-1/3 w-2.5 h-2.5 text-slate-200/60" />
        <Star className="absolute top-32 right-16 w-3 h-3 text-slate-200/50" />
        <Star className="absolute top-48 left-8 w-3 h-3 text-slate-200/30" />
        <Star className="absolute top-40 right-8 w-3 h-3 text-slate-200/40" />
      </div>

      {/* 3-Layer Blocky City Skyline */}
      <div className="absolute bottom-0 left-0 w-full h-48 z-0 pointer-events-none flex flex-col justify-end">
        {/* Back City Layer */}
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full h-auto text-game-surface"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,320 V120 H60 V80 H120 V150 H180 V90 H240 V170 H300 V110 H360 V60 H420 V130 H480 V90 H540 V160 H600 V100 H660 V140 H720 V70 H780 V120 H840 V80 H900 V150 H960 V100 H1020 V160 H1080 V90 H1140 V130 H1200 V110 H1260 V140 H1320 V90 H1380 V120 H1440 V320 Z"></path>
        </svg>
        {/* Mid City Layer */}
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full h-auto text-game-surface-hover"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,320 V200 H60 V160 H120 V220 H180 V180 H240 V240 H300 V170 H360 V210 H420 V150 H480 V230 H540 V190 H600 V250 H660 V180 H720 V220 H780 V160 H840 V200 H900 V170 H960 V230 H1020 V190 H1080 V240 H1140 V180 H1200 V210 H1260 V160 H1320 V220 H1380 V180 H1440 V320 Z"></path>
        </svg>
        {/* Front City Layer */}
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full h-auto text-game-surface-border"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,320 V260 H60 V240 H120 V280 H180 V250 H240 V290 H300 V260 H360 V230 H420 V270 H480 V250 H540 V290 H600 V260 H660 V240 H720 V280 H780 V250 H840 V270 H900 V240 H960 V280 H1020 V250 H1080 V290 H1140 V260 H1200 V230 H1260 V270 H1320 V250 H1380 V280 H1440 V320 Z"></path>
        </svg>
      </div>

      {/* --- FOREGROUND CONTENT --- */}
      <div className="relative z-10 w-full flex justify-end p-4">
        <button className="p-2 text-slate-200 hover:text-white transition-colors cursor-pointer active:scale-95">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="relative z-10 flex flex-col items-center flex-grow justify-center -mt-16 space-y-8">
        {/* Skull Graphic Element */}
        <div className="w-40 h-40 flex items-center justify-center mb-4">
          <img
            src={skullIcon} // <-- Use the imported variable without quotes
            alt="Secret Identity Logo"
            className="w-40 h-40 object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.4)]"
          />
        </div>

        <div className="w-full max-w-[280px] flex flex-col gap-4">
          <button
            onClick={() => onNewGame({ mode: "NEW_GAME" })}
            className="w-full flex items-center justify-center gap-2 bg-game-primary hover:bg-game-primary-hover text-white font-bold text-lg tracking-wide uppercase px-6 py-3.5 rounded-sm border-b-[4px] border-game-primary-border active:border-b-0 active:translate-y-[4px] transition-all"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
            </svg>
            New Game
          </button>

          <button className="w-full flex items-center justify-center gap-2 bg-game-surface hover:bg-game-surface-hover text-slate-100 font-bold text-lg tracking-wide uppercase px-6 py-3.5 rounded-sm border-b-[4px] border-game-surface-border active:border-b-0 active:translate-y-[4px] transition-all shadow-md">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
            Players Library
          </button>
        </div>

        <div className="flex justify-center pt-2">
          <a
            href="https://github.com/your-username/your-repo-name"
            title="Source Code on GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-game-surface hover:bg-game-primary text-white rounded-full flex items-center justify-center transition-colors shadow-md cursor-pointer"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"
              />
            </svg>
          </a>
        </div>
      </div>

      <div className="relative z-10 w-full text-center pb-8">
        <p className="text-sm font-medium text-slate-200 tracking-wide mb-1">
          Thanks for playing Secret Hitler
        </p>
        <span className="text-game-primary text-xl">♥</span>
      </div>
    </div>
  );
}
