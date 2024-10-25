import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../axiosConfig";
import { AppState } from "../../../App";
import SubmitAnswer from "../../Answer/SubmitAnswer";
import { FaArrowCircleRight } from "react-icons/fa";
import "./singleQuestion.css";

const SingleQuestion = () => {
  const { user } = useContext(AppState); // Get user from context
  const { questionid } = useParams(); // Get the questionid from URL
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User is not authenticated.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/questions/question/${questionid}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in Authorization header
          },
        });

        setQuestion(response.data.question); // Set question data
        setLoading(false);
      } catch (err) {
        setError(
          err.response?.data?.message || "An unexpected error occurred."
        );
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [questionid]);

  return (
    <div className="single_question_container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <div className="questionHeader">
            <p>QUESTION</p>
          </div>
          <div>
            <div className="question_title_wrapper">
              <span className="question_title">
                <h2>
                  <FaArrowCircleRight style={{ color: " #007bff" }} />{" "}
                  {question.title}
                </h2>
              </span>
              <hr />
            </div>
            <div className="question-desc">
              <p className="question-description">{question.description}</p>
              <hr />
            </div>
                <SubmitAnswer questionid={questionid} />
              
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleQuestion;
