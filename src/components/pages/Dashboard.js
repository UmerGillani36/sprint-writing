import {
  Button,
  CssBaseline,
  Grid,
  Card,
  CardContent,
  Typography,
  Label,
  Drawer,
  makeStyles,
  AppBar,
} from "@mui/material";
import React, { useContext } from "react";
import "./Style.css";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import { color } from "@mui/system";
import { AuthContext } from "./auth";
// import ProgressBar from 'react-bootstrap/ProgressBar';

const Dashboard = () => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <>
    {user ? 
      <div className="page">
        {/* <CssBaseline /> */}
        <Navbar />
        <div className="container-fluid nav_bg">
          <div className="row pt-8">
            <div className="col-10 mx-auto">
              <div style={{ marginTop: 20, marginBottom: 20 }}>
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                  Recent Works
                </Typography>
              </div>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Card
                    square={true}
                    style={{ backgroundColor: "#E0C9A6", borderRadius: "20px" }}
                  >
                    <CardContent>
                      <Typography variant="h4" style={{ fontWeight: "bold" }}>
                        Novel Name
                      </Typography>
                      <Typography variant="h7" style={{ fontWeight: "bold" }}>
                        Chapter Name
                      </Typography>
                      <Typography variant="body2">
                        Some of the chapter content will show here
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card
                    square={true}
                    style={{ backgroundColor: "#E0C9A6", borderRadius: "20px" }}
                  >
                    <CardContent>
                      <Typography variant="h4" style={{ fontWeight: "bold" }}>
                        Novel Name
                      </Typography>
                      <Typography variant="h7" style={{ fontWeight: "bold" }}>
                        Chapter Name
                      </Typography>
                      <Typography variant="body2">
                        Some of the chapter content will show here
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card
                    square={true}
                    style={{ backgroundColor: "#E0C9A6", borderRadius: "20px" }}
                  >
                    <CardContent>
                      <Typography variant="h4" style={{ fontWeight: "bold" }}>
                        Novel Name
                      </Typography>
                      <Typography variant="h7" style={{ fontWeight: "bold" }}>
                        Chapter Name
                      </Typography>
                      <Typography variant="body2">
                        Some of the chapter content will show here
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card
                    square={true}
                    style={{ backgroundColor: "#E0C9A6", borderRadius: "20px" }}
                  >
                    <CardContent>
                      <Typography variant="h4" style={{ fontWeight: "bold" }}>
                        Novel Name
                      </Typography>
                      <Typography variant="h7" style={{ fontWeight: "bold" }}>
                        Chapter Name
                      </Typography>
                      <Typography variant="body2">
                        Some of the chapter content will show here
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card
                    square={true}
                    style={{ backgroundColor: "#E0C9A6", borderRadius: "20px" }}
                  >
                    <CardContent>
                      <Typography variant="h4" style={{ fontWeight: "bold" }}>
                        Novel Name
                      </Typography>
                      <Typography variant="h7" style={{ fontWeight: "bold" }}>
                        Chapter Name
                      </Typography>
                      <Typography variant="body2">
                        Some of the chapter content will show here
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card
                    square={true}
                    style={{ backgroundColor: "#E0C9A6", borderRadius: "20px" }}
                  >
                    <CardContent>
                      <Typography variant="h4" style={{ fontWeight: "bold" }}>
                        Novel Name
                      </Typography>
                      <Typography variant="h7" style={{ fontWeight: "bold" }}>
                        Chapter Name
                      </Typography>
                      <Typography variant="body2">
                        Some of the chapter content will show here
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card
                    square={true}
                    style={{ backgroundColor: "#E0C9A6", borderRadius: "20px" }}
                  >
                    <CardContent>
                      <Typography variant="h4" style={{ fontWeight: "bold" }}>
                        Novel Name
                      </Typography>
                      <Typography variant="h7" style={{ fontWeight: "bold" }}>
                        Chapter Name
                      </Typography>
                      <Typography variant="body2">
                        Some of the chapter content will show here
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card
                    square={true}
                    style={{ backgroundColor: "#E0C9A6", borderRadius: "20px" }}
                  >
                    <CardContent>
                      <Typography variant="h4" style={{ fontWeight: "bold" }}>
                        Novel Name
                      </Typography>
                      <Typography variant="h7" style={{ fontWeight: "bold" }}>
                        Chapter Name
                      </Typography>
                      <Typography variant="body2">
                        Some of the chapter content will show here
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card
                    square={true}
                    style={{ backgroundColor: "#E0C9A6", borderRadius: "20px" }}
                  >
                    <CardContent>
                      <Typography variant="h4" style={{ fontWeight: "bold" }}>
                        Novel Name
                      </Typography>
                      <Typography variant="h7" style={{ fontWeight: "bold" }}>
                        Chapter Name
                      </Typography>
                      <Typography variant="body2">
                        Some of the chapter content will show here
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    :
    <Navigate to="/"/>
    }
    </>
  );
};

export default Dashboard;
