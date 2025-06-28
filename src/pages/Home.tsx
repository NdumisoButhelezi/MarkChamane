import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import bannerImg from '../assets/IMG_0423.jpeg';
import markGuy from '../assets/7a2490ef-4de9-40a8-8939-7f7898bfe184.jpeg';
import dotGridImg from '../assets/078E7C7E-BEA2-423F-8F2A-278B35496A47.jpeg';
import { DotGrid } from '../components/DotGrid';

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
              <motion.h1
                className="text-3xl md:text-5xl font-extrabold leading-tight mb-6 text-amber-400 drop-shadow-lg"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                The real problem isn't the violence, crime, or purposeless living we see today.
              </motion.h1>
              <motion.h2
                className="text-2xl md:text-3xl font-semibold mb-4 text-white dark:text-black italic"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
              >
                It’s deeper than that. The root issue is a broken mental self-image.
              </motion.h2>
              <motion.div
                className="bg-white/10 dark:bg-black/10 rounded-xl p-6 mb-8 shadow-md border-l-4 border-amber-400"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
              >
                <p className="text-lg md:text-xl text-white dark:text-black mb-2 font-medium">
                  Welcome to <span className="font-bold text-amber-400">Mark.ed by Greatness</span> — an organization dedicated to building strong character in young people across the world.
                </p>
                <p className="text-base md:text-lg text-white dark:text-black">
                  We believe that lasting change begins within. Through character development training, we help youth discover <span className="font-semibold text-amber-400">purpose</span>, <span className="font-semibold text-amber-400">discipline</span>, and <span className="font-semibold text-amber-400">direction</span>.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.97 }}
                  animate={{ scale: [1, 1.1, 0.75, 1] }}
                  transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2, ease: 'easeInOut' }}
                >
                  <Link 
                    to="/booking"
                    className="bg-amber-500 hover:bg-amber-600 text-white dark:text-black px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg overflow-hidden"
                    style={{ position: 'relative' }}
                  >
                    <DotGrid />
                    <span className="relative z-10 flex items-center gap-2">Book for Your Event <ArrowRight size={20} /></span>
                  </Link>
                </motion.div>
                <Link 
                  to="/about"
                  className="border border-slate-400 hover:border-white text-white dark:text-black px-8 py-4 rounded-lg font-semibold transition-all text-center shadow"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
            <div className="flex flex-col gap-8 items-center justify-center">
              <motion.div
                className="relative w-full flex justify-center"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
              >
                <img
                  src={dotGridImg}
                  alt="Decorative right section"
                  className="w-80 h-80 object-cover rounded-2xl shadow-lg border-4 border-amber-200 bg-white dark:bg-black mb-6"
                  style={{ maxWidth: '100%', maxHeight: '320px' }}
                />
              </motion.div>
              <motion.div
                className="bg-white dark:bg-black rounded-2xl p-8 shadow-2xl transition-colors duration-300 w-full"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
              >
                <div className="bg-black dark:bg-white rounded-xl p-6 text-white dark:text-black transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-semibold text-white dark:text-black">Event Booking</span>
                  </div>
                  <p className="text-white dark:text-black mb-4">Available for events across South Africa & internationally</p>
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-300">
                    <CheckCircle size={16} />
                    <span className="text-sm text-white dark:text-black">Booking requests welcome</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* Quick Overview */}
      <section className="py-20 bg-darkCard text-darkText dark:bg-white dark:text-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white dark:text-black mb-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              Why Choose Mark Chamane?
            </motion.h2>
            <motion.p
              className="text-xl text-white dark:text-black max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
            >
              With over 15 years of experience, Mark delivers impactful presentations that drive real change.
            </motion.p>
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            >
              <img
                src={markGuy}
                alt="Mark Chamane portrait"
                className="w-40 h-40 md:w-56 md:h-56 object-cover rounded-2xl shadow-2xl border-4 border-slate-900 dark:border-white bg-white dark:bg-slate-900 transition-colors duration-300"
              />
            </motion.div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="text-center bg-white/10 dark:bg-black/10 rounded-xl p-6 shadow-lg border border-amber-200"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            >
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-amber-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white dark:text-black mb-2">500+ Speaking Events</h3>
              <p className="text-white dark:text-black">Extensive experience across diverse industries and audiences</p>
            </motion.div>
            <motion.div
              className="text-center bg-white/10 dark:bg-black/10 rounded-xl p-6 shadow-lg border border-amber-200"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
            >
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-amber-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white dark:text-black mb-2">International Reach</h3>
              <p className="text-white dark:text-black">Based at 27850 Mulberry Street Ext 28 Protea, available across South Africa and internationally</p>
            </motion.div>
            <motion.div
              className="text-center bg-white/10 dark:bg-black/10 rounded-xl p-6 shadow-lg border border-amber-200"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
            >
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-amber-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white dark:text-black mb-2">Proven Results</h3>
              <p className="text-white dark:text-black">Certified professional speaker with MBA in Strategic Management</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}