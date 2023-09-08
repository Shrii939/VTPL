import React from "react";
import "../../../scss/Topbar.scss";

function TopBar() {
  // Dummy user data for the profile feature
  const user = {
    name: "John Doe",
    avatar: "/avatar.jpg", // Replace with the actual path to the user's avatar
  };

  return (
    <div className="top-bar">
      <div className="logo">
        {/* <img src="/logo.png" alt="Logo" /> */}
        <span>My Website</span>
      </div>
      <div className="user-profile">
        {/* <img src={user.avatar} alt={user.name} /> */}
      </div>
      <ul className="nav-menu">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/services">Services</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li></li>
      </ul>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>
      <span>{user.name}</span>
    </div>
  );
}

export default TopBar;
