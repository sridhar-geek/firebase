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
import PersonIcon from '@mui/icons-material/Person';
import {
  getAuth,
  createUserWithEmailAndPassword,
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
  const [showConformPassword, setShowConformPassword] = useState(false);
  // stores data of user (email, password,name)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");

  const auth = getAuth(app);
  const navigate = useNavigate();
  //a function for registring of an user
  const handleRegister = async (e) => {
    e.preventDefault();
    if(password != conformPassword) return toast.error("passwords don't match", {
      position: "top-center",
      theme: "dark",
    });
    try {
      const user = await createUserWithEmailAndPassword(auth, name,email, password);
      toast.success("Registration Success", {
        position: "top-center",
        theme: "dark",
      });
      console.log(user, "from registration function");
      navigate('/login')
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
        <form onSubmit={handleRegister}>
          <InputBox>
            <PersonIcon />
            <InputFeild
              variant="filled"
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              fullWidth
              placeholder="Name"
            />
          </InputBox>
          <InputBox>
            <MailIcon />
            <InputFeild
              variant="filled"
              type="email"
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
          <InputBox>
            <KeyIcon />
            <InputFeild
              variant="filled"
              type={showConformPassword ? "text" : "password"}
              fullWidth
              value={conformPassword}
              onChange={(e) => setConformPassword(e.target.value)}
              placeholder="Conform Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {" "}
                    <IconButton
                      onClick={() =>
                        setShowConformPassword(!showConformPassword)
                      }
                    >
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
            Already have an account ?{" "}
            <Link
              style={{ textDecoration: "none", fontSize: "1.1rem" }}
              to={"/login"}
            >
              Login
            </Link>
          </Typography>

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ textTransform: "capitalize" }}
          >
            SigIn
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
