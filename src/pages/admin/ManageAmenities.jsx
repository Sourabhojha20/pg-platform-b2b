import React, { useState } from 'react';
import { Plus, Trash2, Save, Search, Edit, Wifi, Coffee, Wind, Shield, Zap, Car, Camera, Dumbbell, Sparkles, Tag, AlertCircle } from 'lucide-react';
import { mockAmenities } from '../../utils/mockData';

const ManageAmenities = () => {
  const [amenities, setAmenities] = useState(mockAmenities);
  const [newAmenity, setNewAmenity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  const addAmenity = () => {
    if (newAmenity.trim() && !amenities.includes(newAmenity.trim())) {
      setAmenities([...amenities, newAmenity.trim()]);
      setNewAmenity('');
    } else if (newAmenity.trim() && amenities.includes(newAmenity.trim())) {
      alert('This amenity already exists!');
    }
  };

  const deleteAmenity = (index) => {
    if (window.confirm(`Are you sure you want to delete "${amenities[index]}"?`)) {
      const updated = amenities.filter((_, i) => i !== index);
      setAmenities(updated);
    }
  };

  const startEdit = (index, value) => {
    setEditingIndex(index);
    setEditingValue(value);
  };

  const saveEdit = (index) => {
    if (editingValue.trim() && !amenities.includes(editingValue.trim())) {
      const updated = [...amenities];
      updated[index] = editingValue.trim();
      setAmenities(updated);
      setEditingIndex(null);
      setEditingValue('');
    } else if (editingValue.trim() && amenities.includes(editingValue.trim())) {
      alert('This amenity already exists!');
    }
  };

  const saveChanges = () => {
    window.dummyDataStorage.setItem('amenities', JSON.stringify(amenities));
    alert('✅ Amenities saved successfully!');
  };

  const filteredAmenities = amenities.filter(amenity =>
    amenity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAmenityIcon = (amenity) => {
    const iconMap = {
      'wifi': <Wifi size={18} />,
      'ac': <Wind size={18} />,
      'coffee': <Coffee size={18} />,
      'security': <Shield size={18} />,
      'power': <Zap size={18} />,
      'parking': <Car size={18} />,
      'cctv': <Camera size={18} />,
      'gym': <Dumbbell size={18} />
    };
    
    for (const [key, icon] of Object.entries(iconMap)) {
      if (amenity.toLowerCase().includes(key)) {
        return icon;
      }
    }
    return <Tag size={18} />;
  };

  const getRandomColor = (index) => {
    const colors = [
      '#e0e7ff', '#d1fae5', '#fed7aa', '#fee2e2', '#dbeafe', '#f3e8ff', '#ffe4e6', '#ccfbf1'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="fade-in-up">
      

      {/* Add New Amenity Section */}
      <div className="modern-card mb-4">
        <div className="card-header-modern">
          <h5 className="mb-0 d-flex align-items-center gap-2">
            <Plus size={18} />
            Add New Amenity
          </h5>
        </div>
        <div className="card-body p-4">
          <div className="row">
            <div className="col-md-8">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control-premium"
                  placeholder="Enter amenity name (e.g., Swimming Pool, Game Room, etc.)"
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addAmenity()}
                />
                <button className="btn-premium" onClick={addAmenity}>
                  <Plus size={16} className="me-1" /> Add Amenity
                </button>
              </div>
              <div className="text-muted text-xs mt-2">
                💡 Tip: Add unique amenities like "Swimming Pool", "Gaming Zone", "Study Room"
              </div>
            </div>
            <div className="col-md-4">
              <div className="navbar-search">
                <Search className="search-icon" size={18} />
                <input
                  type="text"
                  className="form-control-premium"
                  placeholder="Search amenities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Amenities Grid */}
      <div className="modern-card">
        <div className="card-header-modern d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Current Amenities ({filteredAmenities.length})</h5>
          <button className="btn-outline-premium btn-sm" onClick={() => setSearchTerm('')}>
            Clear Search
          </button>
        </div>
        <div className="card-body p-4">
          {filteredAmenities.length === 0 ? (
            <div className="text-center py-5">
              <Tag size={60} className="text-muted mb-3" />
              <h5 className="mb-2">No amenities found</h5>
              <p className="text-muted mb-0">Try a different search term or add new amenities</p>
            </div>
          ) : (
            <div className="row">
              {filteredAmenities.map((amenity, index) => (
                <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-3">
                  <div className="amenity-card">
                    <div className="amenity-icon" style={{ background: getRandomColor(index) }}>
                      {getAmenityIcon(amenity)}
                    </div>
                    <div className="amenity-content">
                      {editingIndex === index ? (
                        <input
                          type="text"
                          className="form-control-modern form-control-sm"
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && saveEdit(index)}
                          autoFocus
                        />
                      ) : (
                        <div className="amenity-name">{amenity}</div>
                      )}
                    </div>
                    <div className="amenity-actions">
                      {editingIndex === index ? (
                        <button 
                          className="btn-icon-sm btn-success"
                          onClick={() => saveEdit(index)}
                          title="Save"
                        >
                          <Save size={14} />
                        </button>
                      ) : (
                        <button 
                          className="btn-icon-sm btn-outline-premium"
                          onClick={() => startEdit(index, amenity)}
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                      )}
                      <button 
                        className="btn-icon-sm text-danger"
                        onClick={() => deleteAmenity(amenities.findIndex(a => a === amenity))}
                        title="Delete"
                        style={{ background: 'transparent', border: 'none' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Popular Suggestions */}
      <div className="modern-card mt-4">
        <div className="card-header-modern">
          <h5 className="mb-0 d-flex align-items-center gap-2">
            <Sparkles size={18} />
            Popular Amenity Suggestions
          </h5>
        </div>
        <div className="card-body p-4">
          <div className="d-flex flex-wrap gap-2">
            {['Swimming Pool', 'Game Room', 'Study Room', 'Meditation Area', 'Rooftop Lounge', 'Library', 'Theatre Room', 'Sports Facility'].map((suggestion, idx) => (
              <button
                key={idx}
                className="btn-outline-premium btn-sm"
                onClick={() => {
                  if (!amenities.includes(suggestion)) {
                    setAmenities([...amenities, suggestion]);
                  } else {
                    alert('This amenity already exists!');
                  }
                }}
              >
                <Plus size={12} className="me-1" />
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAmenities;