import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    eventType: '',
    eventDate: '',
    eventTime: '',
    duration: '',
    attendees: '',
    location: '',
    description: '',
    budget: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Auto-fill email from authenticated user
    setFormData(prev => ({
      ...prev,
      email: currentUser.email || ''
    }));

    if (location.state?.selectedService) {
      setFormData(prev => ({ ...prev, eventType: location.state.selectedService }));
    }
  }, [location.state, currentUser, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      alert('Please log in to submit a booking request.');
      navigate('/login');
      return;
    }

    // Validate required fields
    const requiredFields = ['name', 'email', 'company', 'eventType', 'eventDate', 'location', 'description'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setLoading(true);
    
    try {
      // Create booking object with only non-empty optional fields
      const bookingData: { [key: string]: any } = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        eventType: formData.eventType,
        eventDate: formData.eventDate,
        location: formData.location,
        description: formData.description,
        userId: currentUser.uid,
        status: 'pending',
        createdAt: serverTimestamp()
      };

      // Add optional fields only if they have values
      if (formData.phone.trim()) bookingData.phone = formData.phone;
      if (formData.eventTime) bookingData.eventTime = formData.eventTime;
      if (formData.duration) bookingData.duration = formData.duration;
      if (formData.attendees) bookingData.attendees = formData.attendees;
      if (formData.budget) bookingData.budget = formData.budget;

      await addDoc(collection(db, 'bookings'), bookingData);
      
      alert('Thank you for your booking request! Mark will get back to you within 24 hours.');
      
      // Reset form but keep email
      setFormData({
        name: '',
        email: currentUser.email || '',
        phone: '',
        company: '',
        eventType: '',
        eventDate: '',
        eventTime: '',
        duration: '',
        attendees: '',
        location: '',
        description: '',
        budget: ''
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('There was an error submitting your booking request. Please try again.');
    }
    
    setLoading(false);
  };

  // Generate time options
  const timeOptions = [];
  for (let hour = 6; hour <= 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time24 = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const time12 = `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
      timeOptions.push({ value: time24, label: time12 });
    }
  }

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  if (!currentUser) {
    return null; // Will redirect to login
  }

  return (
    <div className="pt-16">
      <section className="py-20 bg-gray-50 dark:bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Book Mark for Your Event
            </h1>
            <p className="text-xl text-slate-600">
              Fill out the form below and Mark will get back to you within 24 hours.
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Fields marked with * are required
            </p>
          </div>
          
          <div className="bg-white dark:bg-black rounded-2xl shadow-xl p-8 transition-colors duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white dark:bg-black text-slate-800 dark:text-white"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-black text-gray-600 dark:text-white cursor-not-allowed"
                    placeholder="your@email.com"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-300 mt-1">Email is auto-filled from your account</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-white mb-2">
                    Phone Number <span className="text-slate-400 dark:text-slate-300">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white dark:bg-black text-slate-800 dark:text-white"
                    placeholder="+27 82 123 4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-white mb-2">
                    Company/Organization *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white dark:bg-black text-slate-800 dark:text-white"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-white mb-2">
                  Event Type *
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white dark:bg-black text-slate-800 dark:text-white"
                >
                  <option value="">Select event type</option>
                  <option value="Keynote Speaking">Keynote Speaking</option>
                  <option value="Workshop Facilitation">Workshop Facilitation</option>
                  <option value="Strategic Consultation">Strategic Consultation</option>
                  <option value="Panel Discussion">Panel Discussion</option>
                  <option value="Corporate Training">Corporate Training</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-white mb-2">
                    Event Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      min={today}
                      required
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white dark:bg-black text-slate-800 dark:text-white"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-white mb-2">
                    Event Time <span className="text-slate-400 dark:text-slate-300">(optional)</span>
                  </label>
                  <div className="relative">
                    <select
                      name="eventTime"
                      value={formData.eventTime}
                      onChange={handleInputChange}
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white dark:bg-black text-slate-800 dark:text-white appearance-none"
                    >
                      <option value="">Select time</option>
                      {timeOptions.map((time) => (
                        <option key={time.value} value={time.value} className="text-slate-800 dark:text-white bg-white dark:bg-black">
                          {time.label}
                        </option>
                      ))}
                    </select>
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-white mb-2">
                    Duration <span className="text-slate-400 dark:text-slate-300">(optional)</span>
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white dark:bg-black text-slate-800 dark:text-white"
                  >
                    <option value="">Select duration</option>
                    <option value="30 minutes">30 minutes</option>
                    <option value="45 minutes">45 minutes</option>
                    <option value="1 hour">1 hour</option>
                    <option value="1.5 hours">1.5 hours</option>
                    <option value="2 hours">2 hours</option>
                    <option value="3 hours">3 hours</option>
                    <option value="Half day (4 hours)">Half day (4 hours)</option>
                    <option value="Full day (8 hours)">Full day (8 hours)</option>
                    <option value="Multi-day">Multi-day</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-white mb-2">
                    Expected Attendees <span className="text-slate-400 dark:text-slate-300">(optional)</span>
                  </label>
                  <select
                    name="attendees"
                    value={formData.attendees}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white dark:bg-black text-slate-800 dark:text-white"
                  >
                    <option value="">Select attendee range</option>
                    <option value="1-10">1-10 people</option>
                    <option value="11-25">11-25 people</option>
                    <option value="26-50">26-50 people</option>
                    <option value="51-100">51-100 people</option>
                    <option value="101-250">101-250 people</option>
                    <option value="251-500">251-500 people</option>
                    <option value="500+">500+ people</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-white mb-2">
                    Event Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white dark:bg-black text-slate-800 dark:text-white"
                    placeholder="City, Province or Virtual"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-white mb-2">
                  Budget Range <span className="text-slate-400 dark:text-slate-300">(optional)</span>
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white dark:bg-black text-slate-800 dark:text-white"
                >
                  <option value="">Select budget range (optional)</option>
                  <option value="Under R25,000">Under R25,000</option>
                  <option value="R25,000 - R50,000">R25,000 - R50,000</option>
                  <option value="R50,000 - R100,000">R50,000 - R100,000</option>
                  <option value="R100,000 - R250,000">R100,000 - R250,000</option>
                  <option value="R250,000+">R250,000+</option>
                  <option value="Prefer to discuss">Prefer to discuss</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-white mb-2">
                  Event Description & Special Requirements *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-vertical bg-white dark:bg-black text-slate-800 dark:text-white"
                  placeholder="Tell us about your event, audience, goals, and any special requirements..."
                ></textarea>
              </div>

              <div className="bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 rounded-lg p-4 transition-colors duration-300">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 dark:bg-slate-700 p-1 rounded-full mt-0.5">
                    <Calendar className="text-amber-600" size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-1">Booking Notice</h4>
                    <p className="text-sm text-amber-700 dark:text-amber-200">
                      For the best availability, please submit your booking request at least 4-6 weeks in advance. 
                      Rush bookings may be accommodated based on availability.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white dark:text-black py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Submitting...' : 'Submit Booking Request'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}