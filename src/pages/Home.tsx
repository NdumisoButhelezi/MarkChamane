import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import bannerImg from '../assets/IMG_0423.jpeg';
import markGuy from '../assets/7a2490ef-4de9-40a8-8939-7f7898bfe184.jpeg';

export default function Home() {
  return (
    <div className="pt-16">
      {/* Banner Image */}
      <div className="w-full relative">
        <img
          src={bannerImg}
          alt="Mark Chamane banner"
          className="w-full h-64 md:h-96 object-cover object-center shadow-lg rounded-b-3xl border-b-4 border-amber-400"
          style={{ marginTop: '-4rem', zIndex: 1, position: 'relative' }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 rounded-b-3xl" style={{ zIndex: 2 }}></div>
      </div>
      {/* Hero Section */}
      <section className="bg-darkBg text-white dark:bg-white dark:text-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-white dark:text-black">
                Transform Your Event with 
                <span className="text-amber-400"> Expert Speaking</span>
              </h1>
              <p className="text-xl text-white dark:text-black mb-8 leading-relaxed">
                Book Mark Chamane for keynotes, workshops, and strategic consultations that inspire, 
                educate, and drive meaningful change in your organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/booking"
                  className="bg-amber-500 hover:bg-amber-600 text-white dark:text-black px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105"
                >
                  Book for Your Event <ArrowRight size={20} />
                </Link>
                <Link 
                  to="/about"
                  className="border border-slate-400 hover:border-white text-white dark:text-black px-8 py-4 rounded-lg font-semibold transition-all text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white dark:bg-black rounded-2xl p-8 shadow-2xl transition-colors duration-300">
                <div className="bg-black dark:bg-white rounded-xl p-6 text-white dark:text-black transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="text-amber-500" size={24} />
                    <span className="font-semibold text-white dark:text-black">Event Booking</span>
                  </div>
                  <p className="text-white dark:text-black mb-4">Available for events across South Africa & internationally</p>
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-300">
                    <CheckCircle size={16} />
                    <span className="text-sm text-white dark:text-black">Booking requests welcome</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Quick Overview */}
      <section className="py-20 bg-darkCard text-darkText dark:bg-white dark:text-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-black mb-4">
              Why Choose Mark Chamane?
            </h2>
            <p className="text-xl text-white dark:text-black max-w-2xl mx-auto mb-8">
              With over 15 years of experience, Mark delivers impactful presentations that drive real change.
            </p>
            <div className="flex justify-center mb-8">
              <img
                src={markGuy}
                alt="Mark Chamane portrait"
                className="w-40 h-40 md:w-56 md:h-56 object-cover rounded-2xl shadow-lg border-4 border-slate-900 dark:border-white bg-white dark:bg-slate-900 transition-colors duration-300"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-amber-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white dark:text-black mb-2">500+ Speaking Events</h3>
              <p className="text-white dark:text-black">Extensive experience across diverse industries and audiences</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-amber-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white dark:text-black mb-2">International Reach</h3>
              <p className="text-white dark:text-black">Based in Durban, available across South Africa and internationally</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-amber-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white dark:text-black mb-2">Proven Results</h3>
              <p className="text-white dark:text-black">Certified professional speaker with MBA in Strategic Management</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}