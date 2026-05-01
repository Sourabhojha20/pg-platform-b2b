import api from './api';

const adminService = {
  // Get all activity logs
  getActivityLogs: async () => {
    const response = await api.get('/admin/logs');
    return response.data;
  },

  // Update property status (Approve/Reject)
  updatePropertyStatus: async (id, status) => {
    const response = await api.put(`/admin/properties/${id}/status`, { status });
    return response.data;
  },

  // Get all users
  getUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  // Update user status
  updateUserStatus: async (id, active) => {
    const response = await api.put(`/admin/users/${id}/status`, { active });
    return response.data;
  }
};

export default adminService;
