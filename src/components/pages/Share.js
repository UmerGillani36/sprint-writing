import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./Style.css";
import { AuthContext } from "./auth";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

const Share = (props) => {
  const { user } = useContext(AuthContext);

  const [selectedNovel, setSelectedNovel] = useState("none");
  const [novels, setNovels] = useState([]);
  console.log("novels", novels);
  const [selectedFriend, setSelectedFriend] = useState("none");
  const [friends, setFriends] = useState([]);

  const firebaseConfig = {
    apiKey: "AIzaSyDDQSIPDECt9fwPSWYwvXO_6V4CI-tsLNg",
    authDomain: "writo-525e8.firebaseapp.com",
    databaseURL: "https://writo-525e8-default-rtdb.firebaseio.com",
    projectId: "writo-525e8",
    storageBucket: "writo-525e8.appspot.com",
    messagingSenderId: "38396057848",
    appId: "1:38396057848:web:c3f76e6fa268d3cf0d830d",
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
      setNovels(novels);
    }
    async function getFriends() {
      const db = firebase.firestore();
      const friends = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        friends.push({ id: doc.id, ...doc.data() });
      });
      setFriends(friends);
    }
    getFriends();
    getNovels();
  }, []);
  const handleNovels = (event) => {
    setSelectedNovel(event.target.value);
  };
  const handleFriends = (event) => {
    setSelectedFriend(event.target.value);
  };
  const addContributor = () => {};
  return (
    <>
      {user ? (
        <div className="page">
          <Navbar />
          <div
            style={{
              height: "400px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              className="container-fluid nav_bg"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "40px",
              }}
            >
              <div
                style={{
                  width: "60%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  placeholder="Novels"
                  defaultValue="Novels"
                  value={selectedNovel}
                  onChange={handleNovels}
                  sx={{ width: "40%", background: "white" }}
                >
                  <MenuItem disabled defaultChecked value="none">
                    Novels
                  </MenuItem>
                  {novels &&
                    novels.map((novel) => (
                      <MenuItem value={novel.novelName}>
                        {novel.novelName}
                      </MenuItem>
                    ))}
                </Select>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedFriend}
                  onChange={handleFriends}
                  maxRows={3}
                  sx={{ width: "40%", background: "white" }}
                >
                  <MenuItem disabled defaultChecked value="none">
                    Friends
                  </MenuItem>
                  {friends &&
                    friends.map((friend) => (
                      <MenuItem value={friend.name}>{friend.name}</MenuItem>
                    ))}
                </Select>
              </div>
            </div>
            <Button variant="contained" onClick={addContributor}>
              Add Contributor
            </Button>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Share;
