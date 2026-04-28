import { create } from 'zustand';
import { gameplayService } from '../services/gameplayService';

interface GameSessionResult {
  score: number;
  accuracy: number;
  perfects: number;
  level: number;
}

interface GameState {
  isOnboarding: boolean;
  isPlaying: boolean;
  isFinished: boolean;
  currentLevel: number;
  unlockedLevels: number[];
  score: number;
  accuracy: number;
  perfects: number;
  streak: number;
  history: Array<{ score: number; accuracy: number; date: string }>;
  lastSession: GameSessionResult | null;
  
  startGame: () => void;
  selectLevel: (level: number) => void;
  updateStats: (score: number, accuracy: number, isPerfect: boolean) => void;
  finishSession: () => void;
  resetGame: () => void;
  finishOnboarding: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  isOnboarding: true,
  isPlaying: false,
  isFinished: false,
  currentLevel: 1,
  unlockedLevels: [1],
  score: 0,
  accuracy: 0,
  perfects: 0,
  streak: 0,
  history: [],
  lastSession: null,

  finishOnboarding: () => set({ isOnboarding: false }),

  startGame: () => set((state) => {
    const isNextLevel = state.isFinished && state.lastSession && state.lastSession.perfects > 0;
    const nextLevel = isNextLevel ? Math.min(5, state.currentLevel + 1) : state.currentLevel;
    
    return { 
      isPlaying: true, 
      isFinished: false, 
      currentLevel: nextLevel,
      score: 0, 
      accuracy: 0, 
      perfects: 0 
    };
  }),

  selectLevel: (level) => set({ currentLevel: level }),
  
  updateStats: (score, accuracy, isPerfect) => set((state) => ({
    score: state.score + score,
    accuracy: (state.accuracy + accuracy) / 2,
    perfects: isPerfect ? state.perfects + 1 : state.perfects,
    streak: isPerfect ? state.streak + 1 : 0,
  })),

  finishSession: () => set((state) => {
    const nextLevel = Math.min(5, state.currentLevel + 1);
    const shouldUnlockNext = !state.unlockedLevels.includes(nextLevel);
    
    gameplayService.saveResult(state.score, state.accuracy, state.currentLevel);

    return {
      isPlaying: true, // We auto-progress now instead of finishing the session and showing EndScreen
      isFinished: false,
      currentLevel: state.currentLevel < 5 ? state.currentLevel + 1 : 1, // Loop back or something? Auto progress.
      unlockedLevels: shouldUnlockNext 
        ? [...state.unlockedLevels, nextLevel].sort((a, b) => a - b)
        : state.unlockedLevels,
      lastSession: {
        score: state.score,
        accuracy: state.accuracy,
        perfects: state.perfects,
        level: state.currentLevel,
      },
      history: [...state.history, { 
        score: state.score, 
        accuracy: state.accuracy, 
        date: new Date().toISOString() 
      }],
      score: 0,
      accuracy: 0,
      perfects: 0
    };
  }),

  resetGame: () => set({ 
    isPlaying: false, 
    isFinished: false, 
    score: 0, 
    accuracy: 0, 
    perfects: 0, 
    streak: 0 
  }),
}));
