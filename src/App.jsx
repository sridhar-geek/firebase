/** Main Component */
import { Routes, Route } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
export const appContext = createContext()
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
 // Imports from another files
// import './App.css'
import {auth} from './firebase'
import {
  Profile,
  Home,
  Login,
  SignUp,
  ProtectedRoutes,
  NotFound,
} from "./Pages";

function App() {
  // Saving user details
  const [userDetails, setUserDetails] = useState(null)
  // creating custom theme in material UI
  const Theme = createTheme({
    palette: {
      mode: "dark",
      primary:{
        main:'#cf6616'
      }
    },
    components: {
      MuiButton: {
        styleOverrides:{
          root:{
            textTransform:'capitalize',
          }
        },
        defaultProps: {
          disableRipple: true,
        },
      },
    },
  });
  // function to get user details  --> Calling onAuthStateChanged
  useEffect(()=> {
    onAuthStateChanged(auth, (user) => {
      console.log("OnAuthStateChanged Called witout User");
      if (user) {
        setUserDetails(user);
        console.log("OnAuthStateChanged Called");
      }
    });
  },[])

      console.log({userDetails})
  return (
    <>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <ToastContainer />
        <appContext.Provider value={{ userDetails, setUserDetails }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {/* <Route element={<ProtectedRoutes />}> */}
              <Route path="/profile" element={<Profile />} />
            {/* </Route> */}
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </appContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
