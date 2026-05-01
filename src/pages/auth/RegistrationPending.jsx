import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User,
  Clock, 
  Mail, 
  Building2, 
  CheckCircle, 
  AlertCircle,
  MessageCircle,
  Home,
  LogIn,
  Copy,
  Phone
} from 'lucide-react';

const RegistrationPending = () => {
  const navigate = useNavigate();
  const pendingData = JSON.parse(window.dummyDataStorage.getItem('pendingRegistration') || '{}');

  return (
    <div className="pending-container">
      <div className="pending-card-compact">
        {/* Header with Icon */}
        <div className="pending-header">
          <div className="success-icon">
            <CheckCircle size="40" />
          </div>
          <h2>Request Submitted!</h2>
          <p>Admin will review your application</p>
        </div>

        {/* Request ID Row */}
        <div className="request-id-row">
          <span>Request ID:</span>
          <strong>{pendingData.requestId || 'REQ' + Date.now()}</strong>
          <button onClick={() => {
            navigator.clipboard.writeText(pendingData.requestId);
            alert('Copied!');
          }}>
            <Copy size="12" />
          </button>
        </div>

        {/* Compact Details Grid */}
        <div className="details-grid">
          <div className="detail-item">
            <User size="14" />
            <div>
              <label>Owner Name</label>
              <span>{pendingData.ownerName || '—'}</span>
            </div>
          </div>
          <div className="detail-item">
            <Mail size="14" />
            <div>
              <label>Email</label>
              <span>{pendingData.email || '—'}</span>
            </div>
          </div>
          <div className="detail-item">
            <Clock size="14" />
            <div>
              <label>Submitted</label>
              <span>{pendingData.requestDate ? new Date(pendingData.requestDate).toLocaleDateString() : 'Today'}</span>
            </div>
          </div>
          <div className="detail-item">
            <Phone size="14" />
            <div>
              <label>Contact</label>
              <span>Will be verified</span>
            </div>
          </div>
        </div>

        {/* Compact Timeline */}
        <div className="timeline-compact">
          <div className="timeline-step completed">
            <CheckCircle size="12" />
            <span>Submitted</span>
          </div>
          <div className="timeline-line"></div>
          <div className="timeline-step active">
            <Clock size="12" />
            <span>Review</span>
          </div>
          <div className="timeline-line"></div>
          <div className="timeline-step">
            <Mail size="12" />
            <span>Credentials</span>
          </div>
        </div>

        {/* Info Alert */}
        <div className="info-alert">
          <AlertCircle size="14" />
          <span>You'll receive login credentials within 24-48 hours</span>
        </div>

        {/* Action Buttons */}
        <div className="action-row">
          <button className="btn-outline" onClick={() => navigate('/')}>
            <Home size="14" /> Home
          </button>
          <button className="btn-primary" onClick={() => navigate('/login')}>
            <LogIn size="14" /> Login
          </button>
        </div>

        {/* Support Row */}
        <div className="support-row">
          <MessageCircle size="12" />
          <span>Need help? <strong>+91 98765 43210</strong></span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPending;