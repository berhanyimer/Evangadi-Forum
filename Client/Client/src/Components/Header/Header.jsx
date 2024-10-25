import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import classes from "./header.module.css"; 
import { AppState } from "../../App"; 

function Header() {
  const navigate = useNavigate(); // Hook for navigation
  const { user, setUser } = useContext(AppState); // Access user state and setter function from context

  const token = localStorage.getItem("token"); // Retrieve the token from localStorage to check login status

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from localStorage to log out the user
    setUser(null); // Reset the user state to null on logout
    navigate("/SignIn"); // Navigate to the login page after logout
  };

  const isUserLoggedIn = !!token; // Boolean to check if the user is logged in (true if token exists)

  return (
    <header className={classes.header}>
      {/* Logo Section */}
      <div className={classes.logo}>
        <Link to="/">
          <img
            src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png"
            alt="Evangadi Logo"
          />
        </Link>
      </div>

      {/* Navigation Links Section */}
      <div className={classes.navSection}>
        <ul className={classes.navLinks}>
          {/* Home Link */}
          <li>
            <Link to="/" className={classes.navButton}>
              Home
            </Link>
          </li>

          {/* How It Works Link */}
          <li>
            <Link to="/HowItWorks" className={classes.navButton}>
              How it works
            </Link>
          </li>

          {/* Conditionally render Sign Out or Sign In based on login status */}
          {isUserLoggedIn ? (
            // If user is logged in, show Sign Out button
            <button onClick={handleLogout} className={classes.buttonPrimary}>
              Sign Out
            </button>
          ) : (
            // If user is not logged in, show Sign In button
            <Link to="/SignIn" className={classes.loginBtn}>
              <button className={classes.buttonPrimary}>Sign In</button>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
