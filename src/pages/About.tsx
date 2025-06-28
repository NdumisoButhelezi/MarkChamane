import { CheckCircle, User } from 'lucide-react';
import { motion } from 'framer-motion';
import markPortrait from '../assets/0dea5f8c-2cda-4714-bf8c-4d00dd14c054.jpeg';
import { Timeline, TimelineItem } from '../components/Timeline';

export default function About() {
  return (
    <div className="pt-16">
      <section className="py-20 bg-gradient-to-br from-slate-900 via-amber-50 to-black dark:from-black dark:via-slate-900 dark:to-amber-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col md:flex-row gap-10 items-center justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Portrait with enhanced shadow overlay */}
            <motion.div
              className="relative w-56 h-56 md:w-72 md:h-72 flex-shrink-0 mb-8 md:mb-0"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
            >
              <img
                src={markPortrait}
                alt="Mark Chamane portrait"
                className="w-full h-full object-cover rounded-2xl border-4 border-white dark:border-amber-400 bg-white dark:bg-slate-900 shadow-2xl"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/30 via-white/10 to-black/30 dark:from-amber-400/40 dark:via-black/30 dark:to-black/60 pointer-events-none shadow-2xl" />
            </motion.div>
            {/* Cardholder with overlayed shadow */}
            <motion.div
              className="relative bg-gradient-to-br from-amber-100 to-amber-300 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 text-slate-900 dark:text-white flex flex-col items-center w-full max-w-md shadow-2xl"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            >
              <div className="absolute inset-0 rounded-2xl bg-white/30 dark:bg-black/30 pointer-events-none shadow-2xl" />
              <div className="relative z-10 flex flex-col items-center w-full">
                <User size={48} className="text-amber-400 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Professional Speaker</h3>
                <p className="text-slate-700 dark:text-slate-300 text-base mb-4">Strategic Consultant & Thought Leader</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full mb-4">
                  <div className="bg-white/70 dark:bg-slate-900/70 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 dark:text-white">1. Character Development</div>
                  <div className="bg-white/70 dark:bg-slate-900/70 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 dark:text-white">2. Mental Self-Image & Identity</div>
                  <div className="bg-white/70 dark:bg-slate-900/70 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 dark:text-white">3. Purpose & Vision</div>
                  <div className="bg-white/70 dark:bg-slate-900/70 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 dark:text-white">4. Discipline & Decision-Making</div>
                  <div className="bg-white/70 dark:bg-slate-900/70 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 dark:text-white">5. Overcoming Broken Environments</div>
                  <div className="bg-white/70 dark:bg-slate-900/70 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 dark:text-white">6. Leadership for the Next Generation</div>
                  <div className="bg-white/70 dark:bg-slate-900/70 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 dark:text-white">7. Emotional Intelligence & Healing</div>
                  <div className="bg-white/70 dark:bg-slate-900/70 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 dark:text-white">8. Faith, Morals & Spiritual Strength (if faith-based)</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Timeline Section: Mark's Journey */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-700 dark:text-amber-300 mb-4 animate-fade-in">Meet Mark Chamane</h2>
          </div>
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <TimelineItem year="🌱 Early Life">
                Born in the rural village in KwaZulu-Natal, South Africa, Mark Chamane is a dynamic speaker, author, and founder of Mark.ed by Greatness. Despite growing up in a community marked by poverty and limited access to opportunity, Mark refused to let his environment shape his future.
              </TimelineItem>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
            >
              <TimelineItem year="🎓 Varsity & Calling">
                His journey from hardship to hope ignited a passion to help others do the same. After finishing varsity, he turned his full focus toward his true calling: developing young minds and building a world led by character.
              </TimelineItem>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }}
            >
              <TimelineItem year="🚀 Today">
                Today, Mark travels across the country and beyond, equipping students, educators, professionals, and community leaders with the mindset, tools, and discipline needed to live purpose-driven lives.
              </TimelineItem>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7, ease: 'easeOut' }}
            >
              <TimelineItem year="💡 Impact">
                Through keynote speaking, youth coaching, character development programs, and educational resources, Mark and his team have empowered thousands. His core belief is simple yet powerful: build a character so strong that it naturally does what must be done.
              </TimelineItem>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7, ease: 'easeOut' }}
            >
              <TimelineItem year="🌍 Mission">
                <span className="block text-2xl md:text-3xl font-bold text-amber-700 dark:text-amber-300 mb-2">Mission</span>
                <span className="block text-lg md:text-xl text-slate-700 dark:text-white mb-2">Our mission is clear: To equip the next generation with the character and mindset required to live with vision, courage, and integrity. We host seminars, workshops, and free tours to uplift communities — especially in underserved and overlooked areas.</span>
                <span className="block text-lg md:text-xl text-slate-700 dark:text-white">Book MARK CHAMANE to speak, teach, and train your people. Or support the movement by donating to help us reach more youth through our global outreach programs. Together, let’s build a world led by character.</span>
              </TimelineItem>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}