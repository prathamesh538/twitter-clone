import React, { useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import twitterImage from "../../src/images/twitter-2672572_1280.jpg";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";
import "./login.css";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signUp, googleSignIn } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Calling signUp function from UserAuthContext
      await signUp(email, password);
      const user ={
        username: username,
        name:name,
        email:email, 
      };
      fetch("http://localhost:5000/register",{
        method:"POST",
        headers:{
          'content-type':"application/json"
        },
        body:JSON.stringify(user)
      })
      .then(res=>res.json())
      .then(data=>{
        if(data.acknowledged){
          console.log(data)
          navigate('/')
        }
      })
    } catch (error) {
      setError(error.message);
      window.alert(error.message);
    }
    
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="image-container">
          <img
            className="image"
            src={twitterImage}
            alt="Twitter"
            height="400px"
            width="800px"
          />
        </div>
        <div className="form-container">
          <TwitterIcon className="TwitterIcon" style={{ color: "skyblue" }} />
          <h2 className="heading">Happening now</h2>
          <div className="d-flex align-items-sm-center">
            <h3 className="heading1">Join Twitter today</h3>
          </div>
          {error && <p className="errorMessage">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              className="display-name"
              type="text"
              placeholder="@username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="display-name"
              type="text"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="btn-login">
              <button type="submit" className="btn">
                Sign Up
              </button>
            </div>
          </form>
          <hr />
          <div className="google-button">
            <GoogleButton
              className="g-btn"
              type="light"
              onClick={handleGoogleSignIn}
            />
          </div>
          Already have an account?
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "var(--twitter-color)",
              fontWeight: "600",
              marginLeft: "5px",
            }}
          >
            Log in
          </Link>
        </div>
      </div>
    </>
  );
};
export default Signup;
