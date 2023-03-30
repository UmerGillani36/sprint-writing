import { Button, Grid, TextField } from "@mui/material";
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
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
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
    if (chapterTitle.trim().length !== 0) {
      if (timer !== 0) {
        setStartTimer(true);
        setEditorState(content);
        if (docRef) {
          docRef.set({ content, chapterTitle });
        }
      } else {
        alert("Please Set Time First");
      }
    } else {
      alert("Please Enter Novel Title");
    }
  };

  const handleTitleChange = (event) => {
    setChapterTitle(event.target.value);
    if (docRef) {
      docRef.set({ content: editorState, chapterTitle: event.target.value });
    }
  };

  useEffect(() => {
    if (startTimer) {
      let intervalId;

      if (timer > 0) {
        intervalId = setInterval(() => {
          setTimer((prevTime) => prevTime - 1);
        }, 1000);
      } else {
        // Call the Save function when timer reaches 0
        Save();
      }

      return () => clearInterval(intervalId);
    }
  }, [timer, startTimer]);

  const startTimerButton = () => {
    setStartTimer(true);
    setTotalTime(time);
    setTime(0);
  };

  function Save() {
    // clearInterval(timer);
    const db = firebase.firestore();
    const writersRef = db.collection("writers");
    const wordCount = editorState.trim().split(/\s+/).length;
    writersRef
      .add({
        id: user.uid,
        date: new Date(),
        time: totalTime,
        words: wordCount,
        data: editorState,
      })
      .then((docRef) => {
        const novelsRef = db.collection("novels");
        novelsRef
          .add({
            id: docRef.id,
            date: new Date(),
            time: totalTime,
            words: wordCount,
            data: editorState,
            novelName: chapterTitle,
            author: user.uid,
          })
          .then(() => {
            console.log("Novel added successfully");
            setTimer(0);
            setChapterTitle("");
            setEditorState("");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleDownload = () => {
    console.log("Not completed");
    // using Java Script method to get PDF file
    // fetch("SamplePDF.pdf").then((response) => {
    //   response.blob().then((blob) => {
    //     // Creating new object of PDF file
    //     const fileURL = window.URL.createObjectURL(blob);
    //     // Setting various property values
    //     let alink = document.createElement("a");
    //     alink.href = fileURL;
    //     alink.download = "SamplePDF.pdf";
    //     alink.click();
    //   });
    // });
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
                height: "80%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {startTimer && (
                <div
                  style={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "50%",
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
                      {Math.floor(timer / 60)
                        .toString()
                        .padStart(2, "0")}
                      :{(timer % 60).toString().padStart(2, "0")}
                    </span>
                  </div>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h6
                  style={{
                    width: "100%",
                    wordBreak: "break-word",
                    margin: "0px 0px 10px 0px",
                  }}
                >
                  Download the novel by clicking
                </h6>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ width: "60%" }}
                  onClick={handleDownload}
                >
                  Download
                </Button>
              </div>
            </div>
            <Grid item xs={12} md={8}>
              <div
                style={{ position: "relative", display: "flex", width: "100%" }}
              >
                <div style={{ display: "flex", width: "100%" }}>
                  <TextField
                    variant="standard"
                    label="Time (in minutes)"
                    type="number"
                    inputProps={{ min: "1", step: "1" }}
                    value={time}
                    onChange={(event) => {
                      setTime(event.target.value);
                      setTimer(event.target.value * 60);
                    }}
                    sx={{ width: "200px", marginRight: "20px" }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ boxSizing: "content-box" }}
                    onClick={startTimerButton}
                  >
                    Start
                  </Button>
                </div>
                <TextField
                  variant="standard"
                  fullWidth
                  id="title"
                  label={chapterTitle ? "" : "Novel Title"}
                  name="title"
                  value={chapterTitle}
                  onChange={handleTitleChange}
                />
              </div>
              <ReactQuill
                style={{ backgroundColor: "#fff", height: "calc(100% - 60px)" }}
                value={editorState}
                onChange={handleEditorChange}
              />
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  sx={{ marginTop: 1 }}
                  onClick={() => {
                    Save();
                    setTimer(0);
                    setChapterTitle("");
                    setEditorState("");
                  }}
                >
                  Submit
                </Button>
              </div>
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
