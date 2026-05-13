import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './CityMap.css';
import { useCity } from '../context/CityContext';

// Fix for Leaflet default icon issue in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to change map view when city changes
function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

const CityMap = () => {
    const { selectedCity } = useCity();
    const [properties, setProperties] = useState([]);
    const [mapCenter, setMapCenter] = useState([23.2156, 72.6369]); // Default Gandhinagar
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3000/api/properties?city=${selectedCity}&limit=100`);
                const data = await response.json();
                setProperties(data.properties || []);

                // Update map center based on city
                if (selectedCity.toLowerCase() === 'gandhinagar') {
                    setMapCenter([23.2156, 72.6369]);
                } else if (selectedCity.toLowerCase() === 'ahmedabad') {
                    setMapCenter([23.0225, 72.5714]);
                } else if (data.properties && data.properties.length > 0 && data.properties[0].latitude && data.properties[0].longitude) {
                    setMapCenter([parseFloat(data.properties[0].latitude), parseFloat(data.properties[0].longitude)]);
                }
            } catch (error) {
                console.error('Error fetching properties for map:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [selectedCity]);

    return (
        <section className="city-map-container">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="city-map-wrapper">
                            <div className="map-header">
                                <h2>Explore Properties</h2>
                                <span className="city-badge">{selectedCity}</span>
                            </div>
                            <div id="map-container">
                                <MapContainer 
                                    center={mapCenter} 
                                    zoom={12} 
                                    scrollWheelZoom={false}
                                    style={{ height: '100%', width: '100%' }}
                                >
                                    <ChangeView center={mapCenter} zoom={12} />
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    {properties.map(property => (
                                        property.latitude && property.longitude && (
                                            <Marker 
                                                key={property.id} 
                                                position={[parseFloat(property.latitude), parseFloat(property.longitude)]}
                                            >
                                                <Popup>
                                                    <div className="property-popup">
                                                        {property.images && property.images.length > 0 && (
                                                            <img src={property.images[0].imagePath} alt={property.title} />
                                                        )}
                                                        <h3>{property.title}</h3>
                                                        <p>{property.location}</p>
                                                        <div className="price">₹ {parseFloat(property.price).toLocaleString('en-IN')}</div>
                                                        <a href={`/property/${property.id}`} className="btn btn-sm btn-primary mt-2">View Details</a>
                                                    </div>
                                                </Popup>
                                            </Marker>
                                        )
                                    ))}
                                </MapContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CityMap;
