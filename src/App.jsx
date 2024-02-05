import { Routes, Route } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import {ToastContainer} from 'react-toastify'
 import "react-toastify/dist/ReactToastify.css";
 // Imports from another files
// import './App.css'
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Header from "./Components/Header";
import SingIn from './Pages/SignIn'
function App() {
  const Theme = createTheme({
    palette: {
      mode: "dark",
      primary:{
        main:'#cf6616'
      }
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableRipple: true,
          color:"primary",
        },
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={Theme}>
          <CssBaseline />
          <ToastContainer />
          <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path= "/signIn" element={<SingIn />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
