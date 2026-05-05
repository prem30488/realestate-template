import React from 'react';
import PremiumCard from './PremiumCard';
import './PremiumStyles.css';

const dummyProperties = [
  {
    id: 1,
    title: "Luxury Glass Villa",
    price: "$2,500,000",
    location: "Beverly Hills, CA",
    beds: 5,
    baths: 4,
    sqft: "4,500",
    status: "For Sale",
    images: [
      "assets/images/property/property-1.jpg",
      "assets/images/property/property-2.jpg",
      "assets/images/property/property-3.jpg",
    ]
  },
  {
    id: 2,
    title: "Modern Sky Penthouse",
    price: "$1,850,000",
    location: "Manhattan, NY",
    beds: 3,
    baths: 3,
    sqft: "2,800",
    status: "For Rent",
    images: [
      "assets/images/property/property-4.jpg",
      "assets/images/property/property-5.jpg",
      "assets/images/property/property-6.jpg",
    ]
  },
  {
    id: 3,
    title: "Oceanfront Estate",
    price: "$5,200,000",
    location: "Miami Beach, FL",
    beds: 7,
    baths: 8,
    sqft: "8,200",
    status: "For Sale",
    images: [
      "assets/images/property/property-7.jpg",
      "assets/images/property/property-8.jpg",
      "assets/images/property/property-9.jpg",
    ]
  }
];

const Featured = () => {
  return (
    <section className="featured-section section pt-100 pb-100 dark-theme-bg">
      <div className="container">
        <div className="row mb-50">
          <div className="col-12 text-center">
            <h2 className="premium-heading">Featured Properties</h2>
            <div className="premium-heading-divider"></div>
            <p className="premium-subheading">Discover our curated selection of exclusive real estate with modern architecture and breathtaking views.</p>
          </div>
        </div>
        <div className="row">
          {dummyProperties.map(property => (
            <div className="col-lg-4 col-md-6 col-12 mb-40" key={property.id}>
              <PremiumCard property={property} />
            </div>
          ))}
        </div>
        <div className="row mt-20">
          <div className="col-12 text-center">
            <button className="premium-btn secondary-btn outline-glow">View All Properties <i className="fa fa-long-arrow-right"></i></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
