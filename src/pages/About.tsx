import React from 'react';
import { CheckCircle, User } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-16">
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Meet Mark Chamane
              </h1>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                With over 15 years of experience as a strategic consultant and thought leader based in Durban, 
                Mark has captivated audiences at hundreds of events across South Africa and internationally.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                His dynamic speaking style combines practical insights with inspiring stories, 
                creating memorable experiences that drive real change in organizations and individuals.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <CheckCircle className="text-amber-600" size={20} />
                  </div>
                  <span className="text-slate-700">500+ Speaking Events</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <CheckCircle className="text-amber-600" size={20} />
                  </div>
                  <span className="text-slate-700">South African & International Experience</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <CheckCircle className="text-amber-600" size={20} />
                  </div>
                  <span className="text-slate-700">MBA, Strategic Management</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <CheckCircle className="text-amber-600" size={20} />
                  </div>
                  <span className="text-slate-700">Certified Professional Speaker</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white">
                <User size={48} className="text-amber-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Professional Speaker</h3>
                <p className="text-slate-300 text-sm mb-4">Strategic Consultant & Thought Leader</p>
                <div className="space-y-2 text-sm">
                  <div>🎤 Keynote Speaker</div>
                  <div>👥 Workshop Facilitator</div>
                  <div>🚀 Strategic Consultant</div>
                  <div>💼 Executive Coach</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Background Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Professional Background
            </h2>
            <p className="text-xl text-slate-600">
              A proven track record of delivering exceptional value to organizations worldwide.
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Education & Certifications</h3>
              <ul className="space-y-3 text-slate-600">
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

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Speaking Expertise</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">Industries</h4>
                  <ul className="space-y-1 text-slate-600">
                    <li>• Technology & Innovation</li>
                    <li>• Financial Services</li>
                    <li>• Healthcare & Pharmaceuticals</li>
                    <li>• Manufacturing & Mining</li>
                    <li>• Education & Non-Profit</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700 mb-2">Topics</h4>
                  <ul className="space-y-1 text-slate-600">
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