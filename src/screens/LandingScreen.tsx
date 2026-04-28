import React from 'react';
import { useGameStore } from '../store/gameStore';
import { MousePointerClick, Hand, Play, Goal } from 'lucide-react';

export const LandingScreen: React.FC = () => {
  const { finishOnboarding } = useGameStore();

  return (
    <div className="flex flex-col h-full bg-zomato-bg overflow-y-auto">
      {/* Hero Section */}
      <div className="bg-zomato-red p-8 pt-16 pb-20 rounded-b-[40px] shadow-lg relative overflow-hidden shrink-0">
        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-[-20px] left-[-30px] w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6 animate-bounce">
            <span className="text-4xl">👆</span>
          </div>
          <h1 className="text-white text-5xl font-black tracking-tight mb-2 drop-shadow-md">TapSnap</h1>
          <p className="text-white/90 text-lg font-medium">A minimalist reflex challenge</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col px-6 mt-[-30px] relative z-20 pb-32">
        <div className="bg-white rounded-3xl shadow-xl border border-zomato-border p-6 mb-8">
          <h2 className="text-zomato-dark text-xl font-bold mb-6 text-center">How to Play</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-zomato-tint flex items-center justify-center shrink-0">
                <Hand className="text-zomato-red" size={24} />
              </div>
              <div>
                <h3 className="text-zomato-dark font-bold text-base mb-1">1. Swipe to Rotate</h3>
                <p className="text-zomato-muted text-sm leading-relaxed">As objects fall from the top, swipe left or right to switch through the shapes to find the right one.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-zomato-tint flex items-center justify-center shrink-0">
                <Goal className="text-zomato-red" size={24} />
              </div>
              <div>
                <h3 className="text-zomato-dark font-bold text-base mb-1">2. Align Perfectly</h3>
                <p className="text-zomato-muted text-sm leading-relaxed">Wait for the falling object to align with the silhouette at the bottom of the screen.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-zomato-tint flex items-center justify-center shrink-0">
                <MousePointerClick className="text-zomato-red" size={24} />
              </div>
              <div>
                <h3 className="text-zomato-dark font-bold text-base mb-1">3. Snap to Lock</h3>
                <p className="text-zomato-muted text-sm leading-relaxed">Tap the screen anywhere at the exact right moment to lock it in and clear the level!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/95 to-transparent pt-12 z-50 pointer-events-none">
        <div className="max-w-lg mx-auto pointer-events-auto">
          <button 
            onClick={finishOnboarding}
            className="w-full bg-zomato-red text-white py-4 rounded-2xl font-black text-xl shadow-[0_10px_25px_rgba(226,55,68,0.4)] active:scale-95 transition-all flex items-center justify-center gap-3 animate-pulse-red"
          >
            <Play fill="currentColor" size={24} />
            GET STARTED
          </button>
        </div>
      </div>
    </div>
  );
};
