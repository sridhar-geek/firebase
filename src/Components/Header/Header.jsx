/*Header component It shows logo image and login/back button  */
import { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useLocation, useNavigate } from "react-router-dom";
//import from anthor files
import ProfileBtn from "./ProfileButton";
import { appContext } from "../../App";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // getting user details
  const { userDetails } = useContext(appContext);
  // handles navigation
  const handleHome = () => {
    navigate("/");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  console.log(userDetails, "from header");

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      margin="15px 5%"
    >
      <Typography variant="h3">Logo</Typography>
      {location.pathname === "/login" || location.pathname === "/signup" ? (
        <Button variant="outlined" onClick={handleHome}>
          <ArrowLeftIcon fontSize="large" /> Back Home
        </Button>
      ) : userDetails?.accessToken ? (
        <ProfileBtn />
      ) : (
        <Button variant="outlined" onClick={handleLogin}>
          Login
        </Button>
      )}
    </Box>
  );
};

export default Header;
