# Evangadi Forum - React Project

Evangadi Forum is a community-driven platform that allows users to ask questions and provide answers. The platform supports user registration, authentication, posting questions, and responding to existing questions.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
  - [Authentication Endpoints](#authentication-endpoints)
  - [Question Endpoints](#question-endpoints)
  - [Answer Endpoints](#answer-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The **Evangadi Forum** is a full-stack web application built with a React frontend and a Node.js/Express backend. It allows users to sign up, log in, post questions, and respond to other users' questions. The forum is designed to foster a community where users can interact by asking and answering questions.

## Features

- **User Registration and Authentication:** New users can sign up and log in using secure authentication.
- **JWT-based Authentication:** Session tokens are generated upon successful login for secure access to protected routes.
- **Post and View Questions:** Users can post questions and view a list of all questions.
- **Submit and View Answers:** Users can respond to questions and view other users' answers.
- **Responsive Design:** The frontend is fully responsive to provide a smooth user experience on all devices.
- **Persistent Data:** The data is stored persistently using a MySQL database.

## Technologies Used

### Frontend:
- **React.js** - A JavaScript library for building user interfaces.
- **CSS Modules** - CSS styles scoped to individual components.
- **Axios** - A promise-based HTTP client for making API requests.
- **React Router** - For navigation and routing within the app.

### Backend:
- **Node.js** - JavaScript runtime for backend logic.
- **Express.js** - Web framework for building the API.
- **MySQL** - Relational database for data storage.
- **bcrypt** - For secure password hashing.
- **JWT (JSON Web Token)** - For secure user authentication.
- **CORS** - Middleware for handling Cross-Origin Resource Sharing.

### Tools:
- **Postman** - API testing tool.
- **Render** - Platform for deploying the application.

## Getting Started

### Prerequisites

To run this project locally, you will need:
- **Node.js** and **npm** installed. [Download here](https://nodejs.org/).
- **MySQL** installed and running. [Download here](https://www.mysql.com/).
- **Git** for version control. [Download here](https://git-scm.com/).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Almaz-s/Evangadi-Forum.git
   cd Evangadi-Forum
