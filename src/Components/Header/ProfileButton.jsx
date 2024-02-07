import { useContext, useState } from "react";
import { Menu, MenuItem, Avatar } from "@mui/material";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
//Import from another files
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { appContext } from "../../App";

const ProfileBtn = () => {
  const navigate = useNavigate()
  // handles menu items
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // getting user details
  const { userDetails, setUserDetails } = useContext(appContext);
  //signout function
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Logout Successful", {
        position: "top-center",
        theme: "dark",
      });
      setUserDetails(null);
      setAnchorEl(null);
    } catch (error) {
      toast.error(error, {
        position: "top-center",
        theme: "dark",
      });
    }
  };
console.log(userDetails.photoURL)
  return (
    <div>
      <Avatar
        onClick={handleClick}
        sx={{ cursor: "pointer", height: 46, width: 46 }}
        alt="Profile Picture"
        src={
          userDetails.photoURL ||
          "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
        }
      />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={()=> navigate('/profile')}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileBtn;
