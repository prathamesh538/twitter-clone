import React, { useState,useEffect } from "react";
import Posts from "../Posts/Posts";
import "./Mainprofile.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import LockResetIcon from "@mui/icons-material/LockReset";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import AddLinkIcon from "@mui/icons-material/AddLink";
import Editprofile from "../Editprofile/Editprofile";
import axios from "axios";
import useLoggedinuser from "../../../hooks/useLoggedinuser";

const Mainprofile = ({ user }) => {
  const navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const loggedinuser = user || {}; // Use provided user data or default to empty object
  const username = user?.email?.split("@")[0];
   const [post, setpost] = useState([]);
    useEffect(() => {
      fetch('http://localhost:5000/userpost?email=${user?.email}')
        .then((res) => res.json())
        .then((data) => {
          setpost(data);
        });
    }, [post]);

    const handleuploadcoverimage = (e) => {
      setisloading(true);
      const image = e.target.files[0];
      const formData = new FormData();
      formData.set("image", image);
  
      axios
        .post(
          "https://api.imgbb.com/1/upload?key=93fd805b90df865efcd94d59cfea19e1",
          formData
        )
        .then((res) => {
          const url=res.data.data.display_url;
          const usercoverimage={
            email:user?.email,
            coverimage:url
          }
          setisloading(false);
          if (url) {
            fetch('http://localhost:5000/userupdate/${user?.email}',
              {
                method:"PATCH",
                headers:{
                  "content-type":"application/json"
                },
                body:JSON.stringify(usercoverimage)
              }
            )
            .then((res)=>res.json())
            .then((data) =>{
              console.log("done",data)
            })
          }
        })
        .catch((e) => {
          // console.error("Image upload error:", e);
          // setisloading(false);
          console.log(e);
          window.alert(e)
          setisloading(false)
        });
    };
    const handleuploadprofileimage =(e) =>{
      setisloading(true);
      const image = e.target.files[0];
      const formData = new FormData();
      formData.set("image", image);
  
      axios
        .post(
          "https://api.imgbb.com/1/upload?key=93fd805b90df865efcd94d59cfea19e1",
          formData
        )
        .then((res) => {
          const url=res.data.data.display_url;
          const userprofileimage={
            email:user?.email,
            profileImage:url
          }
          setisloading(false);
          if (url) {
            fetch('http://localhost:5000/userupdate/${user?.email}',
              {
                method:"PATCH",
                headers:{
                  "content-type":"application/json"
                },
                body:JSON.stringify(userprofileimage),
              }
            )
            .then((res)=>res.json())
            .then((data) =>{
              console.log("done",data)
            })
          }
        })
        .catch((e) => {
          // console.error("Image upload error:", e);
          // setisloading(false);
          console.log(e);
          window.alert(e)
          setisloading(false)
        });
    }
  
  // const data = [
  //   {
  //     _id: "1",
  //     name: "Jane Doe",
  //     username: "@jane_doe",
  //     profilePhoto: "https://randomuser.me/api/portraits/women/1.jpg",
  //     post: "Exploring the new features in JavaScript! #coding #JavaScript",
  //     photo: "https://via.placeholder.com/600x300",
  //   },
  //   {
  //     _id: "2",
  //     name: "John Smith",
  //     username: "@johnsmith",
  //     profilePhoto: "https://randomuser.me/api/portraits/men/2.jpg",
  //     post: "Loving the views during my morning hike! #nature #hiking",
  //     photo: "https://via.placeholder.com/600x300",
  //   },
  //   {
  //     _id: "3",
  //     name: "Emily Clarke",
  //     username: "@emilyclarke",
  //     profilePhoto: "https://randomuser.me/api/portraits/women/3.jpg",
  //     post: "Trying out a new recipe today. Wish me luck! 🍳 #cooking #foodie",
  //     photo: "https://via.placeholder.com/600x300",
  //   },
  // ];

  return (
    <div>
      <ArrowBackIcon className="arrow-icon" onClick={() => navigate("/")} />
      <h4 className="heading-4">{username}</h4>
      <div className="mainprofile">
        <div className="profile-bio">
          <div>
            <div className="coverImageContainer">
              <img
                src={loggedinuser?.coverimage || user?.photoURL}
                alt="Cover"
                className="coverImage"
              />
              <div className="hoverCoverImage">
                <div className="imageIcon_tweetButton">
                  <label htmlFor="image" className="imageIcon">
                    {isloading ? (
                      <LockResetIcon className="photoIcon photoIconDisabled" />
                    ) : (
                      <CenterFocusWeakIcon className="photoIcon" />
                    )}
                  </label>
                  <input type="file" id="image" className="imageInput"  onChange={handleuploadcoverimage}/>
                </div>
              </div>
            </div>
            <div className="avatar-img">
              <div className="avatarContainer">
                <img
                  src={loggedinuser?.profilePhoto ||user?.photoURL}
                  alt="Profile"
                  className="avatar"
                />
                <div className="hoverAvatarImage">
                  <div className="imageIcon_tweetButton">
                    <label htmlFor="profileImage" className="imageIcon">
                      {isloading ? (
                        <LockResetIcon className="photoIcon photoIconDisabled" />
                      ) : (
                        <CenterFocusWeakIcon className="photoIcon" />
                      )}
                    </label>
                    <input type="file" id="profileImage" className="imageInput" onChange={handleuploadprofileimage}/>
                  </div>
                </div>
              </div>
              <div className="userInfo">
                <div>
                  <h3 className="heading-3">
                    {loggedinuser?.name || user?.displayName || "Anonymous User"}
                  </h3>
                  <p className="usernameSection">@{username}</p>
                </div>
                <Editprofile user={user} loggedinuser={loggedinuser} />
              </div>
              <div className="infoContainer">
                {loggedinuser?.bio ? <p>{loggedinuser.bio}</p> : ""}
                <div className="locationAndLink">
                  {loggedinuser?.location && (
                    <p className="suvInfo">
                      <MyLocationIcon />
                      {loggedinuser.location}
                    </p>
                  )}
                  {loggedinuser?.website && (
                    <p className="suvInfo">
                      <AddLinkIcon />
                      <a href={loggedinuser.website} target="_blank" rel="noopener noreferrer">
                        {loggedinuser.website}
                      </a>
                    </p>
                  )}
                </div>
              </div>
              <h4 className="tweetsText">Tweets</h4>
              <hr />
            </div>
            {post.map((p) => (
              <Posts key={p._id} p={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainprofile;
