import React from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null; // If the popup is not open, don't render anything
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {children}
        <button  className="close-btn btn btn-primary Cancel" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="popup-overlay" onClick={onClose}></div>
    </div>
  );
};

export default Popup;
