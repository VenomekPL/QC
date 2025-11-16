import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import '../styles/components.css';

export default function QRCode({ value, size = 128 }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="qrcode-wrapper">
      <button 
        className="qrcode-trigger" 
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? 'Hide QR code' : 'Show QR code'}
      >
        {isExpanded ? '−' : 'QR'}
      </button>
      {isExpanded && (
        <div className="qrcode-expanded">
          <QRCodeSVG 
            value={value} 
            size={size}
            bgColor="var(--color-bg-qr)"
            fgColor="var(--color-text-inverse)"
          />
        </div>
      )}
    </div>
  );
}
