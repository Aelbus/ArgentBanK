import React from "react";
import Logo from "../assets/argentBankLogo.webp";
import { Link } from "react-router-dom"; // Importez Link
import "../styles/layout/header.css";

const Header = () => {
  return (
    <div className="header-div">
      <nav className="main-nav">
        <Link to="/" className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={Logo}
            alt="Logo Argent Bank"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <a className="main-nav-item" href="./sign-in.html">
            <i className="fa fa-user-circle"></i>
            SignIn
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Header;
