import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { db } from '../firebase/config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store message in Firestore (new collection: contactMessages)
    (async () => {
      try {
        await addDoc(collection(db, 'contactMessages'), {
          ...formData,
          createdAt: serverTimestamp(),
        });
        alert('Thank you for your message! Mark will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } catch (error) {
        alert('There was an error sending your message. Please try again.');
      }
    })();
  };

  return (
    <div className="pt-16">
      <section className="py-20 bg-gray-50 dark:bg-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid lg:grid-cols-2 gap-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white dark:font-bold mb-6">
                Get In Touch
              </h1>
              <p className="text-xl text-slate-600 dark:text-white dark:font-bold mb-8">
                Ready to book Mark for your next event? Have questions about availability 
                or services? Let's start the conversation.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-amber-500 p-3 rounded-lg">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-black dark:text-white dark:font-bold">Phone</div>
                    <div className="text-black font-bold dark:text-white dark:font-bold">+27 61 053 1620</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-amber-500 p-3 rounded-lg">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-black dark:text-white dark:font-bold">Email</div>
                    <div className="text-black font-bold dark:text-white dark:font-bold">
                      <a href="mailto:info@markedbygreatness.co.za" className="hover:underline text-black dark:text-white dark:font-bold">
                        info@markedbygreatness.co.za
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-amber-500 p-3 rounded-lg">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-black dark:text-white dark:font-bold">Based In</div>
                    <div className="text-black font-bold dark:text-white dark:font-bold">27850 Mulberry Street Ext 28 Protea (Available Nationwide & Internationally)</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 text-slate-800 dark:text-white dark:font-bold"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            >
              <h3 className="text-2xl font-bold dark:text-white dark:font-bold mb-6">Quick Inquiry</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white dark:font-bold">Name *</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-black text-slate-800 dark:text-white dark:font-bold"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white dark:font-bold">Email *</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-black text-slate-800 dark:text-white dark:font-bold"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white dark:font-bold">Message *</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-black text-slate-800 dark:text-white dark:font-bold"
                    placeholder="Tell me about your event..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-lg font-semibold dark:font-bold transition-colors"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Office Hours & Response Times */}
      <section className="py-20 bg-gray-50 dark:bg-black transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white dark:font-bold mb-4">
              Response Times & Availability
            </h2>
            <p className="text-xl text-slate-600 dark:text-white dark:font-bold">
              We're committed to responding to your inquiries promptly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white dark:font-bold mb-4">Office Hours</h3>
              <div className="space-y-2 text-slate-600 dark:text-white dark:font-bold">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>8:00 AM - 6:00 PM SAST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>9:00 AM - 2:00 PM SAST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white dark:font-bold mb-4">Response Times</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-slate-600 dark:text-white dark:font-bold">Booking inquiries: Within 24 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="text-slate-600 dark:text-white dark:font-bold">General inquiries: Within 48 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-600 dark:text-white dark:font-bold">Urgent requests: Same day (if received during office hours)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}