import { Grid, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./auth";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { auth, dbFireStore } from "../pages/auth/Firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDDQSIPDECt9fwPSWYwvXO_6V4CI-tsLNg",
  authDomain: "writo-525e8.firebaseapp.com",
  databaseURL: "https://writo-525e8-default-rtdb.firebaseio.com",
  projectId: "writo-525e8",
  storageBucket: "writo-525e8.appspot.com",
  messagingSenderId: "38396057848",
  appId: "1:38396057848:web:c3f76e6fa268d3cf0d830d",
};
const Sprint = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const handleLogout = () => {
    navigate("/login");
  };
  const [editorState, setEditorState] = useState("");
  const [docRef, setDocRef] = useState(null);
  const [chapterTitle, setChapterTitle] = useState("");
  console.log("text", editorState);
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    if (user) {
      const db = firebase.firestore();
      const docRef = db.collection("arhamdoc").doc(user.uid);
      setDocRef(docRef);
      docRef.get().then((doc) => {
        if (doc.exists) {
          setEditorState(doc.data().content);
          setChapterTitle(doc.data().chapterTitle);
        }
      });
    }
  }, [user]);

  const handleEditorChange = (content, delta, source, editor) => {
    setEditorState(content);
    if (docRef) {
      docRef.set({ content, chapterTitle });
    }
  };

  const handleTitleChange = (event) => {
    setChapterTitle(event.target.value);
    if (docRef) {
      docRef.set({ content: editorState, chapterTitle: event.target.value });
    }
  };

  return (
    <>
      {user ? (
        <div className="page">
          <Navbar />
          <Grid
            container
            justifyContent="center"
            sx={{
              backgroundColor: "",
              padding: "30px 10%",
              height: "100vh",
              justifyContent: "space-evenly",
            }}
          >
            <div
              style={{
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                // border: "6px soli/d linear-gradient(#e66464, #9198e5)",
                margin: "50px",
                background: "linear-gradient(white, #9198e5)",
                padding: 10,
              }}
            >
              <div
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  background: "#a67843",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "32px",
                  }}
                >
                  13:00:59
                </span>
              </div>
            </div>
            <Grid item xs={12} md={8}>
              <div style={{ position: "relative", display: "inline-block" }}>
                <TextField
                  variant="standard"
                  fullWidth
                  id="title"
                  label={chapterTitle ? "" : "Chapter Title"}
                  name="title"
                  value={chapterTitle}
                  onChange={handleTitleChange}
                  sx={{
                    position: "absolute",
                    top: -25,
                    left: 0,

                    backgroundColor: "#fff",
                    width: `${chapterTitle.length * 15}px`,
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    zIndex: 1,
                    fontWeight: "bold",
                  }}
                />
              </div>
              <ReactQuill
                style={{ backgroundColor: "#fff", height: "calc(100% - 60px)" }}
                value={editorState}
                onChange={handleEditorChange}
              />
            </Grid>
          </Grid>
          <Outlet />
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Sprint;
