import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Box, Typography, Button, Grid } from '@mui/material';
import 'leaflet/dist/leaflet.css';

// Component to handle map clicks
const MapClickHandler = ({ onMapClick, latitude, longitude }) => {
    const map = useMapEvents({
        click: (e) => {
            const { lat, lng } = e.latlng;
            onMapClick(lat, lng);
        }
    });

    return latitude && longitude ? (
        <Marker position={[latitude, longitude]} />
    ) : null;
};

const MapPicker = ({ latitude, longitude, onCoordinateSelect, defaultCity = null }) => {
    const [mapLat, setMapLat] = useState(latitude || 23.0225); // Default to Ahmedabad
    const [mapLng, setMapLng] = useState(longitude || 72.5714);
    const [markerLat, setMarkerLat] = useState(latitude || null);
    const [markerLng, setMarkerLng] = useState(longitude || null);

    // Update map center when latitude/longitude change from form
    useEffect(() => {
        if (latitude && longitude) {
            setMapLat(latitude);
            setMapLng(longitude);
            setMarkerLat(latitude);
            setMarkerLng(longitude);
        }
    }, [latitude, longitude]);

    const handleMapClick = (lat, lng) => {
        setMarkerLat(lat);
        setMarkerLng(lng);
        setMapLat(lat);
        setMapLng(lng);
    };

    const handleSetCoordinate = () => {
        if (markerLat && markerLng) {
            onCoordinateSelect(markerLat, markerLng);
        }
    };

    const handleRecenter = () => {
        // Default centers for common Indian cities
        const centers = {
            'Ahmedabad': { lat: 23.0225, lng: 72.5714 },
            'Gandhinagar': { lat: 23.1815, lng: 72.6365 },
            'India': { lat: 20.5937, lng: 78.9629 }
        };

        const center = centers[defaultCity] || centers['India'];
        setMapLat(center.lat);
        setMapLng(center.lng);
        setMarkerLat(null);
        setMarkerLng(null);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#666' }}>
                Click on the map to select location
            </Typography>

            <Box
                sx={{
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    height: '400px',
                    mb: 2
                }}
            >
                <MapContainer
                    center={[mapLat, mapLng]}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <MapClickHandler
                        onMapClick={handleMapClick}
                        latitude={markerLat}
                        longitude={markerLng}
                    />
                </MapContainer>
            </Box>

            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleRecenter}
                        sx={{ color: '#666', borderColor: '#ddd' }}
                    >
                        Recenter Map
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSetCoordinate}
                        disabled={!markerLat || !markerLng}
                        sx={{
                            bgcolor: '#6a11cb',
                            '&:hover': { bgcolor: '#2575fc' },
                            '&:disabled': { bgcolor: '#ccc' }
                        }}
                    >
                        Confirm Location
                    </Button>
                </Grid>
            </Grid>

            {markerLat && markerLng && (
                <Box sx={{ p: 1, bgcolor: '#f5f5f5', borderRadius: '8px' }}>
                    <Typography variant="caption" sx={{ color: '#666' }}>
                        Selected: {markerLat.toFixed(6)}, {markerLng.toFixed(6)}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default MapPicker;
