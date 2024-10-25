import React, { useEffect, useState, useContext } from "react";
import axios from "../../axiosConfig";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import "./Home.css";
import { AppState } from "../../App";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useContext(AppState);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch questions from the backend
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("/questions/allquestions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setQuestions(response.data.questions);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to fetch questions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);
//filter questions
  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // if (loading) return <p>Loading questions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <div className="question-list-container">
          <div className="top-bar">
            <Link to="/question">
              <button className="ask-question-btn">Ask Question</button>
            </Link>

            <div className="welcome-message">
              Welcome: <span className="username">{user?.username}</span>
            </div>
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search question"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="question-items">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question) => (
                <div className="question-item" key={question.questionid}>
                  <div className="user">
                    <FaUserCircle className="user-icon" />
                    <p className="question-author">{question.username}</p>
                  </div>
                  <div className="question-content">
                    <Link to={`/question/${question.questionid}`}>
                      <p className="question-title">{question.title}</p>
                    </Link>
                  </div>
                  <IoIosArrowForward className="arrow-icon" />
                </div>
              ))
            ) : (
              <p>No questions found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
