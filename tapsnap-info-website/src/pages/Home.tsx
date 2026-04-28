import React from 'react';
import { Target, Hand, Maximize, Smartphone } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-zomato-bg pb-20">
      {/* Hero Section */}
      <section className="bg-zomato-red text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-8 animate-bounce">
            <span className="text-5xl">👆</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight drop-shadow-md">
            Master the Timing
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mb-12 font-medium">
            TapSnap is a fast-paced, highly addictive minimalist reflex challenge. Swipe, match, and snap your way to the highest score.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#how-to-play" className="bg-white text-zomato-red px-8 py-4 rounded-xl font-black text-lg hover:bg-zomato-surface transition-all shadow-lg active:scale-95">
              Learn How to Play
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-black mb-12">The Ultimate Reflex Test</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-zomato-border/50 text-left hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-zomato-tint rounded-2xl flex items-center justify-center mb-6">
              <Smartphone className="text-zomato-red" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Minimalist Experience</h3>
            <p className="text-zomato-muted leading-relaxed">
              No clutter, no distractions. TapSnap is built on a clean aesthetic focusing purely on mechanics and response time.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-zomato-border/50 text-left hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-zomato-tint rounded-2xl flex items-center justify-center mb-6">
              <Target className="text-zomato-red" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Dynamic Progression</h3>
            <p className="text-zomato-muted leading-relaxed">
              Unlock new levels progressively. As you advance, the speed increases and the shapes become more challenging to match.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-zomato-border/50 text-left hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-zomato-tint rounded-2xl flex items-center justify-center mb-6">
              <Maximize className="text-zomato-red" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Endless Replayability</h3>
            <p className="text-zomato-muted leading-relaxed">
              Compete against yourself. Track your highest score and your consecutive streak to challenge your limits.
            </p>
          </div>
        </div>
      </section>

      {/* How to Play */}
      <section id="how-to-play" className="bg-zomato-surface py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-16 text-center">How to Play</h2>
          
          <div className="space-y-12">
             <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-3xl shadow-sm border border-zomato-border/50">
               <div className="w-20 h-20 bg-zomato-tint rounded-full flex items-center justify-center shrink-0">
                 <Hand className="text-zomato-red" size={32} />
               </div>
               <div>
                 <h3 className="text-2xl font-bold mb-2">Step 1: Swipe to Rotate</h3>
                 <p className="text-zomato-muted text-lg">Objects will constantly fall down the screen. Use a left or right swipe gesture to cycle through different variations or rotations of the object.</p>
               </div>
             </div>

             <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-3xl shadow-sm border border-zomato-border/50">
               <div className="w-20 h-20 bg-zomato-tint rounded-full flex items-center justify-center shrink-0">
                 <Target className="text-zomato-red" size={32} />
               </div>
               <div>
                 <h3 className="text-2xl font-bold mb-2">Step 2: Find the Silhouette</h3>
                 <p className="text-zomato-muted text-lg">At the bottom of your screen, there is an unmoving, faded target silhouette. You must ensure the selected falling object perfectly matches this target.</p>
               </div>
             </div>

             <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-3xl shadow-sm border border-zomato-border/50">
               <div className="w-20 h-20 bg-zomato-tint rounded-full flex items-center justify-center shrink-0">
                 <span className="text-3xl font-black text-zomato-red border-4 border-zomato-red rounded-xl p-1 px-4 text-center">TAP</span>
               </div>
               <div>
                 <h3 className="text-2xl font-bold mb-2">Step 3: Snap & Lock!</h3>
                 <p className="text-zomato-muted text-lg">Wait for the exact moment the falling block visually overlaps the target silhouette. Tap anywhere on the screen! Be careful—a miss applies a direct subtraction penalty to your level score!</p>
               </div>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
