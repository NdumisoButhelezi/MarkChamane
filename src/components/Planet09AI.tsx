import React, { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

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
  createdAt: any;
  userId: string;
}

const predefinedQuestions = [
  'What is the most popular event type?',
  'How many bookings are pending?',
  'How many bookings are confirmed?',
  'How many bookings are cancelled?',
  'What is the latest booking?',
  'Show me details for a specific booking',
  'Are bookings increasing or decreasing?',
  'Which day has the most bookings?',
  'Which company booked the most?',
  'What is the average time between booking and event?',
  'Which event type has the most cancellations?',
];

export default function Planet09AI({ bookings }: { bookings: Booking[] }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    let response = '';
    const lowerQ = question.toLowerCase();
    if (lowerQ.includes('popular event')) {
      const eventCounts: { [key: string]: number } = {};
      bookings.forEach(b => {
        eventCounts[b.eventType] = (eventCounts[b.eventType] || 0) + 1;
      });
      const sorted = Object.entries(eventCounts).sort((a, b) => b[1] - a[1]);
      response = sorted.length ? `The most popular event type is "${sorted[0][0]}" with ${sorted[0][1]} bookings.` : 'No bookings found.';
    } else if (lowerQ.includes('pending')) {
      const count = bookings.filter(b => b.status === 'pending').length;
      response = `There are currently ${count} pending bookings.`;
    } else if (lowerQ.includes('confirmed')) {
      const count = bookings.filter(b => b.status === 'confirmed').length;
      response = `There are currently ${count} confirmed bookings.`;
    } else if (lowerQ.includes('cancelled')) {
      const count = bookings.filter(b => b.status === 'cancelled').length;
      response = `There are currently ${count} cancelled bookings.`;
    } else if (lowerQ.includes('latest')) {
      const latest = bookings.slice().sort((a, b) => b.createdAt - a.createdAt)[0];
      response = latest ? `The latest booking is for "${latest.eventType}" by ${latest.name} on ${latest.eventDate}.` : 'No bookings found.';
    } else if (lowerQ.includes('increasing') || lowerQ.includes('decreasing') || lowerQ.includes('trend')) {
      // Trend analysis
      if (bookings.length < 2) {
        response = 'Not enough data to determine a trend.';
      } else {
        const byDate = bookings.slice().sort((a, b) => (a.eventDate > b.eventDate ? 1 : -1));
        const first = byDate[0];
        const last = byDate[byDate.length - 1];
        const confirmedFirst = byDate.filter(b => b.eventDate === first.eventDate && b.status === 'confirmed').length;
        const confirmedLast = byDate.filter(b => b.eventDate === last.eventDate && b.status === 'confirmed').length;
        if (confirmedLast > confirmedFirst) {
          response = 'Confirmed bookings are trending upward over time.';
        } else if (confirmedLast < confirmedFirst) {
          response = 'Confirmed bookings are trending downward over time.';
        } else {
          response = 'Confirmed bookings are stable over time.';
        }
      }
    } else if (lowerQ.includes('day has the most bookings')) {
      // Peak day
      const dayCounts: { [date: string]: number } = {};
      bookings.forEach(b => {
        dayCounts[b.eventDate] = (dayCounts[b.eventDate] || 0) + 1;
      });
      const sorted = Object.entries(dayCounts).sort((a, b) => b[1] - a[1]);
      response = sorted.length ? `The day with the most bookings is ${sorted[0][0]} with ${sorted[0][1]} bookings.` : 'No bookings found.';
    } else if (lowerQ.includes('company booked the most')) {
      // Top company
      const companyCounts: { [company: string]: number } = {};
      bookings.forEach(b => {
        if (b.company) companyCounts[b.company] = (companyCounts[b.company] || 0) + 1;
      });
      const sorted = Object.entries(companyCounts).sort((a, b) => b[1] - a[1]);
      response = sorted.length ? `The company with the most bookings is "${sorted[0][0]}" with ${sorted[0][1]} bookings.` : 'No company bookings found.';
    } else if (lowerQ.includes('average time between booking and event')) {
      // Average time between booking and event
      const diffs: number[] = [];
      bookings.forEach(b => {
        if (b.createdAt && b.eventDate) {
          const created = new Date(b.createdAt.seconds ? b.createdAt.seconds * 1000 : b.createdAt).getTime();
          const event = new Date(b.eventDate).getTime();
          if (!isNaN(created) && !isNaN(event)) {
            diffs.push((event - created) / (1000 * 60 * 60 * 24));
          }
        }
      });
      if (diffs.length) {
        const avg = diffs.reduce((a, b) => a + b, 0) / diffs.length;
        response = `The average time between booking and event is ${avg.toFixed(1)} days.`;
      } else {
        response = 'Not enough data to calculate average time.';
      }
    } else if (lowerQ.includes('event type has the most cancellations')) {
      // Most cancelled event type
      const cancelCounts: { [type: string]: number } = {};
      bookings.forEach(b => {
        if (b.status === 'cancelled') cancelCounts[b.eventType] = (cancelCounts[b.eventType] || 0) + 1;
      });
      const sorted = Object.entries(cancelCounts).sort((a, b) => b[1] - a[1]);
      response = sorted.length ? `The event type with the most cancellations is "${sorted[0][0]}" with ${sorted[0][1]} cancellations.` : 'No cancellations found.';
    } else if (lowerQ.includes('details for') || lowerQ.includes('specific booking')) {
      // Try to extract a name or email
      const match = question.match(/for ([^?]+)/i);
      let search = match ? match[1].trim() : '';
      if (search) {
        const found = bookings.find(b => b.name.toLowerCase().includes(search.toLowerCase()) || b.email.toLowerCase().includes(search.toLowerCase()));
        if (found) {
          response = `Booking for ${found.name}:\nEvent: ${found.eventType}\nDate: ${found.eventDate}\nStatus: ${found.status}\nLocation: ${found.location}\nDescription: ${found.description}`;
        } else {
          response = `No booking found for "${search}".`;
        }
      } else {
        response = 'Please specify a name or email for the booking you want details about.';
      }
    } else {
      response = 'Sorry, I can only answer questions about bookings. Try asking about popular event types, booking counts, or details for a specific booking.';
    }
    setAnswer(response);
    setLoading(false);
  };

  return (
    <div className="bg-slate-50 dark:bg-black rounded-lg p-6 shadow flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-bold text-amber-500">Planet 09 AI</span>
        <span className="text-xs text-slate-500 dark:text-slate-400">(Booking Q&A Assistant)</span>
      </div>
      <div className="mb-2">
        <label className="block text-sm font-semibold mb-1">Ask a question:</label>
        <select
          className="w-full p-2 rounded border border-slate-300 dark:bg-slate-900 dark:text-white"
          value={question}
          onChange={e => setQuestion(e.target.value)}
        >
          <option value="" disabled>Select a question...</option>
          {predefinedQuestions.map(q => <option key={q} value={q}>{q}</option>)}
        </select>
      </div>
      <button
        className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded font-bold w-fit"
        onClick={handleAsk}
        disabled={loading || !question.trim()}
      >
        {loading ? 'Thinking...' : 'Ask Planet 09 AI'}
      </button>
      {answer && (
        <div className="bg-white dark:bg-slate-900 rounded p-4 mt-2 text-slate-800 dark:text-white whitespace-pre-line">
          {answer}
        </div>
      )}
      <div className="text-xs text-slate-400 mt-2">
        Example questions: What is the most popular event type? How many bookings are pending? Show me details for John Doe.
      </div>
    </div>
  );
}
