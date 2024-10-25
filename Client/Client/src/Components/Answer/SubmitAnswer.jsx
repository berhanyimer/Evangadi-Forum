import React, { useState } from "react";
import axios from "../../axiosConfig"; // Import axios configuration
import "./submitAnswer.css"; // Link to CSS for styling
import AnswersList from "../Answer/AnswerList"; // Component for displaying list of answers
import { useNavigate } from "react-router-dom"; // Hook for navigation

const SubmitAnswer = ({ questionid }) => {
  // Receive questionid as a prop to associate the answer with a specific question
  const [answer, setAnswer] = useState(""); // State to store the user's answer input
  const [responseMessage, setResponseMessage] = useState(""); // State to handle response messages
  const navigate = useNavigate(); // Hook for navigation after submitting the answer

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const token = localStorage.getItem("token"); // Fetch the auth token from local storage
      const response = await axios.post(
        "/answers/answer",
        {
          questionid, // Pass the question ID
          answer, // Pass the user's answer
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers for authorization
            "Content-Type": "application/json", // Set the content type to JSON
          },
        }
      );
      setResponseMessage(response.data.msg); // Set success message from server response
      navigate("/allQuestions"); // Redirect to the list of questions after successful answer submission
    } catch (error) {
      // Handle error response
      setResponseMessage(
        error.response?.data?.msg || "An unexpected error occurred." // Set error message if the request fails
      );
    }
  };

  return (
    <div className="answer-container">
      <AnswersList /> {/* Display the list of answers */}
      <form onSubmit={handleSubmit} className="answer-form">
        <textarea
          className="answer-input"
          placeholder="Your answer ..." // Textarea for the user to input their answer
          value={answer} // Bind the answer state to the textarea value
          onChange={(e) => setAnswer(e.target.value)} // Update answer state when user types
        />
        <div className="button-container">
          {/* Submit and Back buttons */}
          <button type="submit" className="submit-button">
            Post Answer
          </button>
          <button
            type="button"
            className="back-button"
            onClick={() => navigate(-1)} // Navigate back to the previous page
          >
            Back
          </button>
        </div>
      </form>
      {/* Display response message if available */}
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
};

export default SubmitAnswer;
