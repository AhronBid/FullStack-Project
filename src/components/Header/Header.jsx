import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import styles from "./Header.module.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Homes in Israel
        </Link>
        <nav className={styles.nav}>
          <Link to="/" className={`${styles.navLink} ${location.pathname === "/" ? styles.active : ""}`}>
            Home
          </Link>
          <Link
            to="/properties"
            className={`${styles.navLink} ${location.pathname === "/properties" ? styles.active : ""}`}
          >
            Properties
          </Link>
          <Link
            to="/loan-calculator"
            className={`${styles.navLink} ${location.pathname === "/loan-calculator" ? styles.active : ""}`}
          >
            Loan Calculator
          </Link>
        </nav>
        <div className={styles.authSection}>
          {isAuthenticated ? (
            <div className={styles.userMenu}>
              <span className={styles.userName}>{user?.name || "User"}</span>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/login" className={styles.loginButton}>
                Login
              </Link>
              <Link to="/register" className={styles.registerButton}>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
