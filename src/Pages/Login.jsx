import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  styled,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import MailIcon from "@mui/icons-material/Mail";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";
//imports from another files
import Logo from "../assests/firebaseLogo.png";
import { app } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
//component styles
const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InputFeild = styled(TextField)`
  display: block;
`;
const InputBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2%;
  padding: 10px;
`;
const Login = () => {
  // handles hide and unhide
  const [showPassword, setShowPassword] = useState(false);
  // stores data of user (email, password)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth(app);
  const navigate = useNavigate();

  //a function for login an user
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const user = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Success", {
        position: "top-center",
        theme: "dark",
      });
      console.log(user, "from login function");
      navigate("/");
    } catch (error) {
      toast.error(error?.message, {
        position: "top-center",
        theme: "dark",
      });
    }
  };
  return (
    <Container height="100vh" width="100%">
      <Box
        border="2px solid white"
        width="30%"
        padding="10px"
        borderRadius="15px"
      >
        <Container display="flex" justifyContent="center" alignItems="center">
          <img
            src={Logo}
            alt="logo"
            width="40%"
            height="40%"
            style={{ maxWidth: "400px", margin: "20px" }}
          />
        </Container>
        <form onSubmit={handleLogin}>
          <InputBox>
            <MailIcon />
            <InputFeild
              variant="filled"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              placeholder="Email"
            />
          </InputBox>
          <InputBox>
            <KeyIcon />
            <InputFeild
              variant="filled"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {" "}
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}{" "}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </InputBox>
          <Typography margin="10px">
            New to App ?{" "}
            <Link
              style={{ textDecoration: "none", fontSize: "1.1rem" }}
             to={'/signIn'}
            >
              SingUp
            </Link>
          </Typography>

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ textTransform: "capitalize" }}
          >
           Login
          </Button>
        </form>
        <Divider sx={{ margin: "10px" }} />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2f4e87",
            textTransform: "capitalize",
            ":hover": {
              backgroundColor: "#242f45",
            },
          }}
          fullWidth
        >
          <GoogleIcon sx={{ marginRight: "5px" }} />
          Login with Google
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#883ad6",
            margin: " 20px 0px",
            textTransform: "capitalize",
            ":hover": {
              backgroundColor: "#482769",
            },
          }}
          fullWidth
        >
          <GitHubIcon sx={{ marginRight: "5px" }} /> Login with Github
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
