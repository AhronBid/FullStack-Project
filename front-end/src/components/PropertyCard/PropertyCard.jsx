import React from "react";
import styles from "./PropertyCard.module.css";

const PropertyCard = ({ property, onDelete, onEdit, onToggleStatus }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IL", {
      style: "currency",
      currency: "ILS",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Use property image if available, otherwise use default based on property type
  const imageUrl = property.image || `https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&q=80`;

  const getPropertyTypeLabel = (type) => {
    const types = {
      apartment: "Apartment",
      house: "House",
      villa: "Villa",
      penthouse: "Penthouse",
      commercial: "Commercial",
    };
    return types[type] || type;
  };

  const getStatusBadgeClass = (status) => {
    return status === "sold" ? styles.sold : styles.available;
  };

  return (
    <div className={styles.propertyCard}>
      <div className={styles.cardImage} style={{ backgroundImage: `url(${imageUrl})` }}></div>

      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          <h3 className={styles.propertyTitle}>{getPropertyTypeLabel(property.propertyType)}</h3>
          <span className={`${styles.statusBadge} ${getStatusBadgeClass(property.status)}`}>
            {property.status === "sold" ? "Sold" : "Available"}
          </span>
        </div>
        <div className={styles.cardActions}>
          {onToggleStatus && (
            <button
              className={styles.toggleButton}
              onClick={() => onToggleStatus(property.id)}
              title={property.status === "sold" ? "Mark as Available" : "Mark as Sold"}
            >
              {property.status === "sold" ? "✓" : "○"}
            </button>
          )}
          {onEdit && (
            <button className={styles.editButton} onClick={() => onEdit(property)} title="Edit Property">
              ✎
            </button>
          )}
          {onDelete && (
            <button className={styles.deleteButton} onClick={() => onDelete(property.id)} title="Delete Property">
              ×
            </button>
          )}
        </div>
      </div>

      <div className={styles.propertyDetails}>
        <div className={styles.address}>
          <strong>Address:</strong> {property.address}
        </div>
        <div className={styles.city}>
          <strong>City:</strong> {property.city}
        </div>

        <div className={styles.propertyInfo}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Size:</span>
            <span className={styles.infoValue}>{property.size && property.size > 0 ? property.size : 'N/A'} m²</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Rooms:</span>
            <span className={styles.infoValue}>{property.rooms && property.rooms > 0 ? property.rooms : 'N/A'}</span>
          </div>
        </div>

        <div className={styles.price}>{formatCurrency(property.price)}</div>

        {property.description && (
          <div className={styles.description}>
            <strong>Description:</strong>
            <p>{property.description}</p>
          </div>
        )}

        <div className={styles.createdAt}>Added: {new Date(property.createdAt).toLocaleDateString("en-US")}</div>
      </div>
    </div>
  );
};

export default PropertyCard;
