import React, { useState } from 'react';

const PremiumImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="premium-carousel-container">
      <div 
        className="premium-carousel-inner"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => (
          <img key={idx} src={img} alt={`Property view ${idx + 1}`} className="premium-carousel-img" />
        ))}
      </div>
      
      <button className="carousel-btn prev-btn" onClick={prevSlide} aria-label="Previous image">
        <i className="fa fa-angle-left"></i>
      </button>
      <button className="carousel-btn next-btn" onClick={nextSlide} aria-label="Next image">
        <i className="fa fa-angle-right"></i>
      </button>

      <div className="carousel-indicators">
        {images.map((_, idx) => (
          <span 
            key={idx} 
            className={`indicator ${currentIndex === idx ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default PremiumImageCarousel;
