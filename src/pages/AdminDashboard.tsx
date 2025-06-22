import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Calendar, Clock, MapPin, Users, Mail, Phone, Building, DollarSign, MessageSquare, CheckCircle, X, Trash2, Eye, Download } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import ContactMessagesPanel from '../components/ContactMessagesPanel';
import BookingPieChart from '../components/BookingPieChart';
import BookingLineChart from '../components/BookingLineChart';
import Planet09AI from '../components/Planet09AI';

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

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const bookingsData: Booking[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        bookingsData.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate()
        } as Booking);
      });
      setBookings(bookingsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateBookingStatus = async (bookingId: string, status: 'confirmed' | 'cancelled') => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), { status });
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const deleteBooking = async (bookingId: string) => {
    if (window.confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
      try {
        await deleteDoc(doc(db, 'bookings', bookingId));
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  };

  const openBookingModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setSelectedBooking(null);
    setIsModalOpen(false);
  };

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' || booking.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-ZA', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
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

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-white">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-black flex">
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-300">Manage booking requests and event inquiries</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Total Bookings</p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-white">{bookings.length}</p>
                </div>
                <Calendar className="text-amber-500" size={24} />
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{bookings.filter(b => b.status === 'pending').length}</p>
                </div>
                <Clock className="text-yellow-500" size={24} />
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Confirmed</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{bookings.filter(b => b.status === 'confirmed').length}</p>
                </div>
                <CheckCircle className="text-green-500" size={24} />
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Cancelled</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">{bookings.filter(b => b.status === 'cancelled').length}</p>
                </div>
                <X className="text-red-500" size={24} />
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md mb-6">
            <div className="border-b border-gray-200 dark:border-slate-700">
              <nav className="flex space-x-8 px-6">
                {[
                  { key: 'all', label: 'All Bookings' },
                  { key: 'pending', label: 'Pending' },
                  { key: 'confirmed', label: 'Confirmed' },
                  { key: 'cancelled', label: 'Cancelled' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key as any)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      filter === tab.key
                        ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                        : 'border-transparent text-slate-500 dark:text-slate-300 hover:text-slate-700 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-500'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Bookings List */}
          <div className="space-y-6">
            {filteredBookings.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-12 text-center">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-2">No bookings found</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {filter === 'all' ? 'No booking requests have been submitted yet.' : `No ${filter} bookings found.`}
                </p>
              </div>
            ) : (
              filteredBookings.map((booking) => (
                <div key={booking.id} className="bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{booking.name}</h3>
                        <p className="text-slate-600 dark:text-slate-300">{booking.company}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : booking.status === 'cancelled'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                        <button
                          onClick={() => openBookingModal(booking)}
                          className="p-2 text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
                          title="View details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          className="p-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                          title="Delete booking"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <Mail size={16} />
                        <span className="text-sm truncate">{booking.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <Building size={16} />
                        <span className="text-sm">{booking.eventType}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <Calendar size={16} />
                        <span className="text-sm">{formatDate(booking.eventDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <MapPin size={16} />
                        <span className="text-sm truncate">{booking.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Submitted on {booking.createdAt.toLocaleDateString('en-ZA')} at {booking.createdAt.toLocaleTimeString('en-ZA')}
                      </p>
                      {booking.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Export Button */}
          <div className="flex w-full justify-end mb-8">
            <button
              onClick={() => {
                // Export bookings as CSV
                const csvRows = [
                  [
                    'Name', 'Email', 'Phone', 'Company', 'Event Type', 'Event Date', 'Event Time', 'Duration', 'Attendees', 'Location', 'Description', 'Budget', 'Status', 'Created At'
                  ],
                  ...bookings.map(b => [
                    b.name, b.email, b.phone || '', b.company, b.eventType, b.eventDate, b.eventTime || '', b.duration || '', b.attendees || '', b.location, b.description, b.budget || '', b.status, b.createdAt.toLocaleString()
                  ])
                ];
                const csvContent = csvRows.map(row => row.map(field => '"' + String(field).replace(/"/g, '""') + '"').join(',')).join('\n');
                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'bookings.csv';
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
              style={{ margin: 0 }}
            >
              <Download size={20} />
              Export Bookings as CSV
            </button>
          </div>

          {/* Charts and Metadata */}
          <div className="flex w-full gap-6 mb-8">
            <div className="w-1/4 min-w-[220px]">
              <BookingPieChart
                pending={bookings.filter(b => b.status === 'pending').length}
                confirmed={bookings.filter(b => b.status === 'confirmed').length}
                cancelled={bookings.filter(b => b.status === 'cancelled').length}
              />
            </div>
            <div className="w-1/4 min-w-[220px]">
              <BookingLineChart bookings={bookings.map(b => ({ eventDate: b.eventDate, status: b.status }))} />
            </div>
            <div className="flex-1 bg-white dark:bg-slate-900 rounded-lg shadow-md p-6 flex flex-col gap-6">
              <Planet09AI bookings={bookings} />
            </div>
          </div>
        </div>

        {/* Booking Details Modal */}
        <BookingModal
          booking={selectedBooking}
          isOpen={isModalOpen}
          onClose={closeBookingModal}
        />
      </div>
      {/* Side panel toggle button */}
      <button
        onClick={() => setShowMessages((v) => !v)}
        className="fixed top-24 right-4 z-50 bg-amber-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-amber-600 transition-colors"
      >
        {showMessages ? 'Hide Messages' : 'Show Messages'}
      </button>
      {/* Side panel for contact messages */}
      {showMessages && (
        <div className="fixed top-16 right-0 h-[calc(100vh-4rem)] z-40 shadow-2xl">
          <ContactMessagesPanel />
        </div>
      )}
    </div>
  );
}