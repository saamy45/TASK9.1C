import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import './App.css';

function NavigationBar() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state on authentication change
    });
    return () => unsubscribe();
  }, [auth]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("You have been signed out.");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <div className="topnav">
        <a className="logo"><Link to="/">DEV@DEAKIN</Link></a>
        <input type="text" className="search-bar" placeholder="Search..." />
        {user ? (
          <a className="option" onClick={handleSignOut}>Sign Out</a>
        ) : (
          <a className="option"><Link to="/login">Sign In</Link></a>
        )}
        <Outlet />
      </div>
    </div>
  );
}

export default NavigationBar;
