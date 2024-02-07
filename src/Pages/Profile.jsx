import { Paper, Typography } from "@mui/material";
// Imports from another files
import Header from "../Components/Header/Header";

const Profile = () => {
  return (
    <div>
      <Header />
      <Paper
        sx={{
          height: "70vh",
          width: "80%",
          maxWidth: "900px",
          margin: "10px auto",
          borderRadius:'3%'
        }}
      >
        <Typography>This is random text</Typography>
      </Paper>
    </div>
  );
};

export default Profile;
