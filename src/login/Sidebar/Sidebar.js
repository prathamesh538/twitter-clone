import React, { useState } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreIcon from "@mui/icons-material/More";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Divider from "@mui/material/Divider";
import DoneIcon from "@mui/icons-material/esm/Done";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./sidebar.css";
import Customlink from "./Customlink";
import Sidebaroption from "./Sidebaroption";
import { useNavigate } from "react-router-dom";
import useLoggedinuser from "../../hooks/useLoggedinuser";
const Sidebar = ({ handlelogout, user }) => {
  const [anchorE1, setanchorE1] = useState(null);
  const openmenu = Boolean(anchorE1);
  const [loggedinuser]= useLoggedinuser(); // Use the `user` prop as the logged-in user data

  const navigate = useNavigate();

  const handleclick = (e) => {
    setanchorE1(e.currentTarget);
  };
  const handleclose = () => {
    setanchorE1(null);
  };
  const result = user?.email?.split("@")[0];

  return (
    <div className="sidebar">
      <TwitterIcon className="sidebar__twitterIcon" />
      <Customlink to="/home/feed">
        <Sidebaroption active Icon={HomeIcon} text="Home" />
      </Customlink>
      <Customlink to="/home/explore">
        <Sidebaroption Icon={SearchIcon} text="Explore" />
      </Customlink>
      <Customlink to="/home/notification">
        <Sidebaroption Icon={NotificationsNoneIcon} text="Notification" />
      </Customlink>
      <Customlink to="/home/messages">
        <Sidebaroption Icon={MailOutlineIcon} text="Messages" />
      </Customlink>
      <Customlink to="/home/bookmarks">
        <Sidebaroption Icon={BookmarkBorderIcon} text="Bookmarks" />
      </Customlink>
      <Customlink to="/home/lists">
        <Sidebaroption Icon={ListAltIcon} text="Lists" />
      </Customlink>
      <Customlink to="/home/profile">
        <Sidebaroption Icon={PermIdentityIcon} text="Profile" />
      </Customlink>
      <Customlink to="/home/more">
        <Sidebaroption Icon={MoreIcon} text="More" />
      </Customlink>
      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        Tweet
      </Button>
      <div className="Profile__info">
        <Avatar
          src={
            loggedinuser?.profileImage ||
            "https://www.freeiconspng.com/uploads/profile-icon-png-28.png" // Fallback image URL
          }
          alt="Profile"
        />

        <div className="user__info">
          <h4>{loggedinuser?.name || user?.displayName || "Anonymous User"}</h4>
          <h5>@{result || "unknown"}</h5>
        </div>

        <IconButton
          size="small"
          sx={{ ml: 2 }}
          aria-controls={openmenu ? "besic-menu" : undefined}
          aria-haspopup="true"
          aria-valuetext={openmenu ? "true" : undefined}
          onClick={handleclick}
        >
          <MoreHorizIcon />
        </IconButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorE1}
          open={openmenu}
          onClick={handleclose}
          onClose={handleclose}
        >
          <MenuItem
            className="Profile__info1"
            onClick={() => navigate("/home/profile")}
          >
            <Avatar
              src={
                loggedinuser?.profileImage ||
                "https://www.freeiconspng.com/uploads/profile-icon-png-28.png"
              }
              alt="Profile"
            />
            <div className="user__info subUser__info">
              <div>
                <h4>
                  {loggedinuser?.name || user?.displayName || "Anonymous"}
                </h4>
                <h5>@{result || "unknown"}</h5>
              </div>
              <ListItemIcon className="done__icon" color="blue">
                <DoneIcon />
              </ListItemIcon>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleclose}>Add an exixting account</MenuItem>
          <MenuItem onClick={handlelogout}>Log out @{result}</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar;
