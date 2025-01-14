import React, { useState } from "react";
import "./Tweetbox.css";
import { Avatar, Button } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import MicIcon from "@mui/icons-material/Mic"; // Audio recording icon
import axios from "axios";
import useLoggedinuser from "../../../hooks/useLoggedinuser";
import { useUserAuth } from "../../../context/UserAuthContext";

const Tweetbox = () => {
  const [post, setpost] = useState("");
  const [imageurl, setimageurl] = useState("");
  const [audiourl, setaudiourl] = useState(""); // To store the uploaded audio URL
  const [isloading, setisloading] = useState(false);
  const [isRecording, setIsRecording] = useState(false); // To handle recording state
  const [audioBlob, setAudioBlob] = useState(null); // To store the audio blob
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0); // Duration of the recording
  const { user } = useUserAuth();
  const [loggedinuser] = useLoggedinuser();
  const email = user?.email;
  const userprofilepic = loggedinuser?.profileImage || user?.photoURL;

  const MAX_AUDIO_SIZE_MB = 100; // Max file size in MB
  const MAX_AUDIO_DURATION_SEC = 300; // Max duration in seconds (5 minutes)

  const handleuploadimage = (e) => {
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
        setimageurl(res.data.data.display_url);
        setisloading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const startRecording = () => {
    // Check the time restriction before starting the recording
    const currentTime = new Date();
    const hours = currentTime.getHours();
    if (hours < 14 || hours >= 19) {
      alert("Audio uploads are only allowed between 2 PM and 7 PM IST.");
      return;
    }

    setIsRecording(true);
    setRecordingDuration(0); // Reset duration tracker

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        let chunks = [];
        let startTime = Date.now();

        recorder.ondataavailable = (event) => {
          chunks.push(event.data);
        };

        recorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: "audio/wav" });
          const audioSizeMB = audioBlob.size / (1024 * 1024); // Size in MB
          const durationInSec = (Date.now() - startTime) / 1000; // Duration in seconds

          if (durationInSec > MAX_AUDIO_DURATION_SEC) {
            alert("Audio exceeds the maximum duration of 5 minutes.");
            return;
          }

          if (audioSizeMB > MAX_AUDIO_SIZE_MB) {
            alert("Audio file size exceeds the maximum limit of 100 MB.");
            return;
          }

          setAudioBlob(audioBlob);
          const audioUrl = URL.createObjectURL(audioBlob);
          setaudiourl(audioUrl);
        };

        recorder.start();
        const interval = setInterval(() => {
          const elapsedTime = (Date.now() - startTime) / 1000;
          setRecordingDuration(elapsedTime);

          // Auto-stop if duration exceeds max limit
          if (elapsedTime > MAX_AUDIO_DURATION_SEC) {
            clearInterval(interval);
            stopRecording();
          }
        }, 1000);
      })
      .catch((err) => {
        console.error("Error accessing microphone: ", err);
      });
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  const handleAudioFileUpload = (e) => {
    const file = e.target.files[0];
    const fileSizeMB = file.size / (1024 * 1024); // File size in MB
    const audioUrl = URL.createObjectURL(file);

    if (fileSizeMB > MAX_AUDIO_SIZE_MB) {
      alert("Audio file size exceeds the maximum limit of 100 MB.");
      return;
    }

    setaudiourl(audioUrl);
  };

  const handletweet = (e) => {
    e.preventDefault();

    // Restrict audio upload based on time
    const currentTime = new Date();
    const hours = currentTime.getHours();
    if (audiourl && (hours < 14 || hours >= 19)) {
      alert("Audio uploads are only allowed between 2 PM and 7 PM IST.");
      return;
    }

    if (!audiourl || recordingDuration <= MAX_AUDIO_DURATION_SEC) {
      const userpost = {
        profilephoto: userprofilepic,
        post: post,
        photo: imageurl,
        audio: audiourl,
        email: email,
      };

      fetch("http://localhost:5000/post", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userpost),
      })
        .then((res) => res.json())
        .then(() => {
          // Clear inputs
          setpost("");
          setimageurl("");
          setaudiourl("");
          setRecordingDuration(0);
        });
    } else {
      alert("Audio file does not meet the requirements.");
    }
  };

  return (
    <div className="tweetBox">
      <form onSubmit={handletweet}>
        <div className="tweetBox__input">
          <Avatar src={loggedinuser?.profileImage || user?.photoURL} />
          <input
            type="text"
            placeholder="What's happening?"
            onChange={(e) => setpost(e.target.value)}
            value={post}
            required
          />
        </div>
        <div className="imageIcon_tweetButton">
          <label htmlFor="image" className="imageIcon">
            {isloading ? (
              <p>Uploading Image</p>
            ) : (
              <p>
                {imageurl ? (
                  "Image Uploaded"
                ) : (
                  <AddPhotoAlternateOutlinedIcon />
                )}
              </p>
            )}
          </label>
          <input
            type="file"
            id="image"
            className="imageInput"
            onChange={handleuploadimage}
          />
          {/* Audio Recording */}
          <div>
            {isRecording ? (
              <Button onClick={stopRecording}>Stop Recording</Button>
            ) : (
              <Button onClick={startRecording}>
                <MicIcon /> Start Recording
              </Button>
            )}
            {recordingDuration > 0 && (
              <p>Recording Duration: {Math.round(recordingDuration)} seconds</p>
            )}
          </div>
          <input
            type="file"
            id="audio"
            className="audioInput"
            accept="audio/*"
            onChange={handleAudioFileUpload}
          />
          <Button
            className="tweetBox__tweetButton"
            type="submit"
            disabled={!post && !audiourl}
          >
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Tweetbox;
