import React from "react";

import "./Header.css";

function Header({ text, status }) {
  return (
    <div
      className={`header ${status === "won" ? "header__green" : null} ${
        status === "lost" ? "header__red" : null
      }`}
    >
      {text}
    </div>
  );
}

export default Header;
