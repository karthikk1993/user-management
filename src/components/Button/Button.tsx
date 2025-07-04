import React from 'react';
import { ButtonProps } from '../../types/UserMgmtTypes';
import './Button.css'

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