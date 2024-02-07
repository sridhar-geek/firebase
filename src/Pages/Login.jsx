/**Login Page to login user by verfying user credentails */
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

import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//imports from another files
import Logo from "../assests/firebaseLogo.png";
import { auth } from "../firebase";
import OtherAuthentication from "../Components/OtherAuthentication";
import Header from '../Components/Header/Header'
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

  const navigate = useNavigate();

  //function for login an user
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
    <>
      <Header />
      <Container height="100vh" width="100%">
        <Box
          border="2px solid white"
          width="30%"
          padding="10px"
          borderRadius="15px"
          minWidth="400px"
        >
          <Container>
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
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
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
              New to App ?{" "}
              <Link
                style={{ textDecoration: "none", fontSize: "1.1rem" }}
                to={"/signup"}
              >
                SignUp
              </Link>
            </Typography>

            <Button variant="contained" type="submit" fullWidth>
              Login
            </Button>
          </form>
          <Divider sx={{ margin: "10px" }} />
          <OtherAuthentication />
        </Box>
      </Container>
    </>
  );
};

export default Login;
