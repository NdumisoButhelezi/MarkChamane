import React from 'react';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Thabo Mthembu',
      role: 'Event Director, Innovation Summit Cape Town',
      content: 'Mark\'s keynote was the highlight of our conference. His insights were transformative and the audience was completely engaged.',
      rating: 5,
      event: 'Innovation Summit 2023',
      attendees: '500+'
    },
    {
      name: 'Priya Patel',
      role: 'VP Learning & Development, African Growth Partners',
      content: 'The workshop Mark delivered exceeded all expectations. Our team left with practical tools they use daily.',
      rating: 5,
      event: 'Leadership Development Workshop',
      attendees: '50'
    },
    {
      name: 'Johan van der Merwe',
      role: 'CEO, TechHub Johannesburg',
      content: 'Mark\'s strategic consultation helped us pivot our business model. The results speak for themselves.',
      rating: 5,
      event: 'Strategic Planning Session',
      attendees: '12'
    },
    {
      name: 'Nomsa Dlamini',
      role: 'HR Director, Mining Solutions SA',
      content: 'Outstanding facilitation skills. Mark managed to engage our diverse team and create actionable outcomes.',
      rating: 5,
      event: 'Team Building Workshop',
      attendees: '80'
    },
    {
      name: 'David Thompson',
      role: 'Conference Chair, FinTech Africa',
      content: 'Professional, prepared, and passionate. Mark delivered exactly what we needed for our international audience.',
      rating: 5,
      event: 'FinTech Africa Conference',
      attendees: '300+'
    },
    {
      name: 'Sarah Mbeki',
      role: 'Training Manager, Healthcare Innovations',
      content: 'Mark\'s ability to simplify complex concepts while keeping everyone engaged is remarkable.',
      rating: 5,
      event: 'Healthcare Leadership Summit',
      attendees: '150'
    }
  ];

  return (
    <div className="pt-16">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              What Event Organizers Say
            </h1>
            <p className="text-xl text-slate-600">
              Real feedback from event organizers who trusted Mark with their most important events.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-slate-800">{testimonial.name}</div>
                  <div className="text-sm text-slate-500 mb-2">{testimonial.role}</div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{testimonial.event}</span>
                    <span>{testimonial.attendees} attendees</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Proven Track Record</h2>
            <p className="text-xl text-slate-300">Numbers that speak for themselves</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">500+</div>
              <div className="text-slate-300">Speaking Events</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">50,000+</div>
              <div className="text-slate-300">People Inspired</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">15+</div>
              <div className="text-slate-300">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">98%</div>
              <div className="text-slate-300">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}