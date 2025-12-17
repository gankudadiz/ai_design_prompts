'use client';

import React, { useState } from 'react';

interface InteractiveSliderProps {
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  className?: string;
}

export const InteractiveSlider: React.FC<InteractiveSliderProps> = ({
  defaultValue = 50,
  min = 0,
  max = 100,
  step = 1,
  label = 'Volume',
  className = ''
}) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className={`w-full max-w-xs ${className}`}>
      <label htmlFor="range" className="block mb-2 text-sm font-medium text-text-primary">
        {label}: <span className="text-mint-500 font-mono">{value}</span>
      </label>
      <input
        id="range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full h-2 bg-bg-tertiary rounded-lg appearance-none cursor-pointer accent-mint-500"
      />
      <div className="flex justify-between text-xs text-text-muted mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};
