import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosBase from "../../axiosConfig";
import "./SignIn.css"; // Custom styling for the SignIn component
import VisibilityIcon from "@mui/icons-material/Visibility"; // Eye icon for showing password
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"; // Eye-off icon for hiding password
import AppState from "../../App";

function SignIn() {
  // const { user, setUser } = useContext(AppState) || {};
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [errorMessage, setErrorMessage] = useState(""); // State to handle error messages
  const [processing, setProcessing] = useState(false); // State to handle login process state
  const [email, setEmail] = useState(""); // State to store the user's email input
  const [password, setPassword] = useState(""); // State to store the user's password input
  const navigate = useNavigate(); // Navigation hook for programmatic redirects

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation to ensure email and password are provided
    if (!email || !password) {
      alert("Please provide all required information");
      return;
    }

    try {
      setProcessing(true); // Set processing state to true during API request
      setErrorMessage(""); // Clear any previous error messages

      // Send API request to log in the user
      //const axios = require("axios");
      let data = JSON.stringify({
        email: email,
        password: password,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "/users/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axiosBase
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          // On successful login, store the token and navigate to a different page
          //localStorage.setItem("token", response.data.token); // Save token to localStorage
          //alert(JSON.stringify(response.data));
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", response.data.user);

          console.log("LoginResponse", response.data);

          navigate("/allQuestions"); // Redirect to QuestionDetail page after login
          // alert("Login successful!");
          // setUser(response.data.user);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      // Handle error if login fails and display an appropriate message
      console.error("Login failed: ", error.response || error.message);
      setErrorMessage(error?.response?.data?.msg || "Unexpected Error!");
    }
    setProcessing(false); // Set processing state back to false after API request
  };

  // Toggles the password visibility between plain text and hidden
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {processing ? (
        <p>Loading...</p>
      ) : (
        <div className="login-page">
          {/* Left-side login form */}
          <div className="login-form-container">
            <h2>Login to your account</h2>
            <p>
              Don’t have an account?
              <Link to="/SignUp" className="create-account-link">
                Create a new account
              </Link>
            </p>

            <form className="login-form" onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />

              <label htmlFor="password">Password</label>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"} // Show or hide password based on state
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                <span
                  className="show-password"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}{" "}
                  {/* Toggle visibility icon */}
                </span>
              </div>

              <button type="submit" className="login-btn" disabled={processing}>
                {processing ? "Logging in..." : "Login"}{" "}
                {/* Show processing state */}
              </button>

              {/* Display error message if present */}
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
          </div>

          {/* Right-side info section */}
          <div className="info__networks">
            <h3 className="abt-login">About</h3>
            <br />
            <h2>Evangadi Networks Q & A</h2>
            <br />
            <p>
              No matter what stage of life you are in, whether you're just
              starting elementary school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps.
            </p>
            <p>
              Whether you are willing to share your knowledge or you are just
              looking to meet mentors of your own, please start by joining the
              network here.
            </p>
            <Link to="/HowItWorks" className="how-btn">
              How it Works
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default SignIn;
