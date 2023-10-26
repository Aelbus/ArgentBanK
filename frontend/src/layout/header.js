import React from "react";
import Logo from "../assets/argentBankLogo.webp"
import "../styles/layout/header.css";

const Header = () => {
  return (
    <div className="header-div">
        <nav className="main-nav">
            <a className="main-nav-logo" href="./index.html">
                <img
                className="main-nav-logo-image"
                src={ Logo }
                alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </a>
            <div>
                <a className="main-nav-item" href="./sign-in.html">
                <i className="fa fa-user-circle"></i>
                Sign In
                </a>
            </div>
        </nav>
    </div>
  );
};

export default Header;