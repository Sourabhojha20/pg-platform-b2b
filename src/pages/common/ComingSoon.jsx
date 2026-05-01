import React from 'react';
import { Clock } from 'lucide-react';

const ComingSoon = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
      <div className="coming-soon-card text-center p-5 bg-white rounded-4 shadow-sm">
        <div className="icon-wrapper mb-4 d-inline-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px', background: '#f8faff', borderRadius: '50%', color: '#4361ee' }}>
          <Clock size={40} />
        </div>
        <h2 className="fw-bold mb-3">Functionality Available Soon</h2>
        <p className="text-muted">We are currently working on this feature to provide you with the best experience. Stay tuned!</p>
        <button className="btn btn-primary mt-3 px-4 rounded-3" onClick={() => window.history.back()}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;
