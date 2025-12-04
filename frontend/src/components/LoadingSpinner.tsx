import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading...',
  fullScreen = false,
}) => {
  const spinnerContent = (
    <>
      <div className="spinner">
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
      </div>
      {message && <p className="loading-message">{message}</p>}
    </>
  );

  if (fullScreen) {
    return <div className="loading-spinner fullscreen">{spinnerContent}</div>;
  }

  return <div className="loading-spinner">{spinnerContent}</div>;
};

export default LoadingSpinner;
