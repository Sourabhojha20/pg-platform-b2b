import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  Mail, 
  Phone, 
  Building2, 
  Clock,
  UserCheck,
  Send,
  Search,
  Filter,
  Edit,
  Trash2
} from 'lucide-react';

const ManageRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = () => {
    const stored = JSON.parse(window.dummyDataStorage.getItem('registrationRequests') || '[]');
    setRegistrations(stored);
  };

  const handleApprove = (request) => {
    setSelectedRequest(request);
    setCredentials({
      username: request.email,
      password: generatePasswordHelper()
    });
    setShowModal(true);
  };

  const generatePasswordHelper = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleGeneratePasswordClick = () => {
    setCredentials(prev => ({ ...prev, password: generatePasswordHelper() }));
  };

  const handleReject = (requestId) => {
    if (window.confirm('Are you sure you want to reject this registration request?')) {
      const updated = registrations.map(req =>
        req.id === requestId ? { ...req, status: 'rejected', adminNotes: 'Registration rejected' } : req
      );
      window.dummyDataStorage.setItem('registrationRequests', JSON.stringify(updated));
      setRegistrations(updated);
      alert('❌ Registration request rejected.');
    }
  };

  const sendCredentials = () => {
    if (!credentials.username || !credentials.password) {
      alert('Username and Password are required!');
      return;
    }

    // Create B2B user account
    const b2bUser = {
      id: Date.now(),
      name: selectedRequest.ownerName,
      email: selectedRequest.email,
      phone: selectedRequest.phone,
      role: 'b2b',
      status: 'active',
      username: credentials.username,
      password: credentials.password,
      businessName: selectedRequest.ownerName,
      joinedDate: new Date().toISOString().split('T')[0],
      approvedBy: 'Admin',
      approvedDate: new Date().toISOString()
    };

    // Save to users list
    const existingUsers = JSON.parse(window.dummyDataStorage.getItem('mockUsers') || '[]');
    existingUsers.push(b2bUser);
    window.dummyDataStorage.setItem('mockUsers', JSON.stringify(existingUsers));

    // Update registration request status
    const updatedRegistrations = registrations.map(req =>
      req.id === selectedRequest.id ? { 
        ...req, 
        status: 'approved', 
        approvedDate: new Date().toISOString(),
        credentials: { username: credentials.username, password: credentials.password }
      } : req
    );
    window.dummyDataStorage.setItem('registrationRequests', JSON.stringify(updatedRegistrations));

    // Simulate sending email/WhatsApp
    alert(`✅ Credentials sent to ${selectedRequest.phone} via WhatsApp and ${selectedRequest.email}\n\nUsername: ${credentials.username}\nPassword: ${credentials.password}\n\nPlease ask them to change password after first login.`);

    setShowModal(false);
    loadRegistrations();
  };

  const pendingRegistrations = registrations.filter(r => r.status === 'pending');
  const approvedRegistrations = registrations.filter(r => r.status === 'approved');
  const rejectedRegistrations = registrations.filter(r => r.status === 'rejected');

  const filteredRegistrations = pendingRegistrations.filter(req =>
    req.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.phone.includes(searchTerm)
  );

  const stats = {
    pending: pendingRegistrations.length,
    approved: approvedRegistrations.length,
    rejected: rejectedRegistrations.length,
    total: registrations.length
  };

  return (
    <div className="fade-in-up">
      

     

      {/* Search */}
      <div className="modern-card mb-4">
        <div className="card-header-modern">
          <div className="row">
            <div className="col-md-6">
              <div className="navbar-search">
                <Search className="search-icon" size={16} />
                <input 
                  type="text" 
                  className="form-control-premium" 
                  placeholder="Search by owner name, email or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ fontSize: '13px', padding: '8px 12px 8px 36px' }}
                />
              </div>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="text-muted small mb-0">Found {filteredRegistrations.length} pending requests</p>
            </div>
          </div>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="modern-card">
        <div className="table-responsive">
          <table className="table-modern">
            <thead>
              <tr>
                <th>Owner / Contact Name</th>
                <th>Contact Details</th>
                <th>Request Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    <div className="text-center">
                      <CheckCircle size={60} className="text-success mb-3" />
                      <h5 className="mb-2">No Pending Registrations</h5>
                      <p className="text-muted mb-0">All registration requests have been processed.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map(request => (
                  <tr key={request.id}>
                    <td className="fw-600" style={{ fontSize: '13px' }}>{request.ownerName}</td>
                    <td>
                      <div style={{ fontSize: '12px' }}>{request.phone}</div>
                      <div className="text-muted" style={{ fontSize: '11px' }}>{request.email}</div>
                    </td>
                    <td style={{ fontSize: '12px' }}>{new Date(request.requestDate).toLocaleDateString()}</td>
                    <td>
                      <span className="badge-premium badge-warning">
                        <Clock size={10} className="me-1" /> Pending
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button 
                          className="btn-success"
                          onClick={() => handleApprove(request)}
                          title="Approve & Send Credentials"
                          style={{ 
                            padding: '4px 10px', 
                            fontSize: '11px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '4px',
                            background: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          <CheckCircle size={12} /> Approve
                        </button>
                        <button 
                          className="btn-danger"
                          onClick={() => handleReject(request.id)}
                          title="Reject"
                          style={{ 
                            padding: '4px 10px', 
                            fontSize: '11px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '4px',
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          <XCircle size={12} /> Reject
                        </button>
                        <button 
                          className="btn-outline-premium"
                          title="View Details"
                          style={{ 
                            padding: '4px 10px', 
                            fontSize: '11px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '4px',
                            borderRadius: '6px'
                          }}
                        >
                          <Eye size={12} /> View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Send Credentials Modal */}
      {showModal && selectedRequest && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content modern-card">
              <div className="modal-header border-0 p-4">
                <h5 className="modal-title">Approve & Send Credentials</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body p-4 pt-0">
                <div className="mb-3">
                  <label className="form-label small">Owner / Contact Name</label>
                  <input type="text" className="form-control-modern" value={selectedRequest.ownerName} disabled />
                </div>
                <div className="mb-3">
                  <label className="form-label small">Email / Phone</label>
                  <input type="text" className="form-control-modern" value={`${selectedRequest.email} / ${selectedRequest.phone}`} disabled />
                </div>
                <hr />
                <div className="mb-3">
                  <label className="form-label small">Username *</label>
                  <input 
                    type="text" 
                    className="form-control-modern" 
                    value={credentials.username}
                    onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    Password *
                    <span 
                      className="text-primary cursor-pointer text-decoration-underline" 
                      onClick={handleGeneratePasswordClick}
                      style={{ fontSize: '11px', cursor: 'pointer' }}
                    >
                      Generate Random
                    </span>
                  </label>
                  <input 
                    type="text" 
                    className="form-control-modern" 
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  />
                </div>
              </div>
              <div className="modal-footer border-0 p-4 pt-0">
                <button className="btn-outline-premium" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn-premium" onClick={sendCredentials}>
                  <Send size={14} className="me-1" /> Send Credentials
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRegistrations;