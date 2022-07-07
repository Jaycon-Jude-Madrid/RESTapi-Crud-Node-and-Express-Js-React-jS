import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/add") {
      setActiveTab("AddUser");
    } else if (location.pathname === "/about") {
      setActiveTab("About");
    }
  }, [location]);
  console.log(activeTab);
  return (
    <div className="header">
      <div className="header-logo">
        {" "}
        <Link to="/">
          {" "}
          <p className="logo">User System</p>
        </Link>
      </div>

      <div className="header-right">
        <Link to="/">
          <p
            className={`${activeTab}` === "Home" ? "active" : ""}
            onClick={() => setActiveTab("Home")}
          >
            Home
          </p>
        </Link>
        <Link to="/add">
          <p
            className={`${activeTab}` === "AddUser" ? "active" : ""}
            onClick={() => setActiveTab("AddUser")}
          >
            Add user
          </p>
        </Link>
        <Link to="/about">
          <p
            className={`${activeTab}` === "About" ? "active" : ""}
            onClick={() => setActiveTab("About")}
          >
            About
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
