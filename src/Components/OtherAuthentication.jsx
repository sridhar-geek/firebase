import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
// Imports from anthor files
import {auth} from '../firebase'
import { toast } from 'react-toastify';

const OtherAuthentication = () => {
  const navigate = useNavigate()
  const provider = new GoogleAuthProvider()
  const githubProvider = new GithubAuthProvider()

  // function to handle google login 
  const handleGoogleLogin = async(e)=> {
    e.preventDefault()
    try {
      const user =  await signInWithPopup(auth, provider)
      navigate('/')
      toast.success("Login Successful",{position:'top-center', theme:'dark'})
      console.log(user, 'from google Login')
    } catch (error) {
      console.log(error)
      toast.error(error?.message, {theme:'dark', position:'top-center'})
    }
  }

  // function to handle github login
  const handleGitHubLogin = async(e)=> {
    e.preventDefault()
    try {
      const user = await signInWithPopup(auth, githubProvider)
      navigate('/')
      toast.success("Login Successful", {
        position: "top-center",
        theme: "dark",
      });
      console.log(user, "from github Login");
    } catch (error) {
      console.log(error)
      toast.error(error?.message, {theme:'dark', position:'top-center'})
    }
  }
  return (
    <div>
      {" "}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#2f4e87",
          ":hover": {
            backgroundColor: "#242f45",
          },
        }}
        fullWidth
        onClick={handleGoogleLogin}
      >
        <GoogleIcon sx={{ marginRight: "5px" }} />
        Login with Google
      </Button>
      <Button
        variant="contained"
        onClick={handleGitHubLogin}
        sx={{
          backgroundColor: "#883ad6",
          margin: " 20px 0px",
          ":hover": {
            backgroundColor: "#482769",
          },
        }}
        fullWidth
      >
        <GitHubIcon sx={{ marginRight: "5px" }} /> Login with Github
      </Button>
    </div>
  );
}

export default OtherAuthentication