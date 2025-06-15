import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">Mark Chamane</h3>
            <p className="text-slate-400">
              Professional speaker and strategic consultant based in Durban, available for events across South Africa and internationally.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-slate-400">
              <li>Keynote Speaking</li>
              <li>Workshop Facilitation</li>
              <li>Strategic Consultation</li>
              <li>Executive Coaching</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-slate-400">
              <li>+27 82 456 7890</li>
              <li>bookings@markchamane.co.za</li>
              <li>Durban, KwaZulu-Natal</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow</h4>
            <ul className="space-y-2 text-slate-400">
              <li>LinkedIn</li>
              <li>Twitter</li>
              <li>Speaking Reel</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2024 Mark Chamane. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}