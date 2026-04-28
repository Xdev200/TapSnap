import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Trophy, ArrowRight, Home, RefreshCcw } from 'lucide-react';

export const EndScreen: React.FC = () => {
  const { lastSession, resetGame, startGame } = useGameStore();

  if (!lastSession) return null;

  const accuracyPercent = Math.round(lastSession.accuracy * 100);
  
  // Rating logic
  let rating = "Good";
  let ratingColor = "text-zomato-success";
  if (accuracyPercent >= 90) {
    rating = "Perfect!";
    ratingColor = "text-zomato-red";
  } else if (accuracyPercent < 70) {
    rating = "Try Again";
    ratingColor = "text-zomato-muted";
  }

  return (
    <div className="flex flex-col h-full bg-white/95 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="bg-zomato-tint p-6 rounded-full mb-6 relative">
           <Trophy size={64} className="text-zomato-red" />
           <div className="absolute inset-0 bg-zomato-red opacity-10 rounded-full animate-ping" />
        </div>

        <h1 className="text-zomato-dark text-3xl font-black mb-2">Level Complete</h1>
        <p className="text-zomato-muted font-medium mb-8">You've finished Level {lastSession.level}</p>

        <div className="zomato-card w-full p-8 mb-8 bg-zomato-surface border-none shadow-xl">
          <div className="flex justify-between mb-6">
            <div className="text-left">
              <div className="text-zomato-muted text-xs font-bold uppercase tracking-widest mb-1">Score</div>
              <div className="text-zomato-dark text-2xl font-black">{lastSession.score}</div>
            </div>
            <div className="text-right">
              <div className="text-zomato-muted text-xs font-bold uppercase tracking-widest mb-1">Perfects</div>
              <div className="text-zomato-red text-2xl font-black">{lastSession.perfects}</div>
            </div>
          </div>

          <div className="pt-6 border-t border-zomato-border flex flex-col items-center">
            <div className="text-zomato-muted text-xs font-bold uppercase tracking-widest mb-2">Accuracy</div>
            <div className={`text-5xl font-black ${ratingColor}`}>{accuracyPercent}%</div>
            <div className={`mt-2 font-bold uppercase tracking-tighter ${ratingColor}`}>{rating}</div>
          </div>
        </div>
      </div>

      <div className="p-8 grid grid-cols-2 gap-4">
        <button 
          onClick={resetGame}
          className="flex items-center justify-center gap-2 py-4 rounded-zomato-xl bg-white border border-zomato-border text-zomato-dark font-bold active:scale-95 transition-all"
        >
          <Home size={18} />
          HOME
        </button>
        <button 
          onClick={startGame}
          className="flex items-center justify-center gap-2 py-4 rounded-zomato-xl bg-zomato-red text-white font-bold shadow-lg shadow-zomato-red/20 active:scale-95 transition-all"
        >
          <ArrowRight size={18} />
          {lastSession.level === 5 ? 'PLAY AGAIN' : 'NEXT LEVEL'}
        </button>
      </div>
    </div>
  );
};
