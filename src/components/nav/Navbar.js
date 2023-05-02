import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";


function Navbar() {
  const navigate = useNavigate();
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  

  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };
  const handleLinkClick = () => {
    setActive("nav__menu");
    setIcon("nav__toggler");
  };

  return (
    <nav className="nav">
      
      <Link to="/" className="nav__brand profile">GR
      
      </Link>

      <ul className={active}>
        <li className="nav__item">
          <Link to="/books" className="nav__link" onClick={handleLinkClick}>
            Book Lists
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/prompts" className="nav__link" onClick={handleLinkClick}>
            Prompts
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/search" className="nav__link" onClick={handleLinkClick}>
            Search
          </Link>
        </li>
        {localStorage.getItem("book_user") ? (
          <li className="nav__item">
            <Link
              className="nav__link"
              to=""
              onClick={() => {
                localStorage.removeItem("book_user");
                navigate("/", { replace: true });
              }}
            >
              Logout
            </Link>
          </li>
        ) : null}
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Navbar;
