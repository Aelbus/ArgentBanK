import React from "react";
import "../styles/pages/SignIn.css";

const SignIn = () => {
  return (
    <main className="pages-div">
      <div className="main-signin">
        <section className="signin">
          <form className="signin-form">
            <div className="form-header">
              <i className="fa-solid fa-circle-user"></i>
              <h2>Sign In</h2>
            </div>

            <label htmlFor="username">Username</label>
            <input type="text" id="username" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" />

            <div className="saveLogins-container">
              <label htmlFor="savelogins">Remember me</label>
              <input type="checkbox" id="savelogins" />
            </div>

            <button type="submit" className="signin-button">
              Sign In
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default SignIn;
