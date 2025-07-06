import React from 'react';
import { ButtonProps } from '../../types/UserMgmtTypes';
import './Button.css'

// reuseable button component to use across the application
const Button = ({ 
  children, 
  onClick, 
  disabled = false,
  className = ''
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`action-btn ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;