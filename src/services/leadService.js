const leadService = {
  // Create new lead (enquiry/call)
  createLead: async (leadData) => {
    return { success: true, message: 'Lead created successfully (mock)' };
  },

  // Get leads for B2B owner
  getB2BLeads: async (filters = {}) => {
    return { leads: [], total: 0, pages: 1 };
  },

  // Update lead status
  updateLeadStatus: async (id, status, notes = '') => {
    return { success: true, message: 'Status updated (mock)' };
  }
};

export default leadService;