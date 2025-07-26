import React from 'react';
import './layout.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <main className="main-content">
        { children }
      </main>
    </div>
  );
}