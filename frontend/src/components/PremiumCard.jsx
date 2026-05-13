import React from 'react';
import PremiumImageCarousel from './PremiumImageCarousel';

const PremiumCard = ({ property }) => {
  // Handle backend image structure (array of objects with imageUrl) vs old array of strings
  const displayImages = property.images?.map(img => typeof img === 'string' ? img : img.imageUrl) || [];
  
  return (
    <div className="premium-card glass-effect">
      <div className="premium-card-image-wrapper">
        <PremiumImageCarousel images={displayImages} />
        <div className="premium-badges">
          <span className="badge for-sale">{property.status || 'For Sale'}</span>
          {property.featured && <span className="badge featured-badge"><i className="fa fa-star"></i> Featured</span>}
        </div>
      </div>
      
      <div className="premium-card-body">
        <div className="price-tag">
          {typeof property.price === 'number' ? `$${property.price.toLocaleString()}` : property.price}
        </div>
        <h3 className="property-title"><a href="#">{property.title}</a></h3>
        <p className="property-location">
          <i className="fa fa-map-marker"></i> {property.location}
        </p>
        
        <div className="property-amenities">
          <div className="amenity">
            <i className="fa fa-bed"></i>
            <span>{property.no_of_bedrooms || property.beds || 0} Beds</span>
          </div>
          <div className="amenity">
            <i className="fa fa-bath"></i>
            <span>{property.no_of_bathrooms || property.baths || 0} Baths</span>
          </div>
          <div className="amenity">
            <i className="fa fa-arrows-alt"></i>
            <span>{property.area || property.sqft || 0} SqFt</span>
          </div>
        </div>
        
        <div className="premium-card-footer">
          <div className="agent-info">
            <img src="assets/images/agent/agent-1.jpg" alt="Agent" className="agent-avatar" onError={(e) => e.target.style.display = 'none'} />
            <span className="agent-name">{property.owner?.username || 'Sarah Jenkins'}</span>
          </div>
          <button className="premium-btn primary-btn glass-btn">Details <i className="fa fa-arrow-right"></i></button>
        </div>
      </div>
    </div>
  );
};

export default PremiumCard;
