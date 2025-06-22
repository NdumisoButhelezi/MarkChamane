import React from 'react';
import { CheckCircle, User } from 'lucide-react';
import markPortrait from '../assets/0dea5f8c-2cda-4714-bf8c-4d00dd14c054.jpeg';
import markSpeaking from '../assets/078E7C7E-BEA2-423F-8F2A-278B35496A47.jpeg';

export default function About() {
  return (
    <div className="pt-16">
      <section className="py-20 bg-gray-50 dark:bg-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex justify-center mb-6 lg:mb-0">
                <img
                  src={markPortrait}
                  alt="Mark Chamane portrait"
                  className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-2xl shadow-lg border-4 border-white dark:border-slate-900 bg-white dark:bg-slate-900"
                />
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 dark:from-white dark:to-slate-100 rounded-2xl p-8 text-white dark:text-black flex flex-col items-center lg:items-start w-full max-w-xs">
                <User size={48} className="text-amber-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Professional Speaker</h3>
                <p className="text-slate-300 dark:text-slate-700 text-sm mb-4">Strategic Consultant & Thought Leader</p>
                <div className="space-y-2 text-sm">
                  <div>🎤 Keynote Speaker</div>
                  <div>👥 Workshop Facilitator</div>
                  <div>🚀 Strategic Consultant</div>
                  <div>💼 Executive Coach</div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-6">
                Meet Mark Chamane
              </h1>
              <p className="text-lg text-slate-600 dark:text-white mb-6 leading-relaxed">
                With over 15 years of experience as a strategic consultant and thought leader based in Durban, 
                Mark has captivated audiences at hundreds of events across South Africa and internationally.
              </p>
              <p className="text-lg text-slate-600 dark:text-white mb-8 leading-relaxed">
                His dynamic speaking style combines practical insights with inspiring stories, 
                creating memorable experiences that drive real change in organizations and individuals.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <CheckCircle className="text-amber-600" size={20} />
                  </div>
                  <span className="text-slate-700 dark:text-white font-semibold">500+ Speaking Events</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <CheckCircle className="text-amber-600" size={20} />
                  </div>
                  <span className="text-slate-700 dark:text-white font-semibold">South African & International Experience</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <CheckCircle className="text-amber-600" size={20} />
                  </div>
                  <span className="text-slate-700 dark:text-white font-semibold">MBA, Strategic Management</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <CheckCircle className="text-amber-600" size={20} />
                  </div>
                  <span className="text-slate-700 dark:text-white font-semibold">Certified Professional Speaker</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Background Section */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Professional Background
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              A proven track record of delivering exceptional value to organizations worldwide.
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white dark:bg-black rounded-xl shadow-lg p-8 border border-gray-100 transition-colors duration-300">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={markSpeaking}
                  alt="Mark Chamane speaking"
                  className="w-full max-w-xs md:max-w-sm object-cover rounded-2xl shadow-lg border-4 border-white dark:border-slate-900 bg-white dark:bg-slate-900"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Education & Certifications</h3>
              <ul className="space-y-3 text-slate-600 dark:text-white">
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 mt-0.5" />
                  <span>MBA in Strategic Management - University of KwaZulu-Natal</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 mt-0.5" />
                  <span>Certified Professional Speaker (CPS) - Professional Speakers Association of Southern Africa</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 mt-0.5" />
                  <span>Advanced Facilitation Certification - International Association of Facilitators</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-black rounded-xl shadow-lg p-8 border border-gray-100 transition-colors duration-300">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Speaking Expertise</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-700 dark:text-white mb-2">Industries</h4>
                  <ul className="space-y-1 text-slate-600 dark:text-white">
                    <li>• Technology & Innovation</li>
                    <li>• Financial Services</li>
                    <li>• Healthcare & Pharmaceuticals</li>
                    <li>• Manufacturing & Mining</li>
                    <li>• Education & Non-Profit</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700 dark:text-white mb-2">Topics</h4>
                  <ul className="space-y-1 text-slate-600 dark:text-white">
                    <li>• Strategic Leadership</li>
                    <li>• Digital Transformation</li>
                    <li>• Change Management</li>
                    <li>• Innovation & Growth</li>
                    <li>• Team Performance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}