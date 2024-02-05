import { Box, Button, Typography } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useLocation, useNavigate } from "react-router-dom";
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const handleHome = ()=> {
    navigate('/')
  }
  const handleLogin = ()=> {
    navigate('/login')
  }
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      margin="0 5%"
    >
      <Typography variant="h3">Logo</Typography>
      {location.pathname === "/login" ? (
        <Button variant="outlined" onClick={handleHome}>
          <ArrowLeftIcon fontSize="large" /> Back Home
        </Button>
      ) : (
        <Button variant="outlined" onClick={handleLogin}>
          Login
        </Button>
      )}
    </Box>
  );
};

export default Header;
