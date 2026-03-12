import React from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, children, onClose, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClass = {
    sm: 'modal-sm',
    md: 'modal-md',
    lg: 'modal-lg',
  }[size];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={`modal-content ${sizeClass}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
