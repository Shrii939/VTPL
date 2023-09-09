import React, { useEffect, useState } from "react";
import "../../../scss/Topbar.scss"; // Import the SCSS file
import { auth } from "../../../firebaseConfig";

function TopBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Add Firebase Authentication listener to get the currently signed-in user
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="top-bar">
      <div className="top-bar__logo">
        {/* <img src="/logo.png" alt="Logo" /> */}
        <span>My Website</span>
      </div>
      <ul className="top-bar__nav-menu">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/ocr">OCR</a>
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
      <div className="top-bar__search-bar">
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>
      <div className="top-bar__user-profile">
        {/* Display the user's email if they are signed in */}
        <span>{user ? user.email : "Guest"}</span>
      </div>
    </div>
  );
}

export default TopBar;
