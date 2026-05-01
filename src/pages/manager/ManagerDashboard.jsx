import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Phone, 
  Eye, 
  Users, 
  Calendar,
  CheckCircle,
  Clock,
  Activity,
  Home
} from 'lucide-react';
import { mockListings } from '../../utils/mockData';

const ManagerDashboard = () => {
  const [manager, setManager] = useState(null);
  const [assignedProperties, setAssignedProperties] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadManagerData();
  }, []);

  const loadManagerData = () => {
    // Get logged in manager from window.dummyDataStorage
    const loggedManager = JSON.parse(window.dummyDataStorage.getItem('loggedManager') || '{}');
    
    if (!loggedManager || Object.keys(loggedManager).length === 0) {
      // For demo purposes, if no manager is logged in, you can set a default
      console.log('No manager logged in');
      setLoading(false);
      return;
    }
    
    setManager(loggedManager);
    setPermissions(loggedManager.permissions || {});
    
    // Get all properties from mock data
    const listings = mockListings;
    
    // Filter properties assigned to this manager
    const assigned = listings.filter(p => 
      loggedManager.assignedProperties?.includes(p.id)
    );
    
    console.log('Logged Manager:', loggedManager.name);
    console.log('Assigned Properties:', assigned.map(p => p.pgName));
    
    setAssignedProperties(assigned);
    setLoading(false);
  };

  // Calculate stats only for assigned properties
  const stats = {
    totalProperties: assignedProperties.length,
    totalRooms: assignedProperties.reduce((acc, p) => acc + (p.totalRooms || 0), 0),
    totalBeds: assignedProperties.reduce((acc, p) => acc + (p.totalBeds || 0), 0),
    availableBeds: assignedProperties.reduce((acc, p) => acc + (p.availableBeds || 0), 0),
    totalLeads: assignedProperties.reduce((acc, p) => acc + (p.leads?.length || 0), 0),
    totalViews: assignedProperties.reduce((acc, p) => acc + (p.views || 0), 0)
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading dashboard...</p>
      </div>
    );
  }

  if (!manager || Object.keys(manager).length === 0) {
    return (
      <div className="text-center py-5">
        <Building2 size={50} className="text-muted mb-3" />
        <h5 className="mb-2">No Manager Session Found</h5>
        <p className="text-muted small">Please login as a manager to access this dashboard</p>
      </div>
    );
  }

  return (
    <div className="fade-in-up">
      {/* Welcome Header */}
      <div className="mb-4">
        <h3 className="mb-1">Welcome back, {manager.name}! 👋</h3>
        <p className="text-muted small mb-0">
          You have access to {assignedProperties.length} property {assignedProperties.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Stats Cards - Only if permission allows */}
      {(permissions.viewDashboard !== false) && (
        <div className="row mb-4">
          <div className="col-md-3 col-sm-6 mb-3">
            <div className="stats-card-small">
              <div className="stats-card-small-content">
                <div className="stats-card-small-left">
                  <div className="stats-icon-small" style={{ background: '#e0e7ff' }}>
                    <Building2 size={14} color="#4f46e5" />
                  </div>
                  <div className="stats-info-small">
                    <div className="stats-number-small">{stats.totalProperties}</div>
                    <div className="stats-label-small">Assigned Properties</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3">
            <div className="stats-card-small">
              <div className="stats-card-small-content">
                <div className="stats-card-small-left">
                  <div className="stats-icon-small" style={{ background: '#d1fae5' }}>
                    <Home size={14} color="#10b981" />
                  </div>
                  <div className="stats-info-small">
                    <div className="stats-number-small">{stats.totalBeds}</div>
                    <div className="stats-label-small">Total Beds</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3">
            <div className="stats-card-small">
              <div className="stats-card-small-content">
                <div className="stats-card-small-left">
                  <div className="stats-icon-small" style={{ background: '#d1fae5' }}>
                    <CheckCircle size={14} color="#10b981" />
                  </div>
                  <div className="stats-info-small">
                    <div className="stats-number-small">{stats.availableBeds}</div>
                    <div className="stats-label-small">Available Beds</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3">
            <div className="stats-card-small">
              <div className="stats-card-small-content">
                <div className="stats-card-small-left">
                  <div className="stats-icon-small" style={{ background: '#fed7aa' }}>
                    <Phone size={14} color="#f59e0b" />
                  </div>
                  <div className="stats-info-small">
                    <div className="stats-number-small">{stats.totalLeads}</div>
                    <div className="stats-label-small">Total Leads</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3">
            <div className="stats-card-small">
              <div className="stats-card-small-content">
                <div className="stats-card-small-left">
                  <div className="stats-icon-small" style={{ background: '#dbeafe' }}>
                    <Eye size={14} color="#3b82f6" />
                  </div>
                  <div className="stats-info-small">
                    <div className="stats-number-small">{stats.totalViews.toLocaleString()}</div>
                    <div className="stats-label-small">Total Views</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assigned Properties List */}
      <div className="modern-card">
        <div className="card-header-modern">
          <span className="fw-semibold">My Assigned Properties</span>
        </div>
        <div className="table-responsive">
          <table className="table-modern">
            <thead>
              <tr>
                <th>Property Name</th>
                <th>Location</th>
                <th>Total Beds</th>
                <th>Available Beds</th>
                <th>Occupancy Rate</th>
                {(permissions.viewLeads !== false) && <th>Leads</th>}
                {(permissions.viewAnalytics !== false) && <th>Views</th>}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignedProperties.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-5">
                    <Building2 size={50} className="text-muted mb-3" />
                    <h6>No properties assigned</h6>
                    <p className="text-muted small">You haven't been assigned any properties yet</p>
                    <button 
                      className="btn-premium mt-3"
                      onClick={() => window.location.href = '/login'}
                    >
                      Login as different manager
                    </button>
                  </td>
                </tr>
              ) : (
                assignedProperties.map(property => {
                  const occupancyRate = property.totalBeds > 0 
                    ? Math.round(((property.totalBeds - property.availableBeds) / property.totalBeds) * 100)
                    : 0;
                  
                  return (
                    <tr key={property.id}>
                      <td className="fw-600">{property.pgName}
                        <div className="text-muted" style={{ fontSize: '10px' }}>{property.propertyType}</div>
                      </td>
                      <td className="small">
                        {property.city}, {property.state}
                        <div className="text-muted" style={{ fontSize: '10px' }}>{property.address?.split(',')[0]}</div>
                      </td>
                      <td className="small text-center">{property.totalBeds || 0}</td>
                      <td className="small text-center">{property.availableBeds || 0}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="progress flex-grow-1" style={{ height: '4px', width: '80px' }}>
                            <div 
                              className="progress-bar bg-success" 
                              style={{ width: `${occupancyRate}%` }}
                            ></div>
                          </div>
                          <span className="small">{occupancyRate}%</span>
                        </div>
                      </td>
                      {(permissions.viewLeads !== false) && (
                        <td className="small text-center">{property.leads?.length || 0}</td>
                      )}
                      {(permissions.viewAnalytics !== false) && (
                        <td className="small text-center">{property.views || 0}</td>
                      )}
                      <td>
                        <div className="d-flex gap-2">
                          <button className="btn-outline-premium btn-sm">View Details</button>
                          {(permissions.updateAvailability !== false) && (
                            <button className="btn-outline-premium btn-sm">Update Rooms</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permission Notice */}
      {Object.values(permissions).filter(v => v === false).length > 0 && (
        <div className="mt-3 p-2 bg-light rounded text-center">
          <small className="text-muted">
            <Clock size={12} className="me-1" />
            Some features are restricted by your manager. Contact your administrator for additional access.
          </small>
        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;