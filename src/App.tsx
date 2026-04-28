import React from 'react';
import { useGameStore } from './store/gameStore';
import { HomeScreen } from './screens/HomeScreen';
import { GameScreen } from './screens/GameScreen';
import { EndScreen } from './screens/EndScreen';
import { LandingScreen } from './screens/LandingScreen';

function App() {
  const { isOnboarding, isPlaying, isFinished } = useGameStore();

  return (
    <main className="h-full w-full bg-zomato-bg max-w-lg mx-auto relative overflow-hidden">
      {isOnboarding ? (
        <LandingScreen />
      ) : isPlaying ? (
        <GameScreen />
      ) : isFinished ? (
        <EndScreen />
      ) : (
        <HomeScreen />
      )}
    </main>
  );
}

export default App;
