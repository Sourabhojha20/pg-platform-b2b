import api from './api';

const roomService = {
  // Get rooms by property
  getRoomsByProperty: async (propertyId) => {
    const response = await api.get(`/rooms/properties/${propertyId}/rooms`);
    return response.data;
  },

  // Add room to property (B2B only)
  addRoom: async (propertyId, roomData) => {
    const response = await api.post(`/rooms/properties/${propertyId}/rooms`, roomData);
    return response.data;
  },

  // Update room
  updateRoom: async (roomId, roomData) => {
    const response = await api.put(`/rooms/rooms/${roomId}`, roomData);
    return response.data;
  }
};

export default roomService;