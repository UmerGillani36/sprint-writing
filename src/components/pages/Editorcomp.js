import { Grid } from "@mui/material";
import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./auth";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Sprint = () => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  const handleLogout = () => {
    navigate("/login");
  };
  const [editorState, setEditorState] = useState('');

  const handleEditorChange = (content, delta, source, editor) => {
    setEditorState(content);
  };

  return (
    <>
    {user ? 
      <div className="page">
        <Navbar />
        <Grid container justifyContent="center" sx={{margin: "0 20%"}}>
          <Grid item xs={12} md={8}>
            <h4>Sprint Page</h4>
            <ReactQuill 
              value={editorState} 
              onChange={handleEditorChange}
            />
          </Grid>
        </Grid>
        <Outlet />
      </div>
      :
      <Navigate to ="/" />
    }
    </>
  );
};

export default Sprint;
