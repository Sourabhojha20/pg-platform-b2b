import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Badge } from 'react-bootstrap';
import adService from '../../services/adService';

const ManageAdvertisements = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentAd, setCurrentAd] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    imageUrl: '',
    link: '',
    location: 'home_hero',
    status: 'active',
    priority: 1
  });

  useEffect(() => {
    loadAds();
  }, []);

  const loadAds = async () => {
    setLoading(true);
    try {
      const response = await adService.getAds();
      setAds(response.advertisements);
    } catch (error) {
      console.error('Failed to load ads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (ad = null) => {
    if (ad) {
      setCurrentAd(ad);
      setFormData(ad);
    } else {
      setCurrentAd(null);
      setFormData({
        title: '',
        subtitle: '',
        imageUrl: '',
        link: '',
        location: 'home_hero',
        status: 'active',
        priority: 1
      });
    }
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentAd) {
        await adService.updateAd(currentAd._id, formData);
      } else {
        await adService.createAd(formData);
      }
      setShowModal(false);
      loadAds();
    } catch (error) {
      alert('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this ad?')) {
      try {
        await adService.deleteAd(id);
        loadAds();
      } catch (error) {
        alert('Delete failed');
      }
    }
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" size="sm" onClick={() => handleShowModal()} className="px-3">
          <i className="fas fa-plus me-2"></i> Create New Ad
        </Button>
      </div>

      {loading ? (
        <div className="text-center p-5">
          <i className="fas fa-spinner fa-spin fa-2x"></i>
        </div>
      ) : (
        <div className="bg-white rounded shadow-sm">
          <Table responsive hover className="mb-0" style={{ fontSize: '0.85rem' }}>
            <thead className="bg-light">
              <tr>
                <th className="py-2">Advertisement</th>
                <th className="py-2">Location</th>
                <th className="py-2">Priority</th>
                <th className="py-2">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <tr key={ad._id}>
                  <td className="py-2">
                    <div className="d-flex align-items-center">
                      <img 
                        src={ad.imageUrl} 
                        alt="" 
                        style={{ width: '32px', height: '32px', objectFit: 'cover', borderRadius: '4px' }} 
                        className="me-2"
                      />
                      <div>
                        <div className="fw-bold" style={{ fontSize: '0.8rem' }}>{ad.title}</div>
                        <div className="text-muted" style={{ fontSize: '0.7rem' }}>{ad.subtitle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-2">
                    <Badge bg="info" style={{ fontSize: '0.65rem', padding: '3px 6px' }}>{ad.location.replace('_', ' ').toUpperCase()}</Badge>
                  </td>
                  <td className="py-2">{ad.priority}</td>
                  <td className="py-2">
                    <Badge bg={ad.status === 'active' ? 'success' : 'secondary'} style={{ fontSize: '0.65rem', padding: '3px 6px' }}>
                      {ad.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-2">
                    <Button variant="link" className="p-0 me-2" onClick={() => handleShowModal(ad)}>
                      <i className="fas fa-edit text-primary" style={{ fontSize: '0.9rem' }}></i>
                    </Button>
                    <Button variant="link" className="p-0" onClick={() => handleDelete(ad._id)}>
                      <i className="fas fa-trash text-danger" style={{ fontSize: '0.9rem' }}></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{currentAd ? 'Edit Advertisement' : 'Create Advertisement'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="title"
                    value={formData.title} 
                    onChange={handleInputChange}
                    required 
                  />
                </Form.Group>
              </div>
              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label>Placement Location</Form.Label>
                  <Form.Select 
                    name="location"
                    value={formData.location} 
                    onChange={handleInputChange}
                  >
                    <option value="home_hero">Home Page Hero</option>
                    <option value="home_mid">Home Page Middle</option>
                    <option value="listing_sidebar">Listing Page Sidebar</option>
                    <option value="listing_bottom">Listing Page Bottom</option>
                    <option value="property_sidebar">Property Details Sidebar</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Subtitle / Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={2}
                name="subtitle"
                value={formData.subtitle} 
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control 
                type="text" 
                name="imageUrl"
                value={formData.imageUrl} 
                onChange={handleInputChange}
                placeholder="https://..."
                required 
              />
            </Form.Group>

            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Group>
                  <Form.Label>Target Link (URL)</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="link"
                    value={formData.link} 
                    onChange={handleInputChange}
                    placeholder="/listings?..."
                  />
                </Form.Group>
              </div>
              <div className="col-md-3 mb-3">
                <Form.Group>
                  <Form.Label>Priority</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="priority"
                    value={formData.priority} 
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-3 mb-3">
                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <Form.Select 
                    name="status"
                    value={formData.status} 
                    onChange={handleInputChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit">{currentAd ? 'Update' : 'Create'}</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageAdvertisements;
