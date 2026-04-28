import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Play, Trophy, Activity, Zap } from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const { startGame, history, streak, currentLevel, selectLevel, unlockedLevels } = useGameStore();
  const bestScore = history.length > 0 ? Math.max(...history.map(h => h.score)) : 0;

  return (
    <div className="flex flex-col h-full bg-zomato-bg">
      {/* Hero Section */}
      <div className="bg-zomato-red p-8 pt-12 rounded-b-[40px] shadow-lg">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-white text-3xl font-extrabold tracking-tight">TapSnap</h1>
            <p className="text-white/80 text-sm mt-1">Master the timing</p>
          </div>
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
            <Zap className="text-white" size={24} />
          </div>
        </div>
        
        {/* Stats Card Overlay */}
        <div className="zomato-card transform translate-y-8 flex justify-around items-center border-none shadow-xl bg-white">
          <div className="text-center">
            <div className="text-zomato-muted text-[10px] uppercase font-bold tracking-wider mb-1">Rank</div>
            <div className="text-zomato-dark font-extrabold text-lg">Quick Bite</div>
          </div>
          <div className="w-px h-8 bg-zomato-border" />
          <div className="text-center">
            <div className="text-zomato-muted text-[10px] uppercase font-bold tracking-wider mb-1">Personal Best</div>
            <div className="text-zomato-dark font-extrabold text-lg">{bestScore}</div>
          </div>
          <div className="w-px h-8 bg-zomato-border" />
          <div className="text-center">
            <div className="text-zomato-muted text-[10px] uppercase font-bold tracking-wider mb-1">Streak</div>
            <div className="text-zomato-red font-extrabold text-lg">{streak}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 mt-12 px-6 overflow-y-auto pb-24">
        <div className="flex items-center gap-2 mb-4 mt-4">
          <Activity size={18} className="text-zomato-red" />
          <h2 className="text-zomato-dark font-bold text-lg">Daily Records</h2>
        </div>
        
        <div className="zomato-card mb-6 py-6 bg-zomato-tint border-none">
          <div className="flex justify-between items-center px-2">
            <div>
              <div className="text-zomato-dark font-bold text-xl">Highest Score: {bestScore}</div>
              <p className="text-zomato-muted text-xs mt-1">Keep playing to beat it!</p>
            </div>
            <Trophy className="text-zomato-red opacity-20" size={48} />
          </div>
        </div>

        <h2 className="text-zomato-dark font-bold text-lg mb-4">Level Selection</h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 -mx-1 px-1">
          {[1, 2, 3, 4, 5].map((lvl) => {
            const isUnlocked = unlockedLevels.includes(lvl);
            const isActive = currentLevel === lvl;
            
            return (
              <button 
                key={lvl}
                disabled={!isUnlocked}
                onClick={() => selectLevel(lvl)}
                className={`flex-none w-20 h-10 rounded-full font-bold text-sm transition-all active:scale-95 ${
                  isActive 
                    ? 'bg-zomato-red text-white shadow-md shadow-zomato-red/30 scale-105' 
                    : isUnlocked 
                      ? 'bg-white border border-zomato-border text-zomato-dark'
                      : 'bg-zomato-surface border border-zomato-border/50 text-zomato-muted opacity-50 cursor-not-allowed'
                }`}
              >
                Lvl {lvl}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-zomato-border">
        <button 
          onClick={startGame}
          className="btn-primary w-full flex items-center justify-center gap-3 py-4 text-lg shadow-xl shadow-zomato-red/20"
        >
          <Play size={20} fill="currentColor" />
          PLAY NOW
        </button>
      </div>
    </div>
  );
};
