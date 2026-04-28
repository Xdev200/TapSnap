import React from 'react';

const TermsOfUse: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-black mb-8">Terms of Use</h1>
      <p className="text-zomato-muted mb-12 border-l-4 border-zomato-red pl-4">Last updated: April 28, 2026</p>

      <div className="space-y-10 text-lg leading-relaxed text-zomato-dark/90">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the TapSnap application ("Service"), you agree to be bound by these Terms. If you disagree with any part of the terms, you must not use our Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. License to Use</h2>
          <p>
            TapSnap grants you a personal, non-exclusive, non-transferable, and revocable license to use the Application for personal, non-commercial entertainment purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. User Conduct</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-zomato-red">
            <li>Reverse engineer, decompile, or attempt to extract source code from the Application.</li>
            <li>Use the game in any way that violates applicable local, national, or international law.</li>
            <li>Attempt to unfairly manipulate leaderboards through automated scripts or "bot" clicking interfaces.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of TapSnap and its licensors. The Service is protected by copyright, trademark, and other intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Disclaimer of Liability</h2>
          <p>
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. TapSnap makes no warranties, expressed or implied, regarding the continuous availability or error-free rendering of the application. 
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">6. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfUse;
