import React, { useState } from 'react';
import { Home, Bath, Sun } from 'lucide-react';

const StepRoomConfig = ({ data, updateData }) => {
  const [roomTypes, setRoomTypes] = useState(data.roomTypes || []);

  const toggleRoomType = (type) => {
    let updated;
    if (roomTypes.includes(type)) {
      updated = roomTypes.filter(t => t !== type);
    } else {
      updated = [...roomTypes, type];
    }
    setRoomTypes(updated);
    updateData({ roomTypes: updated });
  };

  const handleChange = (e) => {
    updateData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="step-room-config">
      <h5 className="mb-3 fw-semibold">Room Configuration</h5>
      <p className="text-muted small mb-4">Configure room types and features</p>
      
      <div className="row g-3">
        <div className="col-12">
          <label className="form-label small fw-medium text-muted mb-2">Room Types *</label>
          <div className="d-flex gap-3 flex-wrap">
            {['Single', 'Double', 'Triple', 'Dormitory'].map(type => (
              <div key={type} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={type}
                  checked={roomTypes.includes(type)}
                  onChange={() => toggleRoomType(type)}
                />
                <label className="form-check-label small" htmlFor={type}>
                  {type === 'Single' && '👤 '}
                  {type === 'Double' && '👥 '}
                  {type === 'Triple' && '👥👤 '}
                  {type === 'Dormitory' && '🏘️ '}
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label small fw-medium text-muted">Room Size</label>
          <input
            type="text"
            className="form-control form-control-sm"
            name="roomSize"
            value={data.roomSize || ''}
            onChange={handleChange}
            placeholder="e.g., 200 sq ft"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label small fw-medium text-muted">Attached Bathroom</label>
          <select 
            className="form-select form-select-sm"
            name="attachedBathroom"
            value={data.attachedBathroom || 'No'}
            onChange={handleChange}
          >
            <option value="Yes">✅ Yes</option>
            <option value="No">❌ No</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label small fw-medium text-muted">Balcony</label>
          <select 
            className="form-select form-select-sm"
            name="balcony"
            value={data.balcony || 'No'}
            onChange={handleChange}
          >
            <option value="Yes">✅ Yes</option>
            <option value="No">❌ No</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default StepRoomConfig;