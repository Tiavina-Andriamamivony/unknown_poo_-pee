"use client";

import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import '../styles/heatmap.css'; // Import default styles

const PoopHeatmap: React.FC = () => {
  const data = [
    { date: '2024-01-01', value: 4 }, // 3 poops on January 1st
    { date: '2024-01-02', value: 1 }, // 1 poop on January 2nd
    { date: '2024-01-03', value: 3 }, // 4 poops on January 3rd
    { date: '2024-01-04', value: 0 }, // 0 poops on January 4th
    { date: '2024-02-05', value: 2 }, // 2 poops on January 5th
  ];

  return (
    <div className="heatmap-container">
      <CalendarHeatmap
        startDate={new Date('2023-12-31')}
        endDate={new Date('2024-12-31')}
        values={data}
        classForValue={(day) => {
            if(!day || day.value == 0) {
                return 'color-empty';
            }
            return `color-scale-${day.value}`;
        }}
        tooltipDataAttrs={() => {
            return { rx: "3", ry: "3"};
        }}
      />
    </div>
  );
};

export default PoopHeatmap;

