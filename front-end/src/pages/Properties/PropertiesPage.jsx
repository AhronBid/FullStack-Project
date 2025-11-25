import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProperties, createProperty, updateProperty, deleteProperty, togglePropertyStatus } from "../../store/slices/propertiesSlice";
import PropertyForm from "./PropertyForm";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import styles from "./PropertiesPage.module.css";

const PropertiesPage = () => {
  const properties = useSelector((state) => state.properties.properties);
  const { loading, error } = useSelector((state) => state.properties);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  // Fetch properties from API when component loads
  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const handleAddProperty = async (propertyData) => {
    try {
      // Transform form data to match backend API format
      const apiData = {
        title: `${propertyData.address}, ${propertyData.city}`,
        price: parseFloat(propertyData.price),
        location: `${propertyData.city}, Israel`,
        description: propertyData.description || '',
        status: propertyData.status || 'available',
        propertyType: propertyData.propertyType || 'apartment',
        image: propertyData.image || null,
        size: propertyData.size && propertyData.size !== '' ? parseFloat(propertyData.size) : null,
        rooms: propertyData.rooms && propertyData.rooms !== '' ? parseInt(propertyData.rooms) : null,
      };
      
      console.log('Sending to backend - apiData:', apiData); // Debug log
      console.log('Sending to backend - propertyType:', apiData.propertyType); // Debug log
      console.log('Original propertyData:', propertyData); // Debug log

      let result;
      if (editingProperty) {
        result = await dispatch(updateProperty({ 
          id: editingProperty.id, 
          propertyData: apiData 
        }));
      } else {
        result = await dispatch(createProperty(apiData));
      }
      
      console.log('Property created/updated result:', result); // Debug log
      
      setShowForm(false);
      setEditingProperty(null);
      // Small delay to ensure backend has saved, then refresh
      setTimeout(() => {
        dispatch(fetchProperties());
      }, 100);
    } catch (error) {
      console.error('Error saving property:', error);
    }
  };

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  const handleDeleteProperty = async (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      await dispatch(deleteProperty(propertyId));
    }
  };

  const handleToggleStatus = (propertyId) => {
    dispatch(togglePropertyStatus(propertyId));
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProperty(null);
  };

  return (
    <div className={styles.propertiesPage}>
      <div className={styles.header}>
        <h1>Property Management</h1>
        <button className={styles.addButton} onClick={() => setShowForm(true)}>
          {editingProperty ? "Edit Property" : "Add New Property"}
        </button>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Properties</span>
          <span className={styles.statValue}>{properties.length}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Available</span>
          <span className={styles.statValue}>{properties.filter((p) => p.status === "available").length}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Sold</span>
          <span className={styles.statValue}>{properties.filter((p) => p.status === "sold").length}</span>
        </div>
      </div>

      {error && (
        <div className={styles.errorMessage}>
          Error: {error}
        </div>
      )}

      {showForm && (
        <div className={styles.formOverlay}>
          <div className={styles.formContainer}>
            <PropertyForm onSubmit={handleAddProperty} onCancel={handleCancel} editProperty={editingProperty} />
          </div>
        </div>
      )}

      {loading && (
        <div className={styles.loading}>
          Loading properties...
        </div>
      )}

      <div className={styles.propertiesGrid}>
        {properties.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>No properties registered</h3>
            <p>Click "Add New Property" to get started</p>
          </div>
        ) : (
          properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onDelete={handleDeleteProperty}
              onEdit={handleEditProperty}
              onToggleStatus={handleToggleStatus}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;
