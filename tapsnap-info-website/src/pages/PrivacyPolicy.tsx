import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-black mb-8">Privacy Policy</h1>
      <p className="text-zomato-muted mb-12 border-l-4 border-zomato-red pl-4">Last updated: April 28, 2026</p>

      <div className="space-y-10 text-lg leading-relaxed text-zomato-dark/90">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Information Collection</h2>
          <p>
            TapSnap ("we", "our", or "us") is dedicated to protecting your privacy. We currently do not collect, store, or process any personally identifiable information (PII). Game scores, streaks, and settings are saved locally on your device and are not transmitted to any external servers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Usage Data</h2>
          <p>
            We do not use analytics software to collect usage data. Your in-game metrics—including accuracy, speed, and timing—are solely used for processing game logic and determining score outputs on-device.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Local Storage</h2>
          <p>
            The game utilizes standard local storage and IndexedDB within your application layer to persist game state (unlocked levels and highest scores). This data is completely isolated and cannot be accessed externally.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Third-Party Services</h2>
          <p>
            TapSnap is self-contained. There are no integrations with third-party tracking networks, advertising platforms, or social media sharing bridges that pull analytical metrics from the game.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Children's Privacy</h2>
          <p>
            Because TapSnap does not collect any data, the application is entirely safe for children under the age of 13.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">6. Changes to this Policy</h2>
          <p>
            We may update our Privacy Policy periodically. Since we don't contact you directly, we encourage users to frequently check this page for any changes.
          </p>
        </section>

        <section className="bg-zomato-surface p-6 rounded-2xl border border-zomato-border mt-12">
          <h2 className="text-xl font-bold mb-2">Contact Us</h2>
          <p>
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact our team via the game's support portal or community feedback pages.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
