import React from 'react';
import { FaInstagram, FaYoutube, FaTiktok, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <h3 className="font-bold text-2xl mb-4">Mark Chamane</h3>
            <p className="text-slate-400 mb-4">
              Professional speaker and strategic consultant based in South Africa, available for events across the country and internationally.
            </p>
            <div className="flex items-center gap-2 text-amber-400 font-semibold mb-2">
              <FaMapMarkerAlt className="text-amber-400" />
              27850 Mulberry Street Ext 28 Protea
            </div>
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
              <li>+27 61 053 1620</li>
              <li><a href="mailto:info@markedbygreatness.co.za" className="hover:underline text-white">info@markedbygreatness.co.za</a></li>
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-amber-400" />
                27850 Mulberry Street Ext 28 Protea
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Follow Mark</h4>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/markchamane/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-amber-400 transition-colors text-2xl">
                  <FaInstagram />
                </a>
                <a href="https://www.youtube.com/@MarkChamane" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-amber-400 transition-colors text-2xl">
                  <FaYoutube />
                </a>
                <a href="https://www.tiktok.com/@markchamane" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-amber-400 transition-colors text-2xl">
                  <FaTiktok />
                </a>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Location</h4>
            <div className="rounded-xl overflow-hidden shadow-lg border border-slate-800 mb-2">
              <iframe
                title="Mark Chamane Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=27.997%2C-26.248%2C28.001%2C-26.244&amp;layer=mapnik&amp;marker=-26.246%2C28.000"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <a
              href="https://www.openstreetmap.org/?mlat=-26.246&mlon=28.000#map=18/-26.246/28.000"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs text-amber-400 text-center hover:underline"
            >
              View Larger Map
            </a>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
          <p>&copy; 2024 Mark Chamane. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}