import React from 'react';
import '../styles/components.css';

export default function Tabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab ${activeTab === tab ? 'tab-active' : ''}`}
          onClick={() => onTabChange(tab)}
          role="tab"
          aria-selected={activeTab === tab}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
