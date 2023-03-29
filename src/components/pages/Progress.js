import {
  Button,
  CssBaseline,
  Grid,
  Typography,
  Label,
  Drawer,
} from "@mui/material";
import React from "react";
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
// import ProgressBar from 'react-bootstrap/ProgressBar';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24),
  createData("Ice cream sandwich", 237, 9.0, 37),
  createData("Eclair", 262, 16.0, 24),
  createData("Cupcake", 305, 3.7, 67),
  createData("Gingerbread", 356, 16.0, 49),
  createData("Gingerbread", 356, 16.0, 49),
  createData("Gingerbread", 356, 16.0, 49),
  createData("Gingerbread", 356, 16.0, 49),
  createData("Gingerbread", 356, 16.0, 49),
  createData("Gingerbread", 356, 16.0, 49),
];
const Progress = () => {
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

                        // background: "white",
                        // borderRadius: "10px",
                        // padding: "20px",
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
                                  {row.name}
                                </TableCell>
                                <TableCell align="right">
                                  {row.calories}
                                </TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
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
