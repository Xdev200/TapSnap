import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { useGameLoop } from '../hooks/useGameLoop';
import { ChevronLeft, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

const LEVEL_DATA: Record<number, { name: string; emoji: string; difficulty: number }> = {
  1: { name: "Sports Gear", emoji: "🏈", difficulty: 1 },
  2: { name: "Gadgets", emoji: "📷", difficulty: 1.2 },
  3: { name: "Fashion", emoji: "👟", difficulty: 1.5 },
  4: { name: "Music", emoji: "🎧", difficulty: 1.8 },
  5: { name: "Time", emoji: "⌚", difficulty: 2.2 },
};

export const GameScreen: React.FC = () => {
  const { isPlaying, resetGame, updateStats, finishSession, currentLevel, score } = useGameStore();
  const [verticalPosition, setVerticalPosition] = useState(-20); // Start off-screen
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [levelSetup, setLevelSetup] = useState<{ options: number[], correctIndex: number, correctRotation: number } | null>(null);
  const [restartCounter, setRestartCounter] = useState(0);
  
  const [feedback, setFeedback] = useState<string | null>(null);
  const [screenshotFlash, setScreenshotFlash] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [penaltyTime, setPenaltyTime] = useState(0);
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const levelInfo = LEVEL_DATA[currentLevel] || LEVEL_DATA[1];
  const SPEED = 0.15 + (levelInfo.difficulty * 0.04);
  const TARGET_POS_VH = 75; // Silhouette is at 75vh
  const ITEM_WIDTH = 128;
  const GAP = 24;
  const SPACING = ITEM_WIDTH + GAP;

  // Setup Level
  useEffect(() => {
    const rotations = [0, 90, 180, 270];
    const shuffled = [...rotations].sort(() => Math.random() - 0.5);
    const correctIndex = Math.floor(Math.random() * 4);
    setLevelSetup({
      options: shuffled,
      correctIndex,
      correctRotation: shuffled[correctIndex]
    });
    setSelectedIndex(correctIndex === 0 ? 1 : 0); // Start off-target so they have to swipe
    setVerticalPosition(-20); // Start off-screen above
    setIsPaused(false);
    setFeedback(null);
  }, [currentLevel, restartCounter]);

  useGameLoop((time, delta) => {
    if (!isPlaying || isPaused || feedback) return;
    
    setVerticalPosition((prev) => {
      let next = prev + SPEED;
      
      // Missed it completely by letting it fall too far
      if (next > TARGET_POS_VH + 12) {
        handleMiss();
        return prev;
      }
      return next;
    });
  }, isPlaying && !isPaused && !feedback);

  const clearPenaltyTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const restartLevel = useCallback(() => {
    clearPenaltyTimer();
    setPenaltyTime(0);
    setIsPaused(false);
    setFeedback(null);
    setVerticalPosition(-20);
    setRestartCounter(c => c + 1);
  }, []);

  const handleMiss = useCallback(() => {
    if (timerRef.current) return;

    setIsPaused(true);
    setFeedback("MISS");
    setPenaltyTime(5);
    
    timerRef.current = setInterval(() => {
      setPenaltyTime(p => {
         if (p <= 1) {
           clearPenaltyTimer();
           restartLevel();
           return 0;
         }
         return p - 1;
      });
    }, 1000);
  }, [restartLevel]);

  const handleTap = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (!isPlaying || isPaused || feedback) return;
    
    const verticalDiff = Math.abs(verticalPosition - TARGET_POS_VH);
    const isCorrectObject = selectedIndex === levelSetup?.correctIndex;

    if (verticalDiff <= 8 && isCorrectObject) {
      // Perfect match!
      setVerticalPosition(TARGET_POS_VH); // Snap perfectly into place
      setFeedback("PERFECT");
      setScreenshotFlash(true);
      setIsPaused(true);
      
      confetti({
        particleCount: 80,
        spread: 70,
        colors: ['#e23744', '#ffffff', '#48c479', '#ffcc00'],
        origin: { y: 0.7 }
      });
      
      const earnedScore = 100 - Math.min(restartCounter * 10, 50);
      updateStats(earnedScore, 1, true);
      
      setTimeout(() => {
        finishSession();
        setScreenshotFlash(false);
        setFeedback(null);
        setRestartCounter(0);
      }, 2500);
    } else {
      // Missed timing or wrong object
      handleMiss();
    }
  }, [isPlaying, isPaused, feedback, verticalPosition, selectedIndex, levelSetup, updateStats, finishSession, handleMiss]);

  // Gestures for scrolling
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentTouch = e.targetTouches[0].clientX;
    const diff = touchStart - currentTouch;

    if (diff > 40) {
      // Swipe left
      setSelectedIndex(prev => Math.min((levelSetup?.options.length || 1) - 1, prev + 1));
      setTouchStart(null);
    } else if (diff < -40) {
      // Swipe right
      setSelectedIndex(prev => Math.max(0, prev - 1));
      setTouchStart(null);
    }
  };
  
  const onTouchEnd = () => {
    setTouchStart(null);
  };

  useEffect(() => {
    return () => clearPenaltyTimer();
  }, []);

  return (
    <div 
      className={`absolute inset-0 bg-zomato-bg touch-none overflow-hidden select-none`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onClick={handleTap}
    >
      {/* Screenshot flash overlay */}
      <div className={`absolute inset-0 bg-white z-[60] pointer-events-none transition-opacity duration-300 ${screenshotFlash ? 'opacity-100' : 'opacity-0'}`} />

      {/* Header */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center p-6 pt-12 md:pt-16 z-30 bg-gradient-to-b from-white/90 to-transparent pb-10 pointer-events-auto">
        <button onClick={(e) => { e.stopPropagation(); resetGame(); }} className="p-3 -ml-3 text-zomato-dark active:scale-90 transition-transform bg-white/50 rounded-full shadow-sm hover:bg-white/80 backdrop-blur-sm">
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-zomato-muted text-[10px] uppercase font-bold tracking-widest bg-white/60 px-2 py-0.5 rounded-full mb-1">Level {currentLevel}</span>
          <span className="text-zomato-dark font-extrabold text-xl tracking-tight">SCORE: {score}</span>
        </div>
        <button onClick={(e) => { e.stopPropagation(); restartLevel(); }} className="p-3 -mr-3 text-zomato-muted active:rotate-180 transition-transform bg-white/50 rounded-full shadow-sm hover:bg-white/80 backdrop-blur-sm">
          <RotateCcw size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* Fixed Target Silhouette at Bottom */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 w-[128px] h-[128px] border-4 border-zomato-red/30 rounded-3xl flex items-center justify-center bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-10"
        style={{ top: `${TARGET_POS_VH}vh` }}
      >
        {levelSetup && (
          <span 
            className="text-7xl opacity-20 filter grayscale drop-shadow-sm transition-transform duration-300"
            style={{ transform: `rotate(${levelSetup.correctRotation}deg)` }}
          >
            {levelInfo.emoji}
          </span>
        )}
      </div>

      {/* Falling Row */}
      <div 
        className="absolute top-0 left-0 w-full h-[128px] z-20 pointer-events-none transition-transform duration-75 ease-linear"
        style={{ transform: `translateY(${verticalPosition}vh)` }}
      >
         <div 
           className="absolute top-0 flex items-center gap-6 h-full transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]" 
           style={{ left: `calc(50vw - ${selectedIndex * SPACING + (ITEM_WIDTH/2)}px)` }}
         >
             {levelSetup?.options.map((rot, i) => {
               const isCentered = selectedIndex === i;
               return (
                 <div 
                   key={i} 
                   className={`w-[128px] h-[128px] flex items-center justify-center shrink-0 transition-all duration-300
                     ${isCentered 
                       ? 'scale-100 z-30 drop-shadow-[0_10px_25px_rgba(226,55,68,0.5)]' 
                       : 'scale-75 opacity-40 z-20 drop-shadow-sm'}`
                   }
                 >
                    <span className="text-7xl" style={{ transform: `rotate(${rot}deg)` }}>
                       {levelInfo.emoji}
                    </span>
                 </div>
               );
             })}
         </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-[20vh] left-0 w-full flex justify-center pointer-events-none animate-in fade-in slide-in-from-top-4 duration-1000 z-30 px-6">
         <div className="bg-white/95 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-zomato-border text-center">
           <p className="text-zomato-dark text-sm font-bold opacity-90">
             Swipe <span className="opacity-60 text-xs px-1">↔</span> to rotate &amp; Tap to lock!
           </p>
         </div>
      </div>

      {/* Penalty Modal */}
      {penaltyTime > 0 && (
        <div className="absolute inset-0 bg-zomato-dark/90 backdrop-blur-lg flex flex-col items-center justify-center z-[100] animate-in fade-in duration-200 pointer-events-auto px-6">
          <div className="bg-white p-8 rounded-[2rem] flex flex-col items-center w-full max-w-[320px] text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
            <h2 className="text-3xl font-black text-zomato-dark mb-2">Missed!</h2>
            <p className="text-zomato-muted mb-8 text-base font-medium">Wrong object or timing.</p>
            
            <div className="text-zomato-red text-8xl mb-10 font-black tabular-nums tracking-tighter drop-shadow-sm">
              {penaltyTime}
            </div>
            
            <button 
              onClick={(e) => { e.stopPropagation(); restartLevel(); }}
              className="w-full py-4 rounded-xl bg-zomato-red text-white font-extrabold text-lg tracking-wide active:scale-95 transition-all shadow-[0_8px_20px_rgba(226,55,68,0.3)]"
            >
              RETRY NOW
            </button>
          </div>
        </div>
      )}

      {/* Level Completed Overlay */}
      {feedback === "PERFECT" && (
        <div className="absolute inset-0 bg-white/90 z-[70] flex flex-col items-center justify-center animate-in zoom-in duration-300 pointer-events-auto">
           <h2 className="text-4xl font-black text-zomato-dark mb-4 drop-shadow-sm">LEVEL {currentLevel} CLEARED!</h2>
           <p className="text-2xl font-bold text-zomato-red">Score: +{100 - Math.min(restartCounter * 10, 50)}</p>
           {restartCounter > 0 && (
             <p className="text-sm font-semibold text-zomato-muted mt-2">({Math.min(restartCounter * 10, 50)}% retry penalty)</p>
           )}
        </div>
      )}
    </div>
  );
};

