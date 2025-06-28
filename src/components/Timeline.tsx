import React from 'react';

export function Timeline({ children }: { children: React.ReactNode }) {
  return (
    <ol className="relative ml-4">
      {children}
    </ol>
  );
}

export function TimelineItem({ year, icon, children }: { year: string; icon?: React.ReactNode | string; children: React.ReactNode }) {
  // Extract emoji if present at the start of the year string
  let emoji = null;
  let label = year;
  const emojiMatch = year.match(/^([\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}])\s+/u);
  if (emojiMatch) {
    emoji = emojiMatch[1];
    label = year.replace(emoji, '').trim();
  }
  return (
    <li className="mb-10 ml-0 flex items-start">
      <span className="flex items-center justify-center w-10 h-10 bg-amber-400 dark:bg-amber-600 rounded-full text-2xl mr-4 mt-1">
        {emoji ? <span>{emoji}</span> : icon}
      </span>
      <div>
        <h3 className="flex items-center mb-1 text-lg font-semibold text-slate-900 dark:text-white">
          {label}
        </h3>
        <p className="mb-4 text-base font-normal text-slate-700 dark:text-slate-300">
          {children}
        </p>
      </div>
    </li>
  );
}
