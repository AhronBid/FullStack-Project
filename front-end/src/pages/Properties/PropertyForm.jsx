import React, { useState, useEffect } from "react";
import styles from "./PropertyForm.module.css";

const PropertyForm = ({ onSubmit, onCancel, editProperty = null }) => {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    propertyType: "apartment",
    size: "",
    rooms: "",
    price: "",
    description: "",
    status: "available",
    image: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editProperty) {
      setFormData({
        address: editProperty.address || "",
        city: editProperty.city || "",
        propertyType: editProperty.propertyType || "apartment",
        size: editProperty.size || "",
        rooms: editProperty.rooms || "",
        price: editProperty.price || "",
        description: editProperty.description || "",
        status: editProperty.status || "available",
        image: editProperty.image || "",
      });
    }
  }, [editProperty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.size || Number(formData.size) <= 0) {
      newErrors.size = "Valid size is required";
    }

    if (!formData.rooms || Number(formData.rooms) <= 0) {
      newErrors.rooms = "Valid number of rooms is required";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Valid price is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (editProperty) {
      onSubmit({ ...formData, id: editProperty.id });
    } else {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>{editProperty ? "Edit Property" : "Add New Property"}</h2>

      <div className={styles.formGroup}>
        <label htmlFor="address">Address *</label>
        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
        {errors.address && <span className={styles.error}>{errors.address}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="city">City *</label>
        <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} />
        {errors.city && <span className={styles.error}>{errors.city}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="propertyType">Property Type</label>
        <select id="propertyType" name="propertyType" value={formData.propertyType} onChange={handleChange}>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="villa">Villa</option>
          <option value="penthouse">Penthouse</option>
          <option value="commercial">Commercial</option>
        </select>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="size">Size (m²) *</label>
          <input type="number" id="size" name="size" value={formData.size} onChange={handleChange} />
          {errors.size && <span className={styles.error}>{errors.size}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="rooms">Rooms *</label>
          <input type="number" id="rooms" name="rooms" value={formData.rooms} onChange={handleChange} />
          {errors.rooms && <span className={styles.error}>{errors.rooms}</span>}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="price">Price (₪) *</label>
        <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
        {errors.price && <span className={styles.error}>{errors.price}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="status">Status</label>
        <select id="status" name="status" value={formData.status} onChange={handleChange}>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="image">Image URL</label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" />
      </div>

      <div className={styles.formActions}>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>
          Cancel
        </button>
        <button type="submit" className={styles.submitButton}>
          {editProperty ? "Update Property" : "Add Property"}
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;
