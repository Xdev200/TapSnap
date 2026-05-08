
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans text-zomato-dark">
        {/* Navigation */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-zomato-border/50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-black tracking-tight text-zomato-red">TapSnap</Link>
            <nav className="hidden md:flex gap-6 font-medium text-sm">
              <Link to="/" className="hover:text-zomato-red transition-colors">Home</Link>
              <Link to="/privacy" className="hover:text-zomato-red transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-zomato-red transition-colors">Terms of Use</Link>
            </nav>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-zomato-dark text-white/70 py-12">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-white text-xl font-black tracking-tight mb-2">TapSnap</h3>
              <p className="text-sm">Master the timing in our simple reflex challenge.</p>
            </div>
            <div className="flex gap-6 text-sm font-medium">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-6 mt-8 pt-8 border-t border-white/10 text-center text-xs opacity-60">
            &copy; {new Date().getFullYear()} TapSnap Game. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
