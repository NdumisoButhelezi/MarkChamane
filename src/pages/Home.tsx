import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Transform Your Event with 
                <span className="text-amber-400"> Expert Speaking</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Book Mark Chamane for keynotes, workshops, and strategic consultations that inspire, 
                educate, and drive meaningful change in your organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/booking"
                  className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105"
                >
                  Book for Your Event <ArrowRight size={20} />
                </Link>
                <Link 
                  to="/about"
                  className="border border-slate-400 hover:border-white text-white px-8 py-4 rounded-lg font-semibold transition-all text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-amber-400 to-amber-600 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-xl p-6 text-slate-800">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="text-amber-500" size={24} />
                    <span className="font-semibold">Event Booking</span>
                  </div>
                  <p className="text-slate-600 mb-4">Available for events across South Africa & internationally</p>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={16} />
                    <span className="text-sm">Booking requests welcome</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Why Choose Mark Chamane?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              With over 15 years of experience, Mark delivers impactful presentations that drive real change.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-amber-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">500+ Speaking Events</h3>
              <p className="text-slate-600">Extensive experience across diverse industries and audiences</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-amber-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">International Reach</h3>
              <p className="text-slate-600">Based in Durban, available across South Africa and internationally</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-amber-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Proven Results</h3>
              <p className="text-slate-600">Certified professional speaker with MBA in Strategic Management</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}