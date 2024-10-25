// db connection
const dbConnection = require("../db/dbConfig");
// import StatusCodes
const { StatusCodes } = require("http-status-codes");

// Function to submit an answer for a question
async function submitAnswer(req, res) {
  const { questionid, answer } = req.body;

  // Check if all required fields are provided
  if (!answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide answer" });
  }

  try {
    // Inserting the answer into the database
    await dbConnection.query(
      "INSERT INTO answers (questionid, answer, userid) VALUES (?, ?, ?)",
      [questionid, answer, req.user.userid]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Answer posted successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An unexpected error occurred." });
  }
}

// Function to retrieve all answers for a question

async function allAnswer(req, res) {
  const { questionid } = req.params;

  try {
    // Query the answers table and join with the users table to get the username
    const [answers] = await dbConnection.query(
      `SELECT a.answerid, a.answer, a.userid, u.username
       FROM answers a
       JOIN users u ON a.userid = u.userid
       WHERE a.questionid = ?`,
      [questionid]
    );

    // If no answers are found
    if (answers.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "No answers found for the requested question.",
      });
    }

    // Return all answers along with the username
    return res.status(StatusCodes.OK).json({ answers });
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

module.exports = { submitAnswer, allAnswer };
