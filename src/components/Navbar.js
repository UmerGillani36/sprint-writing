import { async } from "@firebase/util";
import { AppBar, Paper, Box, Toolbar, Typography, Button } from "@mui/material";
import { brown } from "@mui/material/colors";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { auth, dbFireStore } from "./pages/auth/Firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import LoginForm from "./pages/auth/Login/LoginForm";
import { AuthContext } from "./pages/auth";
const secondary = brown[400];
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const handleLogout = async () => {
    await updateDoc(doc(dbFireStore, "users", user.uid), {
      isOnline: false,
    });
    await signOut(auth);
  };

  return (
    <>
      <div className="container-fluid nav_bg">
        <div className="row">
          <div className="col-10 mx-auto">
            <Box sx={{ flexGrow: 1 }}>
              <AppBar
                position="static"
                style={{ backgroundColor: "#a67843", borderRadius: "16px" }}
                rounded={true}
              >
                <Toolbar>
                  <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    WriteO
                  </Typography>
                  <Button
                    component={NavLink}
                    to="/dashboard"
                    style={({ isActive }) => {
                      return { backgroundColor: isActive ? "#896130" : "" };
                    }}
                    sx={{ color: "white", textTransform: "none" }}
                  >
                    Home
                  </Button>
                  <Button
                    component={NavLink}
                    to="/novel"
                    style={({ isActive }) => {
                      return { backgroundColor: isActive ? "#896130" : "" };
                    }}
                    sx={{ color: "white", textTransform: "none" }}
                  >
                    Novels
                  </Button>
                  <Button
                    component={NavLink}
                    to="/sprint"
                    style={({ isActive }) => {
                      return { backgroundColor: isActive ? "#896130" : "" };
                    }}
                    sx={{ color: "white", textTransform: "none" }}
                  >
                    Sprint
                  </Button>
                  <Button
                    component={NavLink}
                    to="/chat"
                    style={({ isActive }) => {
                      return { backgroundColor: isActive ? "#896130" : "" };
                    }}
                    sx={{ color: "white", textTransform: "none" }}
                  >
                    Chat
                  </Button>
                  <Button
                    component={NavLink}
                    to="/progress"
                    style={({ isActive }) => {
                      return { backgroundColor: isActive ? "#896130" : "" };
                    }}
                    sx={{ color: "white", textTransform: "none" }}
                  >
                    Progress
                  </Button>
                  <Button
                    component={NavLink}
                    to="/share"
                    style={({ isActive }) => {
                      return { backgroundColor: isActive ? "#896130" : "" };
                    }}
                    sx={{ color: "white", textTransform: "none" }}
                  >
                    Share
                  </Button>
                  {user ? (
                    <>
                      <Button
                        component={NavLink}
                        to="/"
                        sx={{ color: "white", textTransform: "none" }}
                        Logout
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        component={NavLink}
                        to="/login"
                        style={({ isActive }) => {
                          return { backgroundColor: isActive ? "#896130" : "" };
                        }}
                        sx={{ color: "white", textTransform: "none" }}
                        Logout
                      >
                        Login/Register
                      </Button>
                    </>
                  )}
                </Toolbar>
              </AppBar>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
