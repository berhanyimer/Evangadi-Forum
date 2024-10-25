import React from "react";
import "./HowItWorks.css"; // Import the CSS file

function HowItWorks() {
  return (
    <>
      <div className="how-it-works">
        <h1>How it works</h1>
      </div>

      <div className="description_Wrapper">
        <div>
          <h3>Introduction</h3>
          <p>
            Welcome to EVANGADI FORUM, a platform where technology enthusiasts
            connect, share, and solve problems collaboratively. Our forum is
            designed to help you find answers, contribute your knowledge, and
            engage with a community of like-minded individuals.
          </p>
        </div>

        <div>
          <h3>Creating an Account</h3>
          <p>
            To become a member of our community, please click the 'Sign Up'
            button located at the top right of the page. Enter your email
            address, select a username, and create a password. You will receive
            a confirmation email to activate your account.
          </p>
        </div>

        <div>
          <h3>Exploring Categories</h3>
          <p>Our forum is organized into various categories. These include:</p>
          <ul>
            <li>
              Categories displaying questions asked by other forum members.
            </li>
            <li>Pages with detailed views of individual questions.</li>
            <li>Areas where you can post your own questions.</li>
          </ul>
          <p>
            Use the navigation bar to access the home page and to log out from
            the forum.
          </p>
        </div>

        <div>
          <h3>Searching for Questions</h3>
          <p>
            To post a new question, provide a clear and descriptive title, and
            include a detailed explanation of your question or topic. Click
            'Post' to submit your inquiry.
          </p>
        </div>

        <div>
          <h3>Replying to a Question</h3>
          <p>
            To respond to a question, open the specific question you are
            interested in and type your response in the text box provided. Click
            'Post Answer' to share your insights or provide a solution.
          </p>
        </div>

        <div>
          <h3>Community Guidelines</h3>
          <p>
            To ensure a positive experience for all members, please adhere to
            our community guidelines. Be respectful, avoid spam, and contribute
            constructively to discussions.
          </p>
        </div>

        <div>
          <h3>Contact and Support</h3>
          <p>
            For additional information, please visit our Evangadi Networks page
            or contact our support team via the Contact Info section located at
            the bottom of the page. We are here to assist you with any questions
            or concerns you may have.
          </p>
          <p>
            We are excited to have you join our community! Dive in, share your
            knowledge, and enjoy the discussions. Happy posting!
          </p>
        </div>
      </div>
    </>
  );
}

export default HowItWorks;
