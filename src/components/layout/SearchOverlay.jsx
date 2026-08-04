import React, { useEffect, useRef } from 'react';

const SearchOverlay = ({ isOpen, onClose }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`search-overlay ${isOpen ? 'active' : ''}`}
      id="search-overlay"
      onClick={(e) => {
        if (e.target.id === 'search-overlay') onClose();
      }}
    >
      <div className="search-modal">
        <input
          type="text"
          className="search-input"
          placeholder="Search portfolio..."
          id="search-input"
          ref={inputRef}
        />
        <button type="button" className="search-close-btn" id="search-close" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default SearchOverlay;
