import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

interface BookingLineChartProps {
  bookings: { eventDate: string; status: string }[];
}

export default function BookingLineChart({ bookings }: BookingLineChartProps) {
  // Group bookings by date and status
  const dateMap: { [date: string]: { [status: string]: number } } = {};
  bookings.forEach(b => {
    const date = b.eventDate || 'Unknown';
    if (!dateMap[date]) dateMap[date] = { pending: 0, confirmed: 0, cancelled: 0 };
    dateMap[date][b.status] = (dateMap[date][b.status] || 0) + 1;
  });
  const dates = Object.keys(dateMap).sort();
  const pending = dates.map(d => dateMap[d].pending || 0);
  const confirmed = dates.map(d => dateMap[d].confirmed || 0);
  const cancelled = dates.map(d => dateMap[d].cancelled || 0);

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Pending',
        data: pending,
        borderColor: 'rgba(251, 191, 36, 1)',
        backgroundColor: 'rgba(251, 191, 36, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Confirmed',
        data: confirmed,
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Cancelled',
        data: cancelled,
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        tension: 0.4,
      },
    ],
  };

  // Dynamic description
  let description = '';
  if (dates.length === 0) {
    description = 'No booking data available.';
  } else {
    const maxPending = Math.max(...pending);
    const maxConfirmed = Math.max(...confirmed);
    const maxCancelled = Math.max(...cancelled);
    const trend = confirmed[confirmed.length - 1] > confirmed[0] ? 'increasing' : 'decreasing';
    description = `This chart shows the number of bookings by status (pending, confirmed, cancelled) for each event date.\n` +
      `The highest number of confirmed bookings on a single day is ${maxConfirmed}. ` +
      `Pending bookings peak at ${maxPending}, and cancelled at ${maxCancelled}. ` +
      `Overall, confirmed bookings are ${trend} over time.`;
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6 flex flex-col items-center w-full h-full">
      <h2 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">Bookings Over Time</h2>
      <p className="text-xs text-slate-600 dark:text-slate-300 mb-2 text-center whitespace-pre-line">{description}</p>
      <div className="w-full h-48">
        <Line data={data} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
}
