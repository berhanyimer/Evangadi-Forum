// db connection
const dbConnection = require("../db/dbConfig");

// import bcrypt
const bcrypt = require("bcrypt");

//import StatusCodes
const { StatusCodes } = require("http-status-codes");

//import json web token
const jwt = require("jsonwebtoken");

// to register
async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;

  // Check if all required fields are provided
  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required information" });
  }

  try {
    // Check if the user already exists by username or email
    const [existingUser] = await dbConnection.query(
      "SELECT username, userid FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    // If user already exists, return an error
    if (existingUser.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User already existed" });
    }
    // start registering
    //check for password strength
   
 if (password.length <= 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password must be at least 8 characters" });
    }
    //encrypt the password
    const salt = await bcrypt.genSalt(10); // Generate a unique salt to add randomness to the password before hashing. The '10' specifies the number of salt rounds (iterations), balancing security and performance.
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the plain-text password with the generated salt to ensure secure storage in the database.'password' is the user's input, and 'salt' adds randomness to the hash.

    // Insert new user if no existing user is found
    await dbConnection.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, firstname, lastname, email, hashedPassword]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "User registered successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later" });
  }
}
//to log in
async function login(req, res) {
  const { email, password } = req.body;
  //validate if all required fields are provided
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields" });
  }

  try {
    //Check if a user with the same username or email already exists
    const [user] = await dbConnection.query(
      "SELECT username, userid, password FROM users WHERE email = ?",
      [email]
    );

    if (user.length == 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credential" });
    }

    //If user/email/ exist compare password and encrypt password
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credential" });
    }
    //login including token
    const username = user[0].username;
    const userid = user[0].userid;

    const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res
      .status(StatusCodes.OK)
      .json({ msg: "user login successful", token, username });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later" });
  }
}

//validation route for authenticated users
async function checkUser(req, res) {
  const username = req.user.username;
  const userid = req.user.userid;
  res.status(StatusCodes.OK).json({ msg: "valid user", username, userid });
}

module.exports = { register, login, checkUser };
