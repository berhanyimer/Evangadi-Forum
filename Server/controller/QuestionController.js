// db connection
const dbConnection = require("../db/dbConfig");
//import StatusCodes
const { StatusCodes } = require("http-status-codes");

// Function to create a new question
async function registerQuestion(req, res) {
  const { title, description } = req.body;

  // Check if all required fields are provided
  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields" });
  }

  try {
    const result = await dbConnection.query(
      "INSERT INTO questions (title, description, userid) VALUES (?, ?, ?)",
      [title, description, req.user.userid] // Assuming req.user contains authenticated user info
    );
    console.log(result);
    const insertedId = result[0].insertId;
    if (!insertedId) {
      throw new Error("Insert operation failed, no id was returned");
    }

    // Update the questionid using the newly generated id
    await dbConnection.query(
      "UPDATE questions SET questionid = CONCAT('Q-', ?) WHERE id = ?",
      [insertedId, insertedId]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Question created successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An unexpected error occurred." });
  }
}
// Function to retrieve all questions with pagination and ordering
async function allQuestions(req, res) {
  const limit = parseInt(req.query.limit) || 5; // Default limit is 5 questions per page
  const page = parseInt(req.query.page) || 1; // Default page is 1
  const offset = (page - 1) * limit; // Calculate offset for pagination

  try {
    // Query to select questions ordered by creation date (most recent first) and with pagination
    const [questions] = await dbConnection.query(
      `SELECT questions.questionid, questions.title, questions.description, questions.created_at, users.username
       FROM questions
       JOIN users ON questions.userid = users.userid
       ORDER BY questions.created_at DESC
       LIMIT ? OFFSET ?`, // Limit and offset for pagination
      [limit, offset]
    );

    // If no questions are found
    if (questions.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Not Found", message: "No questions found." });
    }

    // Query to get the total number of questions (for pagination purposes)
    const [[totalResult]] = await dbConnection.query(
      "SELECT COUNT(*) AS total FROM questions"
    );
    const totalQuestions = totalResult.total;
    const totalPages = Math.ceil(totalQuestions / limit); // Calculate total pages

    return res.status(StatusCodes.OK).json({
      questions,
      currentPage: page,
      totalPages,
      totalQuestions,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}


// Function to retrieve all questions
// async function allQuestions(req, res) {
//   try {
//     const [questions] = await dbConnection.query(
//       `SELECT questions.questionid, questions.title, questions.description, users.username
//        FROM questions
//        JOIN users ON questions.userid = users.userid`
//     );

//     if (questions.length === 0) {
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ error: "Not Found", message: "No questions found." });
//     }

//     return res.status(StatusCodes.OK).json({ questions });
//   } catch (error) {
//     console.log(error.message);
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       error: "Internal Server Error",
//       message: "An unexpected error occurred.",
//     });
//   }
// }

// Function to retrieve a single question by question_id
async function singleQuestion(req, res) {
  const { questionid } = req.params;
  console.log(req.params);
  try {
    const [result] = await dbConnection.query(
      `SELECT questionid, title, description, userid
       FROM questions 
       WHERE questionid = ?`,
      [questionid]
    );
    console.log(result);
    if (result.length === 0) {
      console.log("Not Found");
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "The requested question could not be found.",
      });
    }

    return res.status(StatusCodes.OK).json({ question: result[0] });
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

module.exports = { registerQuestion, allQuestions, singleQuestion };
