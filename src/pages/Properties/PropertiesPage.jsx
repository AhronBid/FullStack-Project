import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProperty, deleteProperty, updateProperty, togglePropertyStatus } from "../../store/slices/propertiesSlice";
import PropertyForm from "./PropertyForm";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import styles from "./PropertiesPage.module.css";

const PropertiesPage = () => {
  const properties = useSelector((state) => state.properties.properties);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  const handleAddProperty = (propertyData) => {
    if (editingProperty) {
      dispatch(updateProperty({ ...propertyData, id: editingProperty.id }));
    } else {
      dispatch(addProperty(propertyData));
    }
    setShowForm(false);
    setEditingProperty(null);
  };

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  const handleDeleteProperty = (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      dispatch(deleteProperty(propertyId));
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

      {showForm && (
        <div className={styles.formOverlay}>
          <div className={styles.formContainer}>
            <PropertyForm onSubmit={handleAddProperty} onCancel={handleCancel} editProperty={editingProperty} />
          </div>
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
