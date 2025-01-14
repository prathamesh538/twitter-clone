import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import Button from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./Editprofile.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 8,
};

function Editchild({ dob, setdob }) {
  const [open, setopen] = useState(false);
  const handleopen = () => {
    setopen(true);
  };
  const handleclose = () => {
    setopen(false);
  };
  return (
    <React.Fragment>
      <div className="birthdate-section" onClick={handleopen}>
        <text>Edit</text>
      </div>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleclose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-descriptiom"
      >
        <Box sx={{ ...style, width: 400, height: 400 }}>
          <div className="text">
            <h2> Edit date of birth</h2>
            <p>
                This can only be changed a few times
              <br />
                Make sure you enter the age of the <br />
                person using the account.{" "}
            </p>
            <input type="date" onChange={(e) => setdob(e.target.value)} />
            <button
              className="e-button"
              onClick={() => {
                setopen(false);
              }}
            >
              Cancel
            </button>
            
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const Editprofile = ({ user, loggedinuser }) => {
  const [name, setname] = useState("");
  const [bio, setbio] = useState("");
  const [location, setlocation] = useState("");
  const [website, setwebsite] = useState("");
  const [open, setopen] = useState(false);
  const [dob, setdob] = useState("");

  const handlesave = () => {
    const editinfo = {
      name,
      bio,
      location,
      website,
      dob,
    };
    fetch(`http://localhost:5000/userupdate/${user?.email}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editinfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("done", data);
      });
  };

  // Safely access properties with optional chaining
  const userName = loggedinuser?.[0]?.name || "";
  const userBio = loggedinuser?.[0]?.bio || "";
  const userLocation = loggedinuser?.[0]?.location || "";
  const userWebsite = loggedinuser?.[0]?.website || "";
  const userDob = loggedinuser?.[0]?.dob || "";

  return (
    <div>
      <button
        onClick={() => {
          setopen(true);
        }}
        className="Edit-profile-btn"
      >
        Edit profile
      </button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-descriptiom"
      >
        <Box style={style} className="modal">
          <div className="header">
            <IconButton onClick={() => setopen(false)}>
              <CloseIcon />
            </IconButton>
            <h2 className="header-title">Edit Profile</h2>
            <button className="save-btn" onClick={handlesave}>
              Save
            </button>
          </div>
          <form className="fill-content">
            <TextField
              className="text-field"
              fullWidth
              label="Name"
              id="fullWidth"
              variant="filled"
              onChange={(e) => setname(e.target.value)}
              defaultValue={userName}
            />
            <TextField
              className="text-field"
              fullWidth
              label="Bio"
              id="fullWidth"
              variant="filled"
              onChange={(e) => setbio(e.target.value)}
              defaultValue={userBio}
            />
            <TextField
              className="text-field"
              fullWidth
              label="Location"
              id="fullWidth"
              variant="filled"
              onChange={(e) => setlocation(e.target.value)}
              defaultValue={userLocation}
            />
            <TextField
              className="text-field"
              fullWidth
              label="Website"
              id="fullWidth"
              variant="filled"
              onChange={(e) => setwebsite(e.target.value)}
              defaultValue={userWebsite}
            />
          </form>
          <div className="birthdate-section">
            <p>Birth Date</p>
            <p>.</p>
            <Editchild dob={dob} setdob={setdob} />
          </div>
          <div className="last-section">
            {userDob ? (
              <h2>{userDob}</h2>
            ) : (
              <h2>{dob ? dob : "Add your date of birth"}</h2>
            )}
            <div className="last-btn">
              <h2>Switch to Professional</h2>
              <ChevronRightIcon />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Editprofile;
