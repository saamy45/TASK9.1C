import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithGooglePopup, createUserDocFromAuth } from "./firebase";

const Login = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const [contact, setContact] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      if (contact.username === "" || contact.password === "") {
        alert("Please enter credentials");
        return;
      }
      const res = await signInWithEmailAndPassword(auth, contact.username, contact.password);
      console.log("Logged in user:", res.user.email);
      navigate('/'); 
    } catch (error) {
      console.error("Error logging in:", error.message);
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      await createUserDocFromAuth(user);
      navigate('/'); 
    } catch (error) {
      console.error("Error with Google Sign-In:", error.message);
    }
  };

  return (
    <div className="signin-container">
      <h1>DEV@DEAKIN</h1>
      <input
        name="username"
        type="email"
        placeholder="Email"
        value={contact.username}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={contact.password}
        onChange={handleChange}
      />
      <button onClick={handleLogin}>Log In</button>
      <button onClick={handleGoogleLogin}>Log In with Google</button>
    </div>
  );
};

export default Login;
