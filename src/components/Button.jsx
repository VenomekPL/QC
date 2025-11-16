import React from 'react';
import '../styles/components.css';

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false, 
  children,
  type = 'button',
  className = ''
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    disabled && 'btn-disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      type={type}
      className={classes} 
      onClick={onClick} 
      disabled={disabled}
    >
      {children}
    </button>
  );
}
