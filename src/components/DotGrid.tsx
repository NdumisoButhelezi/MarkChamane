import React from 'react';

// This is a simple dot grid for the button effect
export const DotGrid = () => (
  <div className="absolute inset-0 flex flex-wrap z-0 pointer-events-none">
    {Array.from({ length: 13 * 13 }).map((_, i) => (
      <span
        key={i}
        className="dot w-1 h-1 m-0.5 rounded-full bg-amber-300 opacity-40"
        style={{
          width: '0.25rem',
          height: '0.25rem',
        }}
      />
    ))}
  </div>
);
