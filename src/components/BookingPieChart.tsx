import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

interface BookingPieChartProps {
  pending: number;
  confirmed: number;
  cancelled: number;
}

export default function BookingPieChart({ pending, confirmed, cancelled }: BookingPieChartProps) {
  const data = {
    labels: ['Pending', 'Confirmed', 'Cancelled'],
    datasets: [
      {
        data: [pending, confirmed, cancelled],
        backgroundColor: [
          'rgba(251, 191, 36, 0.8)', // amber-400
          'rgba(34, 197, 94, 0.8)',  // green-500
          'rgba(239, 68, 68, 0.8)',  // red-500
        ],
        borderColor: [
          'rgba(251, 191, 36, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6 flex flex-col items-center">
      <h2 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">Booking Status Breakdown</h2>
      <Pie data={data} />
    </div>
  );
}
