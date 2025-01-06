import React, { useState, useEffect } from "react";
import "./Feed.css";
import Posts from "./Posts/Posts";
import Tweetbox from "./Tweetbox/Tweetbox";

const Feed = ({ isOpen }) => {
  const [post, setpost] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/post")
      .then((res) => res.json())
      .then((data) => {
        setpost(data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [post]);

  const handleNewPost = (newPost) => {
    setpost((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className={`feed ${isOpen ? "open" : "closed"}`}>
      <div className="feed_header">
        <h2>Home</h2>
      </div>
      <Tweetbox onNewPost={handleNewPost} /> 
      {post.map((p) => (
        <Posts key={p._id} p={p} />
      ))}
    </div>
  );
};

export default Feed;
