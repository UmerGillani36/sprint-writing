import {
  Button,
  CssBaseline,
  Grid,
  Typography,
  Label,
  Drawer,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Row } from "react-grid-system";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useContext } from "react";
import { AuthContext } from "./auth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { auth, dbFireStore } from "../pages/auth/Firebase";
// import ProgressBar from 'react-bootstrap/ProgressBar';
// function createData(name, words, time, date) {
//   return { name, words, time, date };
// }

const firebaseConfig = {
  apiKey: "AIzaSyDDQSIPDECt9fwPSWYwvXO_6V4CI-tsLNg",
  authDomain: "writo-525e8.firebaseapp.com",
  databaseURL: "https://writo-525e8-default-rtdb.firebaseio.com",
  projectId: "writo-525e8",
  storageBucket: "writo-525e8.appspot.com",
  messagingSenderId: "38396057848",
  appId: "1:38396057848:web:c3f76e6fa268d3cf0d830d",
};

const Progress = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };
  const { user } = useContext(AuthContext);
  const tableHeaderStyle = {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  };

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    async function getNovels() {
      const db = firebase.firestore();
      const novels = [];
      const querySnapshot = await getDocs(collection(db, "novels"));
      querySnapshot.forEach((doc) => {
        novels.push({ id: doc.id, ...doc.data() });
      });
      setRows(novels);
    }
    getNovels();
  }, []);

  // useEffect(() => {

  // }, []);
  return (
    <>
      {user ? (
        <div className="page">
          <Navbar />
          <div className="container-fluid nav_bg">
            <div className="row">
              <div className="col-10 mx-auto">
                <Grid>
                  <div id="progress-bars" style={{ margin: "10px 0px" }}>
                    {/* <h6>
                      On this page user can monitor their daily WPM or weekly
                      WPM and as well as additional tasks if added any.
                    </h6> */}
                    <h3>On this page user can monitor their daily WPM</h3>
                    <div
                      style={{
                        width: "100%",
                        height: "70vh",
                      }}
                    >
                      <TableContainer
                        component={Paper}
                        sx={{ maxHeight: "70vh", overflowY: "auto" }}
                      >
                        <Table
                          sx={{ minWidth: 650, background: "#e3c19a" }}
                          aria-label="simple table"
                        >
                          <TableHead
                            sx={{
                              background: "#a67843",
                            }}
                          >
                            <TableRow>
                              <TableCell sx={tableHeaderStyle}>Title</TableCell>
                              <TableCell align="right" sx={tableHeaderStyle}>
                                {"Words(length)"}
                              </TableCell>
                              <TableCell align="right" sx={tableHeaderStyle}>
                                Time
                              </TableCell>
                              <TableCell align="right" sx={tableHeaderStyle}>
                                Date
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow
                                key={row.name}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {row.novelName}
                                </TableCell>
                                <TableCell align="right">{row.words}</TableCell>
                                <TableCell align="right">{row.time}</TableCell>
                                <TableCell align="right">
                                  {console.log(row.date)}
                                  {new Date(
                                    row?.date?.seconds * 1000
                                  ).toLocaleString()}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                    {/* <Row>
                    <div className="prog">
                      <CircularProgressbar
                        value={75}
                        text="Task 1"
                        stroke="#FF6347"
                      />
                    </div>
                    <div className="prog">
                      <CircularProgressbar value={50} text="Task 2" />
                    </div>
                  </Row> */}
                    {/* <Row>
                    <div className="prog">
                      <CircularProgressbar value={25} text="Task 3" />
                    </div>
                    <div className="prog">
                      <CircularProgressbar value={100} text="Task 4" />
                    </div>
                  </Row> */}
                  </div>
                </Grid>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Progress;
