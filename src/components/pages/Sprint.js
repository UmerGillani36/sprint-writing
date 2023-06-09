import { Button, Grid, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./auth";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { convert } from "html-to-text";
import { saveAs } from "file-saver";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { auth, dbFireStore } from "../pages/auth/Firebase";
import { useLayoutEffect } from "react";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  const { state } = useLocation();
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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // if (user) {
    //   const db = firebase.firestore();
    //   const docRef = db.collection("arhamdoc").doc(user.uid);
    //   setDocRef(docRef);
    //   docRef.get().then((doc) => {
    //     if (doc.exists) {
    //       setEditorState(doc.data().content);
    //       setChapterTitle(doc.data().chapterTitle);
    //     }
    //   });
    // }
  }, [user]);

  useLayoutEffect(() => {
    console.log("Navigate data: ", state);
    if (state) {
      setChapterTitle(state.novelName);
      setEditorState(state.data);
    }
  }, []);

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
    if (!loading) {
      setLoading(true);
      const db = firebase.firestore();
      const writersRef = db.collection("writers");
      const wordCount = editorState.trim().split(/\s+/).length;
      writersRef
        .add({
          id: user.uid,
          date: new Date(),
          time: totalTime,
          words: wordCount,
          novelName: chapterTitle,
          data: editorState,
          contributors: [user.uid],
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
              contributors: [user.uid],
              author: user.uid,
            })
            .then(() => {
              console.log("Novel added successfully");
              setTimer(0);
              setTime(0);
              setChapterTitle("");
              setEditorState("");
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
            });
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  }

  const handleDownload = (html) => {
    console.log("Download Called: ", html);
    const text = convert(html, {
      wordwrap: false,
      ignoreHref: true,
      ignoreImage: true,
      preserveNewlines: true,
      uppercaseHeadings: false,
    });

    const documentDefinition = {
      content: [
        {
          layout: "noBorders",
          table: {
            widths: ["*"],
            body: [
              [
                {
                  text: text,
                  fontSize: 14,
                  alignment: "left",
                },
              ],
            ],
          },
        },
      ],
    };
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.getBlob((blob) => {
      saveAs(blob, "document.pdf");
    });
  };

  // function htmlToParagraphs(htmlContent) {
  //   const div = document.createElement("div");
  //   div.innerHTML = htmlContent;
  //   const paragraphs = [];

  //   for (let i = 0; i < div.childNodes.length; i++) {
  //     const node = div.childNodes[i];
  //     if (node.nodeName === "P") {
  //       const text = node.textContent.trim();
  //       if (text) {
  //         paragraphs.push(text);
  //       }
  //     }
  //   }

  //   return paragraphs;
  // }

  // function createWordDocument(htmlContent) {
  //   const paragraphs = htmlToParagraphs(htmlContent);
  //   const doc = new Document();

  //   paragraphs.forEach((text) => {
  //     const paragraph = new Paragraph(text);
  //     doc.addParagraph(paragraph);
  //   });

  //   return doc;
  // }

  const handleDownloadWord = (html) => {
    console.log("Download Called: ", html);
    // const doc = createWordDocument(html);
    // const buffer = doc.generate();
    // const blob = new Blob([buffer], {
    //   type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    // });
    // saveAs(blob, `${fileName}.docx`);
    // const doc = new Document();

    // // Split the HTML content into paragraphs
    // const paragraphs = html.split("<p>").map((p) => p.replace("</p>", ""));

    // // Add each paragraph to the Word document
    // paragraphs.forEach((p) => {
    //   doc.addSection({
    //     properties: {},
    //     children: [
    //       new Paragraph({
    //         text: p,
    //         style: "default",
    //       }),
    //     ],
    //   });
    // });

    // // Generate the Word document and download it
    // Packer.toBlob(doc).then((blob) => {
    //   saveAs(blob, "document.docx");
    // });
    // const convertedDoc = HtmlDocx.asBlob(html);
    // saveAs(convertedDoc, "document.docx");
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
                  onClick={() => handleDownload(editorState)}
                >
                  Download PDF
                </Button>
                {/* <Button
                  variant="contained"
                  size="small"
                  sx={{ width: "60%" }}
                  onClick={() => handleDownloadWord(editorState)}
                >
                  Download Word
                </Button> */}
              </div>
            </div>
            <Grid item xs={12} md={8}>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  paddingBottom: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    variant="filled"
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
                    size="large"
                    sx={{ boxSizing: "content-box" }}
                    onClick={startTimerButton}
                  >
                    Start
                  </Button>
                </div>
                <TextField
                  variant="filled"
                  fullWidth
                  id="title"
                  label={chapterTitle ? "" : "Novel Title"}
                  name="title"
                  value={chapterTitle}
                  onChange={handleTitleChange}
                />
              </div>
              <ReactQuill
                style={{
                  backgroundColor: "#fff",
                  height: "calc(100% - 90px)",
                }}
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
