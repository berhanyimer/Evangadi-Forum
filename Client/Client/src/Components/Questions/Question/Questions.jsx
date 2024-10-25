import React, { useState, useEffect } from "react";
import axios from "../../../axiosConfig";
import "./PostQuestion.module.css";
import { FaArrowCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./PostQuestion.module.css";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(5); // Limit the number of questions per page to 5
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/questions`, {
          params: {
            page: currentPage,
            limit: questionsPerPage,
          },
        });
        setQuestions(response.data.questions);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching questions");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [currentPage, questionsPerPage]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>All Questions</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <ul className={styles.questionList}>
            {questions.map((question) => (
              <li key={question.questionid} className={styles.questionItem}>
                <h3>{question.title}</h3>
                <p>{question.description}</p>
                <p>Asked by: {question.username}</p>
              </li>
            ))}
          </ul>

          <div className={styles.pagination}>
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Questions;
