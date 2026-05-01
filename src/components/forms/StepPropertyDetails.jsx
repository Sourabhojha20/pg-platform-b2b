import React from 'react';
import { Home, Users, Building } from 'lucide-react';

const StepPropertyDetails = ({ data, updateData }) => {
  const handleChange = (e) => {
    updateData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="step-property-details">
      <h5 className="mb-3 fw-semibold">Property Specifications</h5>
      <p className="text-muted small mb-4">Tell us about the structure and capacity of your {data.propertyType || 'property'}</p>
      
      <div className="row g-3">
        {/* Sub-category for Home Stay */}
        {(data.propertyType === 'Home Stay' || data.propertyType === 'Service Apartment') && (
          <div className="col-md-12">
            <label className="form-label small fw-bold text-primary">Configuration Details *</label>
            <select 
              className="form-select form-select-sm border-primary border-opacity-25"
              name="propertySubCategory"
              value={data.propertySubCategory || ''}
              onChange={handleChange}
            >
              <option value="">Select Configuration</option>
              <option value="1 BHK">1 BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="4 BHK">4 BHK</option>
              <option value="Independent House">Independent House</option>
            </select>
          </div>
        )}

        <div className="col-md-12">
          <label className="form-label small fw-bold text-dark">Gender Allowed *</label>
          <div className="premium-radio-group">
            {[
              { val: 'Boys Only', label: '👨 Boys Only' },
              { val: 'Girls Only', label: '👩 Girls Only' },
              { val: 'Unisex / Co-ed', label: '👥 Unisex / Co-ed' }
            ].map((opt) => (
              <label key={opt.val} className="premium-radio-item">
                <input
                  type="radio"
                  name="genderAllowed"
                  value={opt.val}
                  checked={data.genderAllowed === opt.val}
                  onChange={handleChange}
                />
                <span className="premium-radio-label sm">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label small fw-bold text-dark">Total No of Beds *</label>
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-light">
              <Users size={14} />
            </span>
            <input
              type="number"
              className="form-control"
              name="totalBeds"
              value={data.totalBeds || ''}
              onChange={handleChange}
              placeholder="Total beds in property"
            />
          </div>
        </div>

        <div className="col-md-4">
          <label className="form-label small fw-medium text-muted">Total Floors</label>
          <input
            type="number"
            className="form-control form-control-sm"
            name="totalFloors"
            value={data.totalFloors || ''}
            onChange={handleChange}
            placeholder="e.g., 3"
          />
        </div>

        <div className="col-md-4">
          <label className="form-label small fw-medium text-muted">Property Floor</label>
          <input
            type="text"
            className="form-control form-control-sm"
            name="floorNumber"
            value={data.floorNumber || ''}
            onChange={handleChange}
            placeholder="Ground, 1st, etc."
          />
        </div>

        <div className="col-md-4">
          <label className="form-label small fw-medium text-muted">Total Rooms</label>
          <input
            type="number"
            className="form-control form-control-sm"
            name="totalRooms"
            value={data.totalRooms || ''}
            onChange={handleChange}
            placeholder="e.g. 10"
          />
        </div>
      </div>
    </div>
  );
};

export default StepPropertyDetails;