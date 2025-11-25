/**
 * Property Form Component
 * Form for adding or editing properties
 */

import { useState, useEffect } from 'react';
import './PropertyForm.module.css';

function PropertyForm({ property, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    description: '',
    status: 'available',
  });

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || '',
        price: property.price || '',
        location: property.location || '',
        description: property.description || '',
        status: property.status || 'available',
      });
    }
  }, [property]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? parseFloat(value) || '' : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="property-form-overlay">
      <div className="property-form-container">
        <h2>{property ? 'ערוך נכס' : 'הוסף נכס חדש'}</h2>
        <form onSubmit={handleSubmit} className="property-form">
          <div className="form-group">
            <label htmlFor="title">כותרת *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">מחיר (₪) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="1000"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">מיקום *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">תיאור</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">סטטוס</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="available">זמין</option>
              <option value="sold">נמכר</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              {property ? 'עדכן' : 'הוסף'}
            </button>
            <button type="button" onClick={onCancel} className="cancel-btn">
              ביטול
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PropertyForm;


