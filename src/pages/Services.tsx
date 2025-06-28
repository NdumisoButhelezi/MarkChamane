import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, Users, Mic, Award } from 'lucide-react';
import bgImg from '../assets/IMG_0423.jpeg';

export default function Services() {
  const services = [
    {
      id: 'keynote',
      title: 'Keynote Speaking',
      duration: '45-60 minutes',
      icon: <Mic className="text-amber-500" size={24} />,
      description: 'Inspiring keynote presentations for conferences, corporate events, and industry gatherings.',
      features: ['Custom presentation development', 'Interactive audience engagement', 'Q&A session', 'Post-event follow-up']
    },
    {
      id: 'workshop',
      title: 'Workshop Facilitation',
      duration: '2-8 hours',
      icon: <Users className="text-amber-500\" size={24} />,
      description: 'Interactive workshops and training sessions designed to upskill teams and drive results.',
      features: ['Hands-on learning experience', 'Customized content', 'Group exercises', 'Actionable takeaways']
    },
    {
      id: 'consultation',
      title: 'Strategic Consultation',
      duration: '1-4 hours',
      icon: <Award className="text-amber-500" size={24} />,
      description: 'One-on-one or small group strategic sessions to tackle specific business challenges.',
      features: ['Personalized approach', 'Strategic planning', 'Implementation roadmap', 'Follow-up support']
    }
  ];

  return (
    <div className="pt-16">
      <section className="py-20 bg-gray-50 dark:bg-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Speaking & Consulting Services
            </h1>
            <p className="text-xl text-slate-600 dark:text-white max-w-2xl mx-auto">
              Choose from our range of speaking and consulting services 
              designed to elevate your event and inspire your audience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white dark:bg-black rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-1 transition-colors duration-300">
                <div className="flex items-center gap-3 mb-4">
                  {service.icon}
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">{service.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-white mb-4">
                  <Clock size={16} />
                  <span className="text-sm">{service.duration}</span>
                </div>
                <p className="text-slate-600 dark:text-white mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-slate-600 dark:text-white">
                      <CheckCircle size={16} className="text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/booking"
                  state={{ selectedService: service.title }}
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white dark:bg-white dark:text-black py-3 rounded-lg font-semibold transition-colors block text-center"
                >
                  Request This Service
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section
        className="py-20 bg-gray-50 dark:bg-black transition-colors duration-300 relative overflow-hidden"
        style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/60 dark:bg-black/80 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white dark:text-white mb-4">
              Additional Services
            </h2>
            <p className="text-xl font-bold text-white dark:text-white">
              Comprehensive solutions for all your event and organizational needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-black rounded-lg p-6 text-center shadow-md transition-colors duration-300">
              <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-amber-600" size={20} />
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Panel Discussions</h3>
              <p className="text-sm text-slate-600 dark:text-white">Expert moderation and participation</p>
            </div>
            
            <div className="bg-white dark:bg-black rounded-lg p-6 text-center shadow-md transition-colors duration-300">
              <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-amber-600" size={20} />
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Executive Coaching</h3>
              <p className="text-sm text-slate-600 dark:text-white">One-on-one leadership development</p>
            </div>
            
            <div className="bg-white dark:bg-black rounded-lg p-6 text-center shadow-md transition-colors duration-300">
              <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="text-amber-600" size={20} />
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-white mb-2">MC Services</h3>
              <p className="text-sm text-slate-600 dark:text-white">Professional event hosting</p>
            </div>
            
            <div className="bg-white dark:bg-black rounded-lg p-6 text-center shadow-md transition-colors duration-300">
              <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-amber-600" size={20} />
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Virtual Events</h3>
              <p className="text-sm text-slate-600 dark:text-white">Online presentations and workshops</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}