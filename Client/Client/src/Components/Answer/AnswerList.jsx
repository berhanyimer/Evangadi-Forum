import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import { FaUserCircle } from "react-icons/fa";
import "./answerList.css";

const AnswersList = () => {
  const { questionid } = useParams(); // Extract questionid from the URL
  const [answers, setAnswers] = useState([]); // State to store answers
  const [error, setError] = useState(""); // State to handle errors
  const [loading, setLoading] = useState(true); // State to handle loading

  // Fetch answers when component mounts or when questionid changes
  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const token = localStorage.getItem("token"); // Fetch the auth token
        const response = await axios.get(`answers/answer/${questionid}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in the headers
          },
        });
        setAnswers(response?.data?.answers); // Set answers in state
        setLoading(false); // Stop loading once answers are fetched
      } catch (error) {
        setError(
          error.response?.data?.message || "An unexpected error occurred."
        );
        setLoading(false); // Stop loading if an error occurs
      }
    };

    if (questionid) {
      fetchAnswers();
    }
  }, [questionid]);

  if (loading) return <p>Loading answers...</p>;

  return (
    <div className="answer_wrapper">
      <h3>Answers From The Community</h3>
      <hr />
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="answer_container">
          <ul>
            {answers.map((answer) => (
              <li key={answer.answerid}>
                <div className="user_answer_container">
                  {" "}
                  <p>
                    <FaUserCircle />
                  </p>
                  <p className="user">{answer.username}</p>
                </div>
                <p>{answer.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AnswersList;
