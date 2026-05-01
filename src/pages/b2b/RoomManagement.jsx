import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Home, 
  Bath, 
  Sun, 
  Utensils, 
  Users, 
  Maximize,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  Bed,
  DoorOpen,
  User,
  Phone,
  Calendar,
  Building2,
  Mail
} from 'lucide-react';

const RoomManagement = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRoom, setEditingRoom] = useState(null);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [showTenantModal, setShowTenantModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [tenantDetails, setTenantDetails] = useState({
    tenantName: '',
    tenantPhone: '',
    tenantEmail: '',
    moveInDate: '',
    rentAmount: '',
    depositPaid: '',
    idProof: '',
    emergencyContact: '',
    occupation: ''
  });

  const [newRoom, setNewRoom] = useState({
    roomNumber: '',
    roomType: '',
    price: '',
    capacity: '',
    size: '',
    attachedBathroom: false,
    balcony: false,
    kitchen: false,
    status: 'vacant',
    tenantName: '',
    tenantPhone: '',
    moveInDate: '',
    furnishingStatus: 'Non furnished',
    acStatus: 'Non AC',
    amenities: []
  });

  useEffect(() => {
    loadPropertyData();
  }, [propertyId]);

  const loadPropertyData = () => {
    try {
      const listings = JSON.parse(window.dummyDataStorage.getItem('pgListings') || '[]');
      const foundProperty = listings.find(l => l.id === parseInt(propertyId));
      
      if (foundProperty) {
        setProperty(foundProperty);
        // If property has rooms, use them, otherwise generate sample
        if (foundProperty.rooms && foundProperty.rooms.length > 0) {
          setRooms(foundProperty.rooms);
        } else {
          const sampleRooms = generateSampleRooms(foundProperty);
          setRooms(sampleRooms);
          // Save sample rooms to property
          const updatedListings = listings.map(l => 
            l.id === parseInt(propertyId) ? { ...l, rooms: sampleRooms } : l
          );
          window.dummyDataStorage.setItem('pgListings', JSON.stringify(updatedListings));
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading property:', error);
      setLoading(false);
    }
  };

  const generateSampleRooms = (property) => {
    const sampleRooms = [];
    
    // Sample room data based on property type
    const roomData = [
      { number: '101', type: 'Single', price: 8000, capacity: '1 person', size: '120 sq ft', bath: true, balcony: true, kitchen: false, status: 'occupied', tenant: 'Rahul Sharma', phone: '9876543210', moveIn: '2024-01-15' },
      { number: '102', type: 'Single', price: 8000, capacity: '1 person', size: '120 sq ft', bath: true, balcony: false, kitchen: false, status: 'vacant', tenant: '', phone: '', moveIn: '' },
      { number: '103', type: 'Double', price: 12000, capacity: '2 persons', size: '200 sq ft', bath: true, balcony: true, kitchen: false, status: 'occupied', tenant: 'Priya Singh', phone: '9876543211', moveIn: '2024-02-01', furnishing: 'Furnished', ac: 'AC' },
      { number: '104', type: 'Double', price: 12000, capacity: '2 persons', size: '200 sq ft', bath: true, balcony: false, kitchen: false, status: 'vacant', tenant: '', phone: '', moveIn: '', furnishing: 'Semi Finished', ac: 'Non AC' },
      { number: '201', type: 'Triple', price: 15000, capacity: '3 persons', size: '280 sq ft', bath: true, balcony: true, kitchen: true, status: 'occupied', tenant: 'Amit Kumar', phone: '9876543212', moveIn: '2024-01-10', furnishing: 'Furnished', ac: 'AC' },
      { number: '202', type: 'Triple', price: 15000, capacity: '3 persons', size: '280 sq ft', bath: true, balcony: true, kitchen: true, status: 'maintenance', tenant: '', phone: '', moveIn: '', furnishing: 'Semi Finished', ac: 'Non AC' },
      { number: '203', type: 'Dormitory', price: 6000, capacity: '6 persons', size: '400 sq ft', bath: true, balcony: false, kitchen: false, status: 'occupied', tenant: 'Group Booking', phone: '9876543213', moveIn: '2024-01-20', furnishing: 'Non furnished', ac: 'Non AC' },
      { number: '204', type: 'Dormitory', price: 6000, capacity: '6 persons', size: '400 sq ft', bath: true, balcony: false, kitchen: false, status: 'vacant', tenant: '', phone: '', moveIn: '', furnishing: 'Non furnished', ac: 'Non AC' }
    ];
    
    roomData.forEach((room, idx) => {
      sampleRooms.push({
        id: Date.now() + idx,
        roomNumber: room.number,
        roomType: room.type,
        price: room.price,
        capacity: room.capacity,
        size: room.size,
        attachedBathroom: room.bath,
        balcony: room.balcony,
        kitchen: room.kitchen,
        status: room.status,
        tenantName: room.tenant,
        tenantPhone: room.phone,
        tenantEmail: room.tenant ? `${room.tenant.toLowerCase().replace(' ', '')}@example.com` : '',
        moveInDate: room.moveIn,
        furnishingStatus: room.furnishing || 'Non furnished',
        acStatus: room.ac || 'Non AC',
        amenities: ['WiFi', 'Study Table']
      });
    });
    
    return sampleRooms;
  };

  const updateRoomStatus = (roomId, newStatus) => {
    const updatedRooms = rooms.map(room => 
      room.id === roomId ? { ...room, status: newStatus } : room
    );
    setRooms(updatedRooms);
    saveRoomsToProperty(updatedRooms);
  };

  const updateRoomDetails = (roomId, updates) => {
    const updatedRooms = rooms.map(room => 
      room.id === roomId ? { ...room, ...updates } : room
    );
    setRooms(updatedRooms);
    saveRoomsToProperty(updatedRooms);
    setEditingRoom(null);
  };

  const addNewRoom = () => {
    if (!newRoom.roomNumber || !newRoom.roomType) {
      alert('Please fill room number and type');
      return;
    }
    
    const roomToAdd = {
      id: Date.now(),
      ...newRoom,
      status: 'vacant',
      tenantName: '',
      tenantPhone: '',
      tenantEmail: '',
      moveInDate: ''
    };
    
    const updatedRooms = [...rooms, roomToAdd];
    setRooms(updatedRooms);
    saveRoomsToProperty(updatedRooms);
    setShowAddRoom(false);
    setNewRoom({
      roomNumber: '',
      roomType: '',
      price: '',
      capacity: '',
      size: '',
      attachedBathroom: false,
      balcony: false,
      kitchen: false,
      status: 'vacant',
      tenantName: '',
      tenantPhone: '',
      moveInDate: '',
      furnishingStatus: 'Non furnished',
      acStatus: 'Non AC',
      amenities: []
    });
  };

  const deleteRoom = (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      const updatedRooms = rooms.filter(room => room.id !== roomId);
      setRooms(updatedRooms);
      saveRoomsToProperty(updatedRooms);
    }
  };

  const saveRoomsToProperty = (updatedRooms) => {
    const listings = JSON.parse(window.dummyDataStorage.getItem('pgListings') || '[]');
    const updatedListings = listings.map(l => 
      l.id === parseInt(propertyId) ? { ...l, rooms: updatedRooms } : l
    );
    window.dummyDataStorage.setItem('pgListings', JSON.stringify(updatedListings));
  };

  const openTenantModal = (room) => {
    setSelectedRoom(room);
    setTenantDetails({
      tenantName: room.tenantName || '',
      tenantPhone: room.tenantPhone || '',
      tenantEmail: room.tenantEmail || '',
      moveInDate: room.moveInDate || '',
      rentAmount: room.price || '',
      depositPaid: '10000',
      idProof: 'Aadhar Card',
      emergencyContact: '9876543210',
      occupation: 'Student'
    });
    setShowTenantModal(true);
  };

  const saveTenantDetails = () => {
    const updatedRooms = rooms.map(room => 
      room.id === selectedRoom.id ? { 
        ...room, 
        tenantName: tenantDetails.tenantName,
        tenantPhone: tenantDetails.tenantPhone,
        tenantEmail: tenantDetails.tenantEmail,
        moveInDate: tenantDetails.moveInDate,
        status: 'occupied'
      } : room
    );
    setRooms(updatedRooms);
    saveRoomsToProperty(updatedRooms);
    setShowTenantModal(false);
    alert('Tenant details saved successfully!');
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'vacant':
        return <span className="badge-premium badge-success"><CheckCircle size={10} className="me-1" /> Vacant</span>;
      case 'occupied':
        return <span className="badge-premium badge-warning"><Users size={10} className="me-1" /> Occupied</span>;
      case 'maintenance':
        return <span className="badge-premium badge-danger"><Clock size={10} className="me-1" /> Maintenance</span>;
      default:
        return <span className="badge-premium badge-info">{status}</span>;
    }
  };

  const roomTypeOptions = ['Single', 'Double', 'Triple', 'Dormitory', 'Studio', 'Suite'];

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center py-5">
        <Building2 size={50} className="text-muted mb-3" />
        <h6>Property not found</h6>
        <button className="btn-premium mt-3" onClick={() => navigate('/b2b/listings')}>
          Back to Listings
        </button>
      </div>
    );
  }

  const vacantRooms = rooms.filter(r => r.status === 'vacant').length;
  const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;

  return (
    <div className="fade-in-up">
      

      {/* Rooms List */}
      <div className="modern-card">
        <div className="card-header-modern">
          <span className="fw-semibold">Room Management</span>
        </div>
        <div className="table-responsive">
          <table className="table-modern">
            <thead>
              <tr>
                <th>Room No.</th>
                <th>Room Type</th>
                <th>Price (₹/month)</th>
                <th>Capacity</th>
                <th>Furnishing</th>
                <th>AC Status</th>
                <th>Features</th>
                <th>Status</th>
                <th>Tenant Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-5">
                    <Home size={50} className="text-muted mb-3" />
                    <h6>No rooms added yet</h6>
                    <p className="text-muted small">Click "Add Room" to create rooms for this property</p>
                  </td>
                </tr>
              ) : (
                rooms.map(room => (
                  <tr key={room.id}>
                    <td className="fw-600">{room.roomNumber}</td>
                    <td>{room.roomType}</td>
                    <td className="text-primary fw-600">₹{room.price}/month</td>
                    <td>{room.capacity || '-'}</td>
                    <td>
                      <span className={`badge ${room.furnishingStatus === 'Furnished' ? 'bg-success' : room.furnishingStatus === 'Semi Finished' ? 'bg-info' : 'bg-secondary'}`} style={{ fontSize: '10px' }}>
                        {room.furnishingStatus}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${room.acStatus === 'AC' ? 'bg-primary' : 'bg-secondary'}`} style={{ fontSize: '10px' }}>
                        {room.acStatus}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex flex-wrap gap-1">
                        {room.attachedBathroom && <span className="room-feature-badge"><Bath size={10} /> Bath</span>}
                        {room.balcony && <span className="room-feature-badge"><Sun size={10} /> Balcony</span>}
                        {room.kitchen && <span className="room-feature-badge"><Utensils size={10} /> Kitchen</span>}
                      </div>
                    </td>
                    <td>
                      <select 
                        className="form-select form-select-sm"
                        value={room.status}
                        onChange={(e) => updateRoomStatus(room.id, e.target.value)}
                        style={{ width: '130px', fontSize: '12px' }}
                      >
                        <option value="vacant">Vacant</option>
                        <option value="occupied">Occupied</option>
                        <option value="maintenance">Maintenance</option>
                      </select>
                    </td>
                    <td>
                      {room.status === 'occupied' ? (
                        <div className="small">
                          <div><strong>{room.tenantName}</strong></div>
                          <div className="text-muted">{room.tenantPhone}</div>
                          <div className="text-muted">Since: {room.moveInDate}</div>
                          <button 
                            className="btn-link p-0 mt-1"
                            onClick={() => openTenantModal(room)}
                            style={{ fontSize: '10px', color: '#4f46e5', background: 'none', border: 'none', cursor: 'pointer' }}
                          >
                            View Details
                          </button>
                        </div>
                      ) : (
                        <button 
                          className="btn-sm-custom btn-outline-custom"
                          onClick={() => openTenantModal(room)}
                          style={{ padding: '2px 8px', fontSize: '10px' }}
                        >
                          Add Tenant
                        </button>
                      )}
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button 
                          className="btn-icon-sm btn-outline-premium"
                          onClick={() => setEditingRoom(room)}
                          title="Edit Room"
                        >
                          <Edit size={12} />
                        </button>
                        <button 
                          className="btn-icon-sm text-danger"
                          onClick={() => deleteRoom(room.id)}
                          title="Delete Room"
                        >
                          <Trash2 size={12} />
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

      {/* Edit Room Modal */}
      {editingRoom && (
        <div className="modal-overlay" onClick={() => setEditingRoom(null)}>
          <div className="modal-container" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">Edit Room - {editingRoom.roomNumber}</h5>
              <button className="modal-close" onClick={() => setEditingRoom(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label small">Room Number</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={editingRoom.roomNumber}
                  onChange={(e) => setEditingRoom({...editingRoom, roomNumber: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label small">Room Type</label>
                <select 
                  className="form-select form-select-sm"
                  value={editingRoom.roomType}
                  onChange={(e) => setEditingRoom({...editingRoom, roomType: e.target.value})}
                >
                  {roomTypeOptions.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label small">Price (₹/month)</label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={editingRoom.price}
                  onChange={(e) => setEditingRoom({...editingRoom, price: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label small">Capacity</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={editingRoom.capacity}
                  onChange={(e) => setEditingRoom({...editingRoom, capacity: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label small">Room Size (sq ft)</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={editingRoom.size}
                  onChange={(e) => setEditingRoom({...editingRoom, size: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label small">Features</label>
                <div className="d-flex gap-3">
                  <label className="d-flex align-items-center gap-1">
                    <input
                      type="checkbox"
                      checked={editingRoom.attachedBathroom}
                      onChange={(e) => setEditingRoom({...editingRoom, attachedBathroom: e.target.checked})}
                    />
                    <span className="small">Attached Bathroom</span>
                  </label>
                  <label className="d-flex align-items-center gap-1">
                    <input
                      type="checkbox"
                      checked={editingRoom.balcony}
                      onChange={(e) => setEditingRoom({...editingRoom, balcony: e.target.checked})}
                    />
                    <span className="small">Balcony</span>
                  </label>
                  <label className="d-flex align-items-center gap-1">
                    <input
                      type="checkbox"
                      checked={editingRoom.kitchen}
                      onChange={(e) => setEditingRoom({...editingRoom, kitchen: e.target.checked})}
                    />
                    <span className="small">Kitchen</span>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label small">Furnishing Status</label>
                  <select 
                    className="form-select form-select-sm"
                    value={editingRoom.furnishingStatus}
                    onChange={(e) => setEditingRoom({...editingRoom, furnishingStatus: e.target.value})}
                  >
                    <option value="Non furnished">Non furnished</option>
                    <option value="Semi Finished">Semi Finished</option>
                    <option value="Furnished">Furnished</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label small">AC Status</label>
                  <select 
                    className="form-select form-select-sm"
                    value={editingRoom.acStatus}
                    onChange={(e) => setEditingRoom({...editingRoom, acStatus: e.target.value})}
                  >
                    <option value="Non AC">Non AC</option>
                    <option value="AC">AC</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-outline-premium" onClick={() => setEditingRoom(null)}>Cancel</button>
              <button className="btn-premium" onClick={() => updateRoomDetails(editingRoom.id, editingRoom)}>
                <Save size={14} className="me-1" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Room Modal */}
      {showAddRoom && (
        <div className="modal-overlay" onClick={() => setShowAddRoom(false)}>
          <div className="modal-container" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">Add New Room</h5>
              <button className="modal-close" onClick={() => setShowAddRoom(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label small">Room Number *</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g., 101, A1, Ground Floor"
                  value={newRoom.roomNumber}
                  onChange={(e) => setNewRoom({...newRoom, roomNumber: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label small">Room Type *</label>
                <select 
                  className="form-select form-select-sm"
                  value={newRoom.roomType}
                  onChange={(e) => setNewRoom({...newRoom, roomType: e.target.value})}
                >
                  <option value="">Select room type</option>
                  {roomTypeOptions.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label small">Price (₹/month)</label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="Monthly rent"
                  value={newRoom.price}
                  onChange={(e) => setNewRoom({...newRoom, price: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label small">Capacity</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g., 2 persons"
                  value={newRoom.capacity}
                  onChange={(e) => setNewRoom({...newRoom, capacity: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label small">Room Size (sq ft)</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g., 200"
                  value={newRoom.size}
                  onChange={(e) => setNewRoom({...newRoom, size: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label small">Features</label>
                <div className="d-flex gap-3">
                  <label className="d-flex align-items-center gap-1">
                    <input
                      type="checkbox"
                      checked={newRoom.attachedBathroom}
                      onChange={(e) => setNewRoom({...newRoom, attachedBathroom: e.target.checked})}
                    />
                    <span className="small">Attached Bathroom</span>
                  </label>
                  <label className="d-flex align-items-center gap-1">
                    <input
                      type="checkbox"
                      checked={newRoom.balcony}
                      onChange={(e) => setNewRoom({...newRoom, balcony: e.target.checked})}
                    />
                    <span className="small">Balcony</span>
                  </label>
                  <label className="d-flex align-items-center gap-1">
                    <input
                      type="checkbox"
                      checked={newRoom.kitchen}
                      onChange={(e) => setNewRoom({...newRoom, kitchen: e.target.checked})}
                    />
                    <span className="small">Kitchen</span>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label small">Furnishing Status</label>
                  <select 
                    className="form-select form-select-sm"
                    value={newRoom.furnishingStatus}
                    onChange={(e) => setNewRoom({...newRoom, furnishingStatus: e.target.value})}
                  >
                    <option value="Non furnished">Non furnished</option>
                    <option value="Semi Finished">Semi Finished</option>
                    <option value="Furnished">Furnished</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label small">AC Status</label>
                  <select 
                    className="form-select form-select-sm"
                    value={newRoom.acStatus}
                    onChange={(e) => setNewRoom({...newRoom, acStatus: e.target.value})}
                  >
                    <option value="Non AC">Non AC</option>
                    <option value="AC">AC</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-outline-premium" onClick={() => setShowAddRoom(false)}>Cancel</button>
              <button className="btn-premium" onClick={addNewRoom}>
                <Plus size={14} className="me-1" /> Add Room
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tenant Details Modal */}
      {showTenantModal && selectedRoom && (
        <div className="modal-overlay" onClick={() => setShowTenantModal(false)}>
          <div className="modal-container" style={{ maxWidth: '550px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">
                <User size={18} className="me-2" />
                {selectedRoom.tenantName ? 'Tenant Details' : 'Add Tenant'} - Room {selectedRoom.roomNumber}
              </h5>
              <button className="modal-close" onClick={() => setShowTenantModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small">Tenant Name *</label>
                  <div className="input-icon">
                    <User size={14} className="icon" />
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={tenantDetails.tenantName}
                      onChange={(e) => setTenantDetails({...tenantDetails, tenantName: e.target.value})}
                      placeholder="Full name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label small">Phone Number *</label>
                  <div className="input-icon">
                    <Phone size={14} className="icon" />
                    <input
                      type="tel"
                      className="form-control form-control-sm"
                      value={tenantDetails.tenantPhone}
                      onChange={(e) => setTenantDetails({...tenantDetails, tenantPhone: e.target.value})}
                      placeholder="10-digit mobile number"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label small">Email ID</label>
                  <div className="input-icon">
                    <Mail size={14} className="icon" />
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      value={tenantDetails.tenantEmail}
                      onChange={(e) => setTenantDetails({...tenantDetails, tenantEmail: e.target.value})}
                      placeholder="example@email.com"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label small">Move-in Date *</label>
                  <div className="input-icon">
                    <Calendar size={14} className="icon" />
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={tenantDetails.moveInDate}
                      onChange={(e) => setTenantDetails({...tenantDetails, moveInDate: e.target.value})}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label small">Rent Amount (₹/month)</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={tenantDetails.rentAmount}
                    onChange={(e) => setTenantDetails({...tenantDetails, rentAmount: e.target.value})}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small">Deposit Paid (₹)</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={tenantDetails.depositPaid}
                    onChange={(e) => setTenantDetails({...tenantDetails, depositPaid: e.target.value})}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small">ID Proof Type</label>
                  <select 
                    className="form-select form-select-sm"
                    value={tenantDetails.idProof}
                    onChange={(e) => setTenantDetails({...tenantDetails, idProof: e.target.value})}
                  >
                    <option>Aadhar Card</option>
                    <option>PAN Card</option>
                    <option>Passport</option>
                    <option>Driving License</option>
                    <option>Voter ID</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label small">Occupation</label>
                  <select 
                    className="form-select form-select-sm"
                    value={tenantDetails.occupation}
                    onChange={(e) => setTenantDetails({...tenantDetails, occupation: e.target.value})}
                  >
                    <option>Student</option>
                    <option>Working Professional</option>
                    <option>Business</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label small">Emergency Contact Number</label>
                  <div className="input-icon">
                    <Phone size={14} className="icon" />
                    <input
                      type="tel"
                      className="form-control form-control-sm"
                      value={tenantDetails.emergencyContact}
                      onChange={(e) => setTenantDetails({...tenantDetails, emergencyContact: e.target.value})}
                      placeholder="Emergency contact number"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-outline-premium" onClick={() => setShowTenantModal(false)}>Cancel</button>
              <button className="btn-premium" onClick={saveTenantDetails}>
                <Save size={14} className="me-1" /> Save Tenant Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomManagement;