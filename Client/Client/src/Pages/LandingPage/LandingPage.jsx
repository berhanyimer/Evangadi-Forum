import React, { useContext } from "react";
import classes from "./LandingPage.module.css";
import studentsChatting from "../../assets/image/10002.png"; // students image
import { AppState } from "../../App"; // Importing AppState context
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const { user } = useContext(AppState); // Access user from AppState context
  const navigate = useNavigate(); // Hook for navigation

  const handleJoinNowOnClick = () => {
    navigate("/SignUP"); // Navigate to Sign Up page when "Join Now" is clicked
  };

  return (
    <>
      <div className="homeContainer">
        <div className={classes.homePage}>
          <div className={classes.textContent}>
            <h2>
              Evangadi <br />
              Forum
            </h2>
            <p>
              Welcome to Evangadi Forum—your premier tech community for global
              networking and learning. Join us to connect with peers,
              collaborate on projects, and enhance your professional growth.
              Explore the features that can elevate your tech journey today.
            </p>
            <button onClick={handleJoinNowOnClick} className={classes.joinBtn}>
              Join Now
            </button>
          </div>
          {/* Image container */}
          <div className={classes.imageContent}>
            <img
              src={studentsChatting}
              alt="Discussion illustration"
              className={classes.chattingImage}
            />
          </div>
        </div>
        {/* Conditional rendering for logged-in user */}
        {user && <h3>Welcome, {user.username}!</h3>}
      </div>
    </>
  );
}

export default LandingPage;
