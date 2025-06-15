import React from 'react';
import { X, Calendar, Clock, MapPin, Users, Mail, Phone, Building, DollarSign, MessageSquare, User } from 'lucide-react';

interface Booking {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  eventType: string;
  eventDate: string;
  eventTime?: string;
  duration?: string;
  attendees?: string;
  location: string;
  description: string;
  budget?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  userId: string;
}

interface BookingModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ booking, isOpen, onClose }: BookingModalProps) {
  if (!isOpen || !booking) return null;

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-ZA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return 'Not specified';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Booking Details</h2>
            <p className="text-slate-600">Complete information for this booking request</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Status and Basic Info */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-1">{booking.name}</h3>
              <p className="text-slate-600">{booking.company}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <User size={20} />
              Contact Information
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-slate-500" />
                <div>
                  <p className="text-sm font-medium text-slate-700">Email</p>
                  <p className="text-slate-600">{booking.email}</p>
                </div>
              </div>
              {booking.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-slate-500" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">Phone</p>
                    <p className="text-slate-600">{booking.phone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Event Details */}
          <div className="bg-amber-50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Calendar size={20} />
              Event Details
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building size={16} className="text-slate-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">Event Type</p>
                    <p className="text-slate-600">{booking.eventType}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar size={16} className="text-slate-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">Date</p>
                    <p className="text-slate-600">{formatDate(booking.eventDate)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-slate-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">Location</p>
                    <p className="text-slate-600">{booking.location}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {booking.eventTime && (
                  <div className="flex items-start gap-3">
                    <Clock size={16} className="text-slate-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-slate-700">Time</p>
                      <p className="text-slate-600">{formatTime(booking.eventTime)}</p>
                    </div>
                  </div>
                )}
                {booking.duration && (
                  <div className="flex items-start gap-3">
                    <Clock size={16} className="text-slate-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-slate-700">Duration</p>
                      <p className="text-slate-600">{booking.duration}</p>
                    </div>
                  </div>
                )}
                {booking.attendees && (
                  <div className="flex items-start gap-3">
                    <Users size={16} className="text-slate-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-slate-700">Expected Attendees</p>
                      <p className="text-slate-600">{booking.attendees}</p>
                    </div>
                  </div>
                )}
                {booking.budget && (
                  <div className="flex items-start gap-3">
                    <DollarSign size={16} className="text-slate-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-slate-700">Budget Range</p>
                      <p className="text-slate-600">{booking.budget}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Event Description */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <MessageSquare size={20} />
              Event Description & Requirements
            </h4>
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{booking.description}</p>
          </div>

          {/* Submission Details */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-slate-800 mb-4">Submission Details</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-slate-700">Submitted On</p>
                <p className="text-slate-600">
                  {booking.createdAt.toLocaleDateString('en-ZA', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="font-medium text-slate-700">Submitted At</p>
                <p className="text-slate-600">
                  {booking.createdAt.toLocaleTimeString('en-ZA', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}