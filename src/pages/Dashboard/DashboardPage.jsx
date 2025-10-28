import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import LoanCalculator from "../../components/LoanCalculator/LoanCalculator";
import styles from "./DashboardPage.module.css";

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const properties = useSelector((state) => state.properties.properties);

  const availableProperties = properties.filter((p) => p.status === "available");
  const soldProperties = properties.filter((p) => p.status === "sold");

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.header}>
        <div>
          <h1>Welcome back, {user?.name || "User"}!</h1>
          <p className={styles.subtitle}>Manage your properties and calculate loans</p>
        </div>
        <Link to="/properties" className={styles.manageButton}>
          Manage Properties
        </Link>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🏠</div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{properties.length}</span>
            <span className={styles.statLabel}>Total Properties</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{availableProperties.length}</span>
            <span className={styles.statLabel}>Available</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>💰</div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{soldProperties.length}</span>
            <span className={styles.statLabel}>Sold</span>
          </div>
        </div>
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.propertiesSection}>
          <div className={styles.sectionHeader}>
            <h2>Recent Properties</h2>
            <Link to="/properties" className={styles.viewAllLink}>
              View All →
            </Link>
          </div>
          <div className={styles.propertiesList}>
            {properties.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No properties yet</p>
                <Link to="/properties" className={styles.addLink}>
                  Add Your First Property
                </Link>
              </div>
            ) : (
              properties
                .slice(0, 3)
                .map((property) => <PropertyCard key={property.id} property={property} onDelete={() => {}} />)
            )}
          </div>
        </div>

        <div className={styles.calculatorSection}>
          <h2>Loan Calculator</h2>
          <LoanCalculator />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
