import React, { useEffect, useState } from 'react';
import '../styles/components.css';

export default function Notification({ type = 'success', message, duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Allow fade out animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠'
  };

  return (
    <div className={`notification notification-${type} ${isVisible ? 'notification-enter' : 'notification-exit'}`}>
      <span className="notification-icon">{icons[type]}</span>
      <span className="notification-message">{message}</span>
      <button className="notification-close" onClick={() => { setIsVisible(false); setTimeout(onClose, 300); }} aria-label="Close notification">×</button>
    </div>
  );
}
