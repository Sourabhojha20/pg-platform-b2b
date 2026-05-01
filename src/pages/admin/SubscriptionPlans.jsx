import React, { useState, useEffect } from 'react';
import {
  Package,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  DollarSign,
  Calendar,
  Users,
  Building2,
  Phone,
  Star,
  Crown,
  Zap,
  Save,
  X,
  RefreshCw,
  Info,
  Clock,
  Award,
  Gift,
  TrendingUp,
  Eye
} from 'lucide-react';

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [newPlan, setNewPlan] = useState({
    name: '',
    type: 'monthly',
    price: '',
    originalPrice: '',
    discount: '',
    currency: 'INR',
    features: [],
    propertyLimit: 5,
    roomLimit: 50,
    leadLimit: 100,
    supportLevel: 'basic',
    featuredListing: false,
    analytics: false,
    managerAccess: false,
    prioritySupport: false,
    customDomain: false,
    apiAccess: false,
    status: 'active',
    popular: false,
    description: '',
    validFor: 30
  });

  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = () => {
    const storedPlans = JSON.parse(window.dummyDataStorage.getItem('subscriptionPlans') || '[]');
    if (storedPlans.length === 0) {
      // Add sample plans
      const samplePlans = [
        {
          id: 1,
          name: 'Basic',
          type: 'monthly',
          price: 499,
          originalPrice: 999,
          discount: 50,
          currency: 'INR',
          features: ['Up to 5 properties', 'Basic analytics', 'Email support', 'Lead management'],
          propertyLimit: 5,
          roomLimit: 20,
          leadLimit: 50,
          supportLevel: 'basic',
          featuredListing: false,
          analytics: false,
          managerAccess: false,
          prioritySupport: false,
          customDomain: false,
          apiAccess: false,
          status: 'active',
          popular: false,
          description: 'Perfect for small PG owners starting out',
          validFor: 30,
          color: '#4361ee'
        },
        {
          id: 2,
          name: 'Professional',
          type: 'monthly',
          price: 999,
          originalPrice: 1999,
          discount: 50,
          currency: 'INR',
          features: ['Up to 20 properties', 'Advanced analytics', 'Priority support', 'Lead management', 'Manager access (2 managers)', 'Featured listing (monthly)'],
          propertyLimit: 20,
          roomLimit: 100,
          leadLimit: 500,
          supportLevel: 'priority',
          featuredListing: true,
          analytics: true,
          managerAccess: true,
          prioritySupport: true,
          customDomain: false,
          apiAccess: false,
          status: 'active',
          popular: true,
          description: 'Most popular plan for growing businesses',
          validFor: 30,
          color: '#f59e0b'
        },
        {
          id: 3,
          name: 'Enterprise',
          type: 'monthly',
          price: 2499,
          originalPrice: 4999,
          discount: 50,
          currency: 'INR',
          features: ['Unlimited properties', 'Advanced analytics', '24/7 priority support', 'Lead management', 'Unlimited manager access', 'Featured listing (weekly)', 'Custom domain', 'API access'],
          propertyLimit: -1,
          roomLimit: -1,
          leadLimit: -1,
          supportLevel: 'premium',
          featuredListing: true,
          analytics: true,
          managerAccess: true,
          prioritySupport: true,
          customDomain: true,
          apiAccess: true,
          status: 'active',
          popular: false,
          description: 'Complete solution for large property owners',
          validFor: 30,
          color: '#10b981'
        },
        {
          id: 4,
          name: 'Yearly Basic',
          type: 'yearly',
          price: 4990,
          originalPrice: 11988,
          discount: 58,
          currency: 'INR',
          features: ['Up to 5 properties', 'Basic analytics', 'Email support', 'Lead management', 'Save 58% compared to monthly'],
          propertyLimit: 5,
          roomLimit: 20,
          leadLimit: 50,
          supportLevel: 'basic',
          featuredListing: false,
          analytics: false,
          managerAccess: false,
          prioritySupport: false,
          customDomain: false,
          apiAccess: false,
          status: 'active',
          popular: false,
          description: 'Best value for long-term commitment',
          validFor: 365,
          color: '#8b5cf6'
        }
      ];
      window.dummyDataStorage.setItem('subscriptionPlans', JSON.stringify(samplePlans));
      setPlans(samplePlans);
    } else {
      setPlans(storedPlans);
    }
    setLoading(false);
  };

  const savePlans = (updatedPlans) => {
    window.dummyDataStorage.setItem('subscriptionPlans', JSON.stringify(updatedPlans));
    setPlans(updatedPlans);
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setNewPlan({
        ...newPlan,
        features: [...newPlan.features, featureInput.trim()]
      });
      setFeatureInput('');
    }
  };

  const removeFeature = (index) => {
    const updatedFeatures = newPlan.features.filter((_, i) => i !== index);
    setNewPlan({ ...newPlan, features: updatedFeatures });
  };

  const addPlan = () => {
    if (!newPlan.name || !newPlan.price) {
      alert('Please fill plan name and price');
      return;
    }

    const planToAdd = {
      id: Date.now(),
      ...newPlan,
      createdAt: new Date().toISOString()
    };

    const updatedPlans = [...plans, planToAdd];
    savePlans(updatedPlans);
    setShowAddModal(false);
    resetNewPlan();
    alert('Plan added successfully!');
  };

  const updatePlan = () => {
    if (!selectedPlan) return;

    const updatedPlans = plans.map(p => 
      p.id === selectedPlan.id ? selectedPlan : p
    );
    savePlans(updatedPlans);
    setShowEditModal(false);
    alert('Plan updated successfully!');
  };

  const deletePlan = (planId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      const updatedPlans = plans.filter(p => p.id !== planId);
      savePlans(updatedPlans);
    }
  };

  const togglePlanStatus = (planId) => {
    const updatedPlans = plans.map(p => 
      p.id === planId ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p
    );
    savePlans(updatedPlans);
  };

  const togglePopular = (planId) => {
    const updatedPlans = plans.map(p => 
      p.id === planId ? { ...p, popular: !p.popular } : p
    );
    savePlans(updatedPlans);
  };

  const resetNewPlan = () => {
    setNewPlan({
      name: '',
      type: 'monthly',
      price: '',
      originalPrice: '',
      discount: '',
      currency: 'INR',
      features: [],
      propertyLimit: 5,
      roomLimit: 50,
      leadLimit: 100,
      supportLevel: 'basic',
      featuredListing: false,
      analytics: false,
      managerAccess: false,
      prioritySupport: false,
      customDomain: false,
      apiAccess: false,
      status: 'active',
      popular: false,
      description: '',
      validFor: 30
    });
    setFeatureInput('');
  };

  const openEditModal = (plan) => {
    setSelectedPlan(plan);
    setShowEditModal(true);
  };

  const openViewModal = (plan) => {
    setSelectedPlan(plan);
    setShowViewModal(true);
  };

  const getSupportBadge = (level) => {
    switch(level) {
      case 'basic': return <span className="badge-premium badge-info">Basic Support</span>;
      case 'priority': return <span className="badge-premium badge-warning">Priority Support</span>;
      case 'premium': return <span className="badge-premium badge-success">24/7 Premium Support</span>;
      default: return <span className="badge-premium badge-info">Basic Support</span>;
    }
  };

  const stats = {
    total: plans.length,
    active: plans.filter(p => p.status === 'active').length,
    inactive: plans.filter(p => p.status === 'inactive').length,
    popular: plans.filter(p => p.popular).length
  };

  return (
    <div className="fade-in-up">
      {/* Header */}
      <div className="d-flex justify-content-end mb-3">
        <button className="btn-premium btn-sm d-flex align-items-center gap-2" onClick={() => setShowAddModal(true)}>
          <Plus size={14} /> Add New Plan
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="stats-card-small">
            <div className="stats-card-small-content">
              <div className="stats-card-small-left">
                <div className="stats-icon-small" style={{ background: '#e0e7ff' }}>
                  <Package size={14} color="#4f46e5" />
                </div>
                <div className="stats-info-small">
                  <div className="stats-number-small">{stats.total}</div>
                  <div className="stats-label-small">Total Plans</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="stats-card-small">
            <div className="stats-card-small-content">
              <div className="stats-card-small-left">
                <div className="stats-icon-small" style={{ background: '#d1fae5' }}>
                  <CheckCircle size={14} color="#10b981" />
                </div>
                <div className="stats-info-small">
                  <div className="stats-number-small">{stats.active}</div>
                  <div className="stats-label-small">Active Plans</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="stats-card-small">
            <div className="stats-card-small-content">
              <div className="stats-card-small-left">
                <div className="stats-icon-small" style={{ background: '#fed7aa' }}>
                  <Crown size={14} color="#f59e0b" />
                </div>
                <div className="stats-info-small">
                  <div className="stats-number-small">{stats.popular}</div>
                  <div className="stats-label-small">Popular Plans</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="stats-card-small">
            <div className="stats-card-small-content">
              <div className="stats-card-small-left">
                <div className="stats-icon-small" style={{ background: '#fee2e2' }}>
                  <XCircle size={14} color="#ef4444" />
                </div>
                <div className="stats-info-small">
                  <div className="stats-number-small">{stats.inactive}</div>
                  <div className="stats-label-small">Inactive Plans</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="row">
        {plans.length === 0 ? (
          <div className="col-12">
            <div className="modern-card">
              <div className="card-body text-center py-5">
                <Package size={50} className="text-muted mb-3" />
                <h6>No subscription plans</h6>
                <p className="text-muted small">Click "Add New Plan" to create subscription plans</p>
              </div>
            </div>
          </div>
        ) : (
          plans.map(plan => (
            <div key={plan.id} className="col-md-6 col-lg-4 mb-4">
              <div className={`plan-card ${plan.popular ? 'popular' : ''} ${plan.status === 'inactive' ? 'inactive' : ''}`}>
                {plan.popular && (
                  <div className="popular-badge">
                    <Star size={12} /> Most Popular
                  </div>
                )}
                <div className="plan-header" style={{ background: plan.color, padding: '15px' }}>
                  <h6 className="plan-name mb-1">{plan.name}</h6>
                  <div className="plan-price" style={{ fontSize: '1.2rem' }}>
                    <span className="currency">₹</span>
                    <span className="amount">{plan.price.toLocaleString()}</span>
                    <span className="period">/{plan.type === 'monthly' ? 'mo' : 'yr'}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="plan-original-price" style={{ fontSize: '0.7rem' }}>
                      <span className="strikethrough">₹{plan.originalPrice.toLocaleString()}</span>
                      <span className="discount-badge ms-1" style={{ padding: '1px 4px' }}>-{plan.discount}%</span>
                    </div>
                  )}
                </div>
                <div className="plan-body" style={{ padding: '12px' }}>
                  <div className="plan-features" style={{ fontSize: '0.8rem' }}>
                    {plan.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="feature-item mb-1">
                        <CheckCircle size={12} className="text-success me-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="plan-footer" style={{ padding: '10px' }}>
                  <div className="plan-meta mb-2" style={{ transform: 'scale(0.9)', transformOrigin: 'left' }}>
                    <span className={`status-badge ${plan.status === 'active' ? 'active' : 'inactive'}`} style={{ fontSize: '0.65rem' }}>
                      {plan.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                    {getSupportBadge(plan.supportLevel)}
                  </div>
                  <div className="plan-actions d-flex flex-wrap gap-1">
                    <button 
                      className="btn-outline-premium btn-xs"
                      onClick={() => openViewModal(plan)}
                      style={{ fontSize: '0.65rem', padding: '2px 6px' }}
                    >
                      <Eye size={10} className="me-1" /> View
                    </button>
                    <button 
                      className="btn-outline-premium btn-xs"
                      onClick={() => openEditModal(plan)}
                      style={{ fontSize: '0.65rem', padding: '2px 6px' }}
                    >
                      <Edit size={10} className="me-1" /> Edit
                    </button>
                    <button 
                      className="btn-outline-premium btn-xs"
                      onClick={() => togglePlanStatus(plan.id)}
                      style={{ fontSize: '0.65rem', padding: '2px 6px' }}
                    >
                      {plan.status === 'active' ? 'Off' : 'On'}
                    </button>
                    <button 
                      className="btn-outline-premium btn-xs text-danger"
                      onClick={() => deletePlan(plan.id)}
                      style={{ fontSize: '0.65rem', padding: '2px 4px' }}
                    >
                      <Trash2 size={10} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Plan Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-container" style={{ maxWidth: '700px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">Add New Subscription Plan</h5>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-medium">Plan Name *</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={newPlan.name}
                    onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
                    placeholder="e.g., Basic, Professional, Enterprise"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-medium">Plan Type</label>
                  <select 
                    className="form-select form-select-sm"
                    value={newPlan.type}
                    onChange={(e) => setNewPlan({...newPlan, type: e.target.value})}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-medium">Price (₹) *</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={newPlan.price}
                    onChange={(e) => setNewPlan({...newPlan, price: e.target.value})}
                    placeholder="e.g., 499"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-medium">Original Price (₹)</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={newPlan.originalPrice}
                    onChange={(e) => setNewPlan({...newPlan, originalPrice: e.target.value})}
                    placeholder="e.g., 999"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-medium">Discount (%)</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={newPlan.discount}
                    onChange={(e) => setNewPlan({...newPlan, discount: e.target.value})}
                    placeholder="e.g., 50"
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label small fw-medium">Description</label>
                  <textarea
                    className="form-control form-control-sm"
                    rows="2"
                    value={newPlan.description}
                    onChange={(e) => setNewPlan({...newPlan, description: e.target.value})}
                    placeholder="Brief description of the plan"
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label small fw-medium">Features</label>
                  <div className="d-flex gap-2 mb-2">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      placeholder="Add a feature (e.g., Up to 10 properties)"
                      onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                    />
                    <button className="btn-outline-premium btn-sm" onClick={addFeature}>Add</button>
                  </div>
                  <div className="border rounded p-2" style={{ minHeight: '80px' }}>
                    {newPlan.features.map((feature, idx) => (
                      <span key={idx} className="feature-tag">
                        {feature}
                        <button className="remove-feature" onClick={() => removeFeature(idx)}>×</button>
                      </span>
                    ))}
                    {newPlan.features.length === 0 && (
                      <span className="text-muted small">No features added yet</span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-medium">Property Limit</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={newPlan.propertyLimit}
                    onChange={(e) => setNewPlan({...newPlan, propertyLimit: e.target.value})}
                    placeholder="-1 for unlimited"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-medium">Room Limit</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={newPlan.roomLimit}
                    onChange={(e) => setNewPlan({...newPlan, roomLimit: e.target.value})}
                    placeholder="-1 for unlimited"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-medium">Support Level</label>
                  <select 
                    className="form-select form-select-sm"
                    value={newPlan.supportLevel}
                    onChange={(e) => setNewPlan({...newPlan, supportLevel: e.target.value})}
                  >
                    <option value="basic">Basic Support</option>
                    <option value="priority">Priority Support</option>
                    <option value="premium">24/7 Premium Support</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-medium">Valid For (days)</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={newPlan.validFor}
                    onChange={(e) => setNewPlan({...newPlan, validFor: e.target.value})}
                    placeholder="30 for monthly, 365 for yearly"
                  />
                </div>
                <div className="col-12">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={newPlan.featuredListing}
                          onChange={(e) => setNewPlan({...newPlan, featuredListing: e.target.checked})}
                        />
                        <label className="form-check-label small">Featured Listing</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={newPlan.analytics}
                          onChange={(e) => setNewPlan({...newPlan, analytics: e.target.checked})}
                        />
                        <label className="form-check-label small">Advanced Analytics</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={newPlan.managerAccess}
                          onChange={(e) => setNewPlan({...newPlan, managerAccess: e.target.checked})}
                        />
                        <label className="form-check-label small">Manager Access</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={newPlan.prioritySupport}
                          onChange={(e) => setNewPlan({...newPlan, prioritySupport: e.target.checked})}
                        />
                        <label className="form-check-label small">Priority Support</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={newPlan.customDomain}
                          onChange={(e) => setNewPlan({...newPlan, customDomain: e.target.checked})}
                        />
                        <label className="form-check-label small">Custom Domain</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={newPlan.apiAccess}
                          onChange={(e) => setNewPlan({...newPlan, apiAccess: e.target.checked})}
                        />
                        <label className="form-check-label small">API Access</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={newPlan.popular}
                      onChange={(e) => setNewPlan({...newPlan, popular: e.target.checked})}
                    />
                    <label className="form-check-label small">Mark as Popular</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-medium">Plan Color</label>
                  <input
                    type="color"
                    className="form-control form-control-sm"
                    value={newPlan.color || '#4361ee'}
                    onChange={(e) => setNewPlan({...newPlan, color: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-outline-premium" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn-premium" onClick={addPlan}>Create Plan</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Plan Modal */}
      {showEditModal && selectedPlan && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-container" style={{ maxWidth: '700px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">Edit Plan - {selectedPlan.name}</h5>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-medium">Plan Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={selectedPlan.name}
                    onChange={(e) => setSelectedPlan({...selectedPlan, name: e.target.value})}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-medium">Price (₹)</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={selectedPlan.price}
                    onChange={(e) => setSelectedPlan({...selectedPlan, price: e.target.value})}
                  />
                </div>
                <div className="col-12">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedPlan.popular}
                      onChange={(e) => setSelectedPlan({...selectedPlan, popular: e.target.checked})}
                    />
                    <label className="form-check-label small">Mark as Popular</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-outline-premium" onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className="btn-premium" onClick={updatePlan}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* View Plan Modal */}
      {showViewModal && selectedPlan && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal-container" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">Plan Details - {selectedPlan.name}</h5>
              <button className="modal-close" onClick={() => setShowViewModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="plan-detail-card">
                <div className="detail-row">
                  <span className="detail-label">Plan Type:</span>
                  <span className="detail-value">{selectedPlan.type}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Price:</span>
                  <span className="detail-value">₹{selectedPlan.price}/{selectedPlan.type === 'monthly' ? 'month' : 'year'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Property Limit:</span>
                  <span className="detail-value">{selectedPlan.propertyLimit === -1 ? 'Unlimited' : selectedPlan.propertyLimit}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Support Level:</span>
                  <span className="detail-value">{selectedPlan.supportLevel}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className={`badge-premium ${selectedPlan.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                    {selectedPlan.status}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Features:</span>
                  <div className="detail-value">
                    <ul className="mb-0">
                      {selectedPlan.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-outline-premium" onClick={() => setShowViewModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlans;