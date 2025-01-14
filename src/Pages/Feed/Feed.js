import React, { useState, useEffect } from "react";
import "./Feed.css";
import Posts from "./Posts/Posts";
import Tweetbox from "./Tweetbox/Tweetbox";

const Feed = () => {
  const [post, setpost] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/post")
      .then((res) => res.json())
      .then((data) => {
        setpost(data);
      });
  }, [post]);

  const handleNewPost = (newPost) => {
    setpost((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>
      <Tweetbox />
      {post.map((p) => (
        <div key={p._id}>
          <Posts p={p} />
          {p.audio && (
            <div className="audioPost">
              <audio controls>
                <source src={p.audio} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Feed;
