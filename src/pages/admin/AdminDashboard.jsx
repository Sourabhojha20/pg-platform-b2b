import React, { useState } from 'react';
import { 
  Users, 
  Building2, 
  Phone, 
  Clock, 
  TrendingUp, 
  DollarSign,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  ArrowUp,
  ArrowDown,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Zap,
  Shield,
  UserCheck,
  Home,
  MessageCircle,
  Star,
  Edit,
  Trash2
} from 'lucide-react';
import StatsCard from '../../components/common/StatsCard';

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('monthly');

  // Enhanced Stats Cards - 4 cards
  const stats = [
    { title: "Total Users", value: "1,256", icon: Users, color: "primary", trend: 15, subtext: "+164 this month" },
    { title: "Total Listings", value: "342", icon: Building2, color: "success", trend: 12, subtext: "+28 new listings" },
    { title: "Total Leads", value: "1,842", icon: Phone, color: "warning", trend: 28, subtext: "+412 this month" },
    { title: "Pending Approvals", value: "23", icon: Clock, color: "danger", trend: -8, subtext: "↓ 2 from last week" }
  ];

  const recentListings = [
    { id: 1, name: "Sunshine PG", owner: "Rajesh Kumar", location: "Koramangala", status: "pending", date: "2024-01-21", type: "PG" },
    { id: 2, name: "Luxury Co-living", owner: "Priya Sharma", location: "Indiranagar", status: "pending", date: "2024-01-20", type: "Co-living" },
    { id: 3, name: "Student Hostel", owner: "Amit Singh", location: "Whitefield", status: "approved", date: "2024-01-19", type: "Hostel" },
    { id: 4, name: "Executive PG", owner: "Neha Gupta", location: "HSR Layout", status: "pending", date: "2024-01-18", type: "PG" }
  ];

  const recentUsers = [
    { id: 1, name: "Rajesh Kumar", email: "rajesh@sunshine.com", role: "B2B Owner", status: "active", joined: "2024-01-15" },
    { id: 2, name: "Priya Sharma", email: "priya@luxury.com", role: "B2B Owner", status: "active", joined: "2024-01-10" },
    { id: 3, name: "Amit Singh", email: "amit@student.com", role: "B2B Owner", status: "inactive", joined: "2024-01-05" }
  ];

  const monthlyData = {
    users: [85, 92, 108, 124, 145, 167, 189, 210, 234, 256, 278, 298],
    listings: [45, 52, 68, 82, 95, 112, 128, 145, 162, 178, 195, 212],
    leads: [65, 78, 92, 110, 135, 158, 182, 205, 228, 245, 268, 290]
  };

  const platformStats = {
    totalRevenue: "₹24,50,000",
    avgRating: "4.6",
    totalReviews: "1,234",
    responseRate: "94%",
    avgResponseTime: "2.3 hours",
    conversionRate: "18%"
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return <span className="badge-premium badge-warning"><Clock size={10} className="me-1" /> Pending</span>;
      case 'approved':
        return <span className="badge-premium badge-success"><CheckCircle size={10} className="me-1" /> Approved</span>;
      case 'rejected':
        return <span className="badge-premium badge-danger"><XCircle size={10} className="me-1" /> Rejected</span>;
      default:
        return <span className="badge-premium badge-info">{status}</span>;
    }
  };

  return (
    <div className="fade-in-up">
   

      {/* Stats Cards - 4 in a row */}
      <div className="row mb-1">
        {stats.map((stat, index) => (
          <div className="col-md-3 col-sm-6 mb-3" key={index}>
            <StatsCard {...stat} />
          </div>
        ))}
      </div>

      {/* Charts Section - Row with 2 col-6 cards */}
      <div className="row mb-4">
        <div className="col-lg-6 mb-4">
          <div className="modern-card">
            <div className="card-header-modern d-flex justify-content-between align-items-center">
              <div>
                <span className="fw-semibold">User Growth</span>
                <p className="text-muted small mb-0">Monthly user registration trend</p>
              </div>
              <BarChart3 size={18} className="text-muted" />
            </div>
            <div className="card-body p-4">
              <div className="chart-container">
                <div className="d-flex justify-content-between align-items-end mb-3" style={{ height: '200px' }}>
                  {monthlyData.users.slice(-6).map((value, idx) => (
                    <div key={idx} className="text-center" style={{ flex: 1 }}>
                      <div className="mb-2">
                        <div 
                          className="bg-gradient-primary rounded mx-auto"
                          style={{ 
                            width: '35px', 
                            height: `${(value / Math.max(...monthlyData.users)) * 160}px`,
                            transition: 'height 0.3s ease'
                          }}
                        ></div>
                      </div>
                      <small className="text-muted">{['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'][idx]}</small>
                      <div className="small fw-semibold">{value}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-2 border-top">
                  <div className="d-flex justify-content-between">
                    <div>
                      <div className="small text-muted">Total Users</div>
                      <div className="h6 mb-0">1,256</div>
                    </div>
                    <div className="text-success d-flex align-items-center">
                      <ArrowUp size={14} /> +15%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="modern-card">
            <div className="card-header-modern d-flex justify-content-between align-items-center">
              <div>
                <span className="fw-semibold">Leads Overview</span>
                <p className="text-muted small mb-0">Monthly leads generated</p>
              </div>
              <Activity size={18} className="text-muted" />
            </div>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-end mb-3" style={{ height: '200px' }}>
                {monthlyData.leads.slice(-6).map((value, idx) => (
                  <div key={idx} className="text-center" style={{ flex: 1 }}>
                    <div className="mb-2">
                      <div 
                        className="bg-gradient-success rounded mx-auto"
                        style={{ 
                          width: '35px', 
                          height: `${(value / Math.max(...monthlyData.leads)) * 160}px`,
                          transition: 'height 0.3s ease',
                          background: 'linear-gradient(135deg, #10b981, #059669)'
                        }}
                      ></div>
                    </div>
                    <small className="text-muted">{['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'][idx]}</small>
                    <div className="small fw-semibold">{value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-2 border-top">
                <div className="d-flex justify-content-between">
                  <div>
                    <div className="small text-muted">Total Leads</div>
                    <div className="h6 mb-0">1,842</div>
                  </div>
                  <div className="text-success d-flex align-items-center">
                    <ArrowUp size={14} /> +28%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Stats Overview - Row with 2 col-6 cards */}
      <div className="row mb-4">
        <div className="col-lg-6 mb-4">
          <div className="modern-card">
            <div className="card-header-modern">
              <span className="fw-semibold">Platform Performance</span>
            </div>
            <div className="card-body p-4">
              <div className="row">
                <div className="col-6 mb-3">
                  <div className="p-3 bg-light rounded">
                    <DollarSign size={20} className="text-success mb-2" />
                    <div className="small text-muted">Total Revenue</div>
                    <div className="h5 mb-0">{platformStats.totalRevenue}</div>
                    <small className="text-success">↑ 23% vs last month</small>
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <div className="p-3 bg-light rounded">
                    <Star size={20} className="text-warning mb-2" />
                    <div className="small text-muted">Avg Rating</div>
                    <div className="h5 mb-0">{platformStats.avgRating}/5</div>
                    <small className="text-muted">from {platformStats.totalReviews} reviews</small>
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <div className="p-3 bg-light rounded">
                    <MessageCircle size={20} className="text-info mb-2" />
                    <div className="small text-muted">Response Rate</div>
                    <div className="h5 mb-0">{platformStats.responseRate}</div>
                    <small className="text-muted">Avg {platformStats.avgResponseTime}</small>
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <div className="p-3 bg-light rounded">
                    <Target size={20} className="text-primary mb-2" />
                    <div className="small text-muted">Conversion Rate</div>
                    <div className="h5 mb-0">{platformStats.conversionRate}</div>
                    <small className="text-success">↑ 5% improvement</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="modern-card">
            <div className="card-header-modern">
              <span className="fw-semibold">Quick Stats</span>
            </div>
            <div className="card-body p-4">
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="small text-muted">Active Users</span>
                  <span className="fw-600">1,156 (92%)</span>
                </div>
                <div className="progress" style={{ height: '6px' }}>
                  <div className="progress-bar bg-success" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="small text-muted">Verified Listings</span>
                  <span className="fw-600">289 (84%)</span>
                </div>
                <div className="progress" style={{ height: '6px' }}>
                  <div className="progress-bar bg-info" style={{ width: '84%' }}></div>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="small text-muted">Active B2B Owners</span>
                  <span className="fw-600">156 (78%)</span>
                </div>
                <div className="progress" style={{ height: '6px' }}>
                  <div className="progress-bar bg-warning" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="small text-muted">Platform Growth</span>
                  <span className="fw-600 text-success">↑ 28%</span>
                </div>
                <div className="progress" style={{ height: '6px' }}>
                  <div className="progress-bar bg-primary" style={{ width: '28%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Listings Table */}
      <div className="modern-card mb-4">
        <div className="card-header-modern d-flex justify-content-between align-items-center">
          <div>
            <span className="fw-semibold">Recent Listings</span>
            <p className="text-muted small mb-0">Latest property listings awaiting review</p>
          </div>
          <button className="btn-outline-premium btn-sm d-flex align-items-center gap-1">
            <Filter size={12} /> View All
          </button>
        </div>
        <div className="table-responsive">
          <table className="table-modern">
            <thead>
              <tr>
                <th>Property Name</th>
                <th>Owner</th>
                <th>Location</th>
                <th>Type</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentListings.map(listing => (
                <tr key={listing.id}>
                  <td className="fw-600">{listing.name}</td>
                  <td className="small">{listing.owner}</td>
                  <td className="small">{listing.location}</td>
                  <td><span className="badge-premium badge-info">{listing.type}</span></td>
                  <td>{getStatusBadge(listing.status)}</td>
                  <td className="small">{listing.date}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button 
                        className="btn-outline-premium" 
                        style={{ padding: '4px 10px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Eye size={12} /> View
                      </button>
                      <button 
                        className="btn-outline-premium" 
                        style={{ padding: '4px 10px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Edit size={12} /> Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Users Section */}
      <div className="modern-card mb-4">
        <div className="card-header-modern d-flex justify-content-between align-items-center">
          <div>
            <span className="fw-semibold">Recent Users</span>
            <p className="text-muted small mb-0">Newly registered platform users</p>
          </div>
          <button className="btn-outline-premium btn-sm">View All Users</button>
        </div>
        <div className="table-responsive">
          <table className="table-modern">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div className="user-avatar" style={{ width: '32px', height: '32px', fontSize: '12px' }}>
                        {user.name.charAt(0)}
                      </div>
                      <span className="fw-600 small">{user.name}</span>
                    </div>
                  </td>
                  <td className="small">{user.email}</td>
                  <td><span className="badge-premium badge-info">{user.role}</span></td>
                  <td>
                    <span className={`badge-premium ${user.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                      {user.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="small">{user.joined}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button 
                        className="btn-outline-premium" 
                        style={{ padding: '4px 10px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Eye size={12} /> View
                      </button>
                      <button 
                        className="btn-outline-premium" 
                        style={{ padding: '4px 10px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Edit size={12} /> Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions Footer */}
      <div className="modern-card">
        <div className="card-body p-4">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h6 className="mb-1">Admin Quick Actions</h6>
              <p className="text-muted small mb-0">Manage platform settings, users, and listings</p>
            </div>
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <button className="btn-premium me-2 d-inline-flex align-items-center gap-1" style={{ padding: '6px 14px', fontSize: '12px' }}>
                <Shield size={14} /> Manage Users
              </button>
              <button className="btn-outline-premium d-inline-flex align-items-center gap-1" style={{ padding: '6px 14px', fontSize: '12px' }}>
                <Building2 size={14} /> View All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;