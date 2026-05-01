import React, { useState } from 'react';
import { Wifi, Wind, Coffee, Shield, Zap, Car, Camera, Dumbbell, Plus } from 'lucide-react';
import { mockAmenities } from '../../utils/mockData';

const StepAmenities = ({ data, updateData }) => {
  const [selectedAmenities, setSelectedAmenities] = useState(data.amenities || []);

  const toggleAmenity = (amenity) => {
    let updated;
    if (selectedAmenities.includes(amenity)) {
      updated = selectedAmenities.filter(a => a !== amenity);
    } else {
      updated = [...selectedAmenities, amenity];
    }
    setSelectedAmenities(updated);
    updateData({ amenities: updated });
  };

  const getAmenityIcon = (amenity) => {
    const name = amenity.toLowerCase();
    if (name.includes('wifi')) return <Wifi size={14} />;
    if (name.includes('ac')) return <Wind size={14} />;
    if (name.includes('food') || name.includes('coffee')) return <Coffee size={14} />;
    if (name.includes('security')) return <Shield size={14} />;
    if (name.includes('power')) return <Zap size={14} />;
    if (name.includes('parking')) return <Car size={14} />;
    if (name.includes('cctv')) return <Camera size={14} />;
    if (name.includes('gym')) return <Dumbbell size={14} />;
    return null;
  };

  return (
    <div className="step-amenities">
      <h5 className="mb-3 fw-semibold">Amenities & Facilities</h5>
      <p className="text-muted small mb-4">Select all amenities available at your property</p>
      
      <div className="row g-2 mb-4">
        {mockAmenities.map(amenity => (
          <div key={amenity} className="col-md-3 col-sm-4 col-6">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={amenity}
                checked={selectedAmenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
              />
              <label className="form-check-label small" htmlFor={amenity}>
                {getAmenityIcon(amenity)}
                <span className="ms-1">{amenity}</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3">
        <label className="form-label small fw-medium text-muted">Additional Amenities</label>
        <div className="input-group">
          <span className="input-group-text bg-light">
            <Plus size={14} />
          </span>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Add custom amenities (comma separated)"
            onBlur={(e) => {
              if (e.target.value) {
                const customAmenities = e.target.value.split(',').map(a => a.trim());
                const allAmenities = [...selectedAmenities, ...customAmenities];
                setSelectedAmenities([...new Set(allAmenities)]);
                updateData({ amenities: [...new Set(allAmenities)] });
                e.target.value = '';
              }
            }}
          />
        </div>
        <small className="text-muted">Example: Swimming Pool, Game Room, Study Area</small>
      </div>

      {selectedAmenities.length > 0 && (
        <div className="mt-3 p-2 bg-light rounded">
          <small className="text-muted">✓ {selectedAmenities.length} amenities selected</small>
        </div>
      )}
    </div>
  );
};

export default StepAmenities;