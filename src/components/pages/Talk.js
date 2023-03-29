import {
  Button,
  CssBaseline,
  Grid,
  Typography,
  Label,
  Drawer,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./auth";
import { dbFireStore, auth, storage } from "./auth/Firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
} from "firebase/firestore";
import User from "./User";
import "../../App.css";
import Img from "../../images/creator.png";
import MessageForm from "./MessageForm";
import Attachment from "../svg/Attachment";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Message from "./Message";
import Moment from "react-moment";
// import ProgressBar from 'react-bootstrap/ProgressBar';

const Talk = () => {
  // const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const { user } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [idd,setIdd] = useState('')

  const user1 = auth.currentUser.uid;

  useEffect(() => {
    const userRef = collection(dbFireStore, "users");
    const q = query(userRef, where("uid", "not-in", [user1]));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    console.log(users);
    return () => unsub();
  }, []);

  const selectUser = (user) => {
    setChat(user);

    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    setIdd(id);

    const msgsRef = collection(dbFireStore, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });
  };

  console.log(msgs);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      console.log(img.name);
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    await addDoc(collection(dbFireStore, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });

    await setDoc(doc(dbFireStore,'lastMsg',id),{
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread:true,
    })

    setText("");
  };


  // const user3 = user?.uid
  // const [data,setData] = useState('')

  // useEffect(()=>{
  //   let unsub = onSnapshot(doc(dbFireStore,'lastMsg',idd),(id) => {
  //     setData(doc.data());
  //   })
  //   return () => unsub()
  // },[])


  return (
    <div className="page">
      <Navbar />
      <div className="home_container">
        <div className="users_container">
          {users.map((user) => {
            {
              /* <User key={user.uid} user={user} selectUser={selectUser} /> */
            }

            return (
              <div className={`user_wrapper ${chat.name === user.name && "selected_user"} `} onClick={() => selectUser(user)}>
                <div className="user_info">
                  <div className="user_detail">
                    <img
                      src={user.avatar || Img}
                      alt="avatar"
                      className="avatar"
                    />
                    <h4>{user.name}</h4>
                    {console.log("username" + user.name)}
                  </div>
                  <div
                    className={`user_status ${
                      user.isOnline ? "online" : "offline"
                    }`}
                  ></div>
                </div>
                {/* {data && (
                  <p className="truncate">{data.text}</p>
                )} */}
              </div>
            );
          })}
        </div>
        <div className="messages_container">
          {chat ? (
            <>
              <div className="messages_user">
                <h3>{chat.name}</h3>
              </div>

              <div className="messages">
                {msgs.length
                  ? msgs.map((msg, i) => (
                      <div className={`message_wraper ${msg.from === user1 ? "own" : ""}`}>
                        <p className={msg.from === user1 ? "me" : "friend"}>
                          {msg.media ? (
                            <img src={msg.media} alt={msg.text} />
                          ) : null}
                          {msg.text}
                          <br />
                          <small><Moment fromNow>{msg.createdAt.toDate()}</Moment></small>
                        </p>
                      </div>
                    ))
                  : null}
              </div>
              {/* <MessageForm
                handleSubmit={handleSubmit}
                text={text}
                setText={setText}
              /> */}

              <form className="message_form" onSubmit={handleSubmit}>
                <label htmlFor="img" className="uploadImg">
                  <Attachment />
                </label>
                <input
                  onChange={(e) => setImg(e.target.files[0])}
                  type="file"
                  id="img"
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <div>
                  <input
                    type="text"
                    placeholder="Enter message"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>
                <div>
                  <button className="btn">Send</button>
                </div>
              </form>
            </>
          ) : (
            <h3 className="no_conv">Select a user to start conversation</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Talk;
