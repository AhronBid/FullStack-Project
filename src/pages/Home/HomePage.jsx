import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./HomePage.module.css";

// Background images - homes in Israel
const backgroundImages = [
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
];

const HomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Preload all images for seamless transitions
    backgroundImages.forEach((url) => {
      const img = new Image();
      img.src = url;
    });

    // Change background image every 5 seconds with smooth crossfade
    const interval = setInterval(() => {
      setIsTransitioning(true);

      // After 1 second (when fade completes), switch to next image
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex) => (nextIndex + 1) % backgroundImages.length);
        setIsTransitioning(false);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [nextIndex]);

  return (
    <div className={styles.homePage}>
      {/* Current visible image */}
      <div
        className={`${styles.backgroundSlideshow} ${styles.currentSlide}`}
        style={{ backgroundImage: `url(${backgroundImages[currentIndex]})` }}
      >
        <div className={styles.overlay}></div>
      </div>

      {/* Next image that fades in during transition */}
      {isTransitioning && (
        <div
          className={`${styles.backgroundSlideshow} ${styles.nextSlide}`}
          style={{ backgroundImage: `url(${backgroundImages[nextIndex]})` }}
        >
          <div className={styles.overlay}></div>
        </div>
      )}

      <div className={styles.hero}>
        <h1 className={styles.title}>Welcome to Homes in Israel</h1>
        <p className={styles.subtitle}>Find your dream home with us</p>
        <div className={styles.ctaButtons}>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className={styles.primaryButton}>
                Go to Dashboard
              </Link>
              <Link to="/properties" className={styles.secondaryButton}>
                Manage Properties
              </Link>
            </>
          ) : (
            <>
              <Link to="/register" className={styles.primaryButton}>
                Get Started
              </Link>
              <Link to="/login" className={styles.secondaryButton}>
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      <div className={styles.features}>
        <Link to="/properties" className={styles.feature}>
          <h3>🏠 Property Management</h3>
          <p>Add, edit, and manage your real estate properties easily and efficiently</p>
        </Link>
        <Link to="/loan-calculator" className={styles.feature}>
          <h3>💰 Loan Calculator</h3>
          <p>Calculate monthly payments and plan your mortgage with our advanced calculator</p>
        </Link>
        <Link to="/dashboard" className={styles.feature}>
          <h3>📊 Dashboard</h3>
          <p>Get an overview of all your properties and loan calculations in one place</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
