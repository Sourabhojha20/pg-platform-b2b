import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, 
  Search, 
  Filter, 
  Clock, 
  User, 
  FileText, 
  Info,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';
import adminService from '../../services/adminService';

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedLog, setExpandedLog] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await adminService.getActivityLogs();
      setLogs(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching logs:', error);
      setLoading(false);
    }
  };

  const getActionBadge = (action) => {
    const actionLower = action.toLowerCase();
    if (actionLower.includes('create')) return <span className="badge bg-success bg-opacity-10 text-success">Create</span>;
    if (actionLower.includes('update')) return <span className="badge bg-primary bg-opacity-10 text-primary">Update</span>;
    if (actionLower.includes('delete')) return <span className="badge bg-danger bg-opacity-10 text-danger">Delete</span>;
    if (actionLower.includes('approve')) return <span className="badge bg-info bg-opacity-10 text-info">Approve</span>;
    if (actionLower.includes('reject')) return <span className="badge bg-warning bg-opacity-10 text-warning">Reject</span>;
    return <span className="badge bg-secondary bg-opacity-10 text-secondary">{action}</span>;
  };

  const filteredLogs = logs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.performedBy?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.targetModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.details?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in-up">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Activity Logs</h4>
          <p className="text-muted small mb-0">System-wide audit trail and activity monitoring</p>
        </div>
        <button className="btn-premium" onClick={fetchLogs}>
          <Clock size={16} className="me-2" /> Refresh Logs
        </button>
      </div>

      {/* Filters */}
      <div className="modern-card mb-4">
        <div className="card-header-modern">
          <div className="navbar-search w-100">
            <Search className="search-icon" size={16} />
            <input 
              type="text" 
              className="form-control-premium" 
              placeholder="Search by action, user, model or details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ fontSize: '13px', padding: '8px 12px 8px 36px' }}
            />
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="modern-card">
        <div className="table-responsive">
          <table className="table-modern">
            <thead>
              <tr>
                <th style={{ width: '40px' }}></th>
                <th>Timestamp</th>
                <th>Performed By</th>
                <th>Action</th>
                <th>Target Model</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    <ClipboardList size={50} className="text-muted mb-3" />
                    <h6>No activity logs found</h6>
                  </td>
                </tr>
              ) : (
                filteredLogs.map(log => (
                  <React.Fragment key={log._id}>
                    <tr 
                      className={expandedLog === log._id ? 'bg-light' : ''}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setExpandedLog(expandedLog === log._id ? null : log._id)}
                    >
                      <td>
                        {expandedLog === log._id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </td>
                      <td className="small">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="avatar-sm" style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#4f46e5', color: 'white', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontSize: '10px', fontWeight: 'bold' }}>
                            {log.performedBy?.name?.charAt(0).toUpperCase()}
                          </div>
                          <div className="small">
                            <div className="fw-600">{log.performedBy?.name}</div>
                            <div className="text-muted x-small">{log.performedBy?.role}</div>
                          </div>
                        </div>
                      </td>
                      <td>{getActionBadge(log.action)}</td>
                      <td>
                        <div className="d-flex align-items-center gap-1 small">
                          <FileText size={12} className="text-muted" />
                          {log.targetModel}
                        </div>
                      </td>
                      <td className="small">{log.details}</td>
                    </tr>
                    {expandedLog === log._id && (
                      <tr>
                        <td colSpan="6" className="p-0 border-0">
                          <div className="p-4 bg-light border-bottom">
                            <div className="row">
                              <div className="col-md-6">
                                <h6 className="x-small fw-bold text-muted text-uppercase mb-3">Before Changes</h6>
                                <pre className="p-3 bg-white border rounded x-small mb-0" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                  {log.changes?.before ? JSON.stringify(log.changes.before, null, 2) : 'No prior state'}
                                </pre>
                              </div>
                              <div className="col-md-6">
                                <h6 className="x-small fw-bold text-muted text-uppercase mb-3">After Changes</h6>
                                <pre className="p-3 bg-white border rounded x-small mb-0" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                  {log.changes?.after ? JSON.stringify(log.changes.after, null, 2) : 'No state changes recorded'}
                                </pre>
                              </div>
                            </div>
                            <div className="mt-3 d-flex gap-3">
                              <div className="x-small text-muted">
                                <span className="fw-bold">Target ID:</span> {log.targetId}
                              </div>
                              <div className="x-small text-muted">
                                <span className="fw-bold">IP Address:</span> {log.ipAddress || 'N/A'}
                              </div>
                              <div className="x-small text-muted">
                                <span className="fw-bold">User Agent:</span> {log.userAgent?.substring(0, 50)}...
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs;
