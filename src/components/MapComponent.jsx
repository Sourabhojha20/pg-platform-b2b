import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';

// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom component to handle map centering and zooming
const RecenterMap = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || 13);
    }
  }, [center, zoom, map]);
  return null;
};

const PropertyMap = ({ properties, center, zoom, height = "400px", highlightedId = null, minimal = false }) => {
  const navigate = useNavigate();

  // Default center if none provided (center of India or first property)
  const mapCenter = center || (properties.length > 0 && properties[0].location?.lat 
    ? [properties[0].location.lat, properties[0].location.lng] 
    : [23.2599, 77.4126]);

  const mapZoom = zoom || (highlightedId ? 15 : 5);

  return (
    <div style={{ height, width: '100%', borderRadius: minimal ? '0px' : '12px', overflow: 'hidden', boxShadow: minimal ? 'none' : '0 4px 12px rgba(0,0,0,0.1)' }}>
      <MapContainer 
        center={mapCenter} 
        zoom={mapZoom} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={!minimal}
        zoomControl={!minimal}
        attributionControl={!minimal}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        <RecenterMap center={mapCenter} zoom={mapZoom} />

        {properties.map((property) => {
          if (!property.location?.lat || !property.location?.lng) return null;
          
          const isActive = property._id === highlightedId;
          
          // Custom icon for active property if needed
          const icon = new L.Icon({
            iconUrl: isActive 
              ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png'
              : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: isActive ? [35, 55] : [25, 41],
            iconAnchor: isActive ? [17, 55] : [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

          return (
            <Marker 
              key={property._id} 
              position={[property.location.lat, property.location.lng]}
              icon={icon}
            >
              <Popup className="property-popup">
                <div className="map-popup-card">
                  <div className="popup-image-wrapper">
                    <img 
                      src={property.images?.[0]?.url || property.coverImage || 'https://placehold.co/260x150?text=Property'} 
                      alt={property.pgName}
                      className="popup-image"
                    />
                    <div className="popup-badge">
                      {property.genderPreference === 'male' ? 'Boys' : property.genderPreference === 'female' ? 'Girls' : 'Co-ed'}
                    </div>
                  </div>
                  
                  <div className="popup-body">
                    <h6 className="popup-title">{property.pgName || property.title}</h6>
                    <div className="popup-location">
                      <i className="fas fa-map-marker-alt"></i> {property.location?.area}
                    </div>
                    
                    <div className="popup-footer">
                      <div className="popup-price-info">
                        <span className="popup-price">₹{property.minPrice?.toLocaleString()}</span>
                        <span className="popup-unit">/mo</span>
                      </div>
                      <button 
                        className="popup-btn"
                        onClick={() => navigate(`/property/${property._id}`)}
                      >
                        View Details <i className="fas fa-chevron-right ms-1"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
