import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./auth";
import Img from "../../images/creator.png";
import Navbar from "../Navbar";
import Camera from "../svg/Camera";
import "../../App.css";
import { useState, useEffect } from "react";
import { dbFireStore, storage, auth } from "./auth/Firebase";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { getDoc, doc, DocumentSnapshot, updateDoc } from "firebase/firestore";

const Profile = () => {
  const [img, setImg] = useState("");
  const [User, setUser] = useState("");
  // const date = User.createdAt.toDate().toDateString();
  useEffect(() => {
    getDoc(doc(dbFireStore, "users", auth.currentUser.uid)).then(
      (DocumentSnapshot) => {
        if (DocumentSnapshot.exists) {
          setUser(DocumentSnapshot.data());
        }
      }
    );
    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );
        try {
          if (User.avatarPath) {
            await deleteObject(ref(storage, User.avatarPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(dbFireStore, "users", auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });
          setImg("");
        } catch (err) {
          console.log(err);
        }
      };

      uploadImg();
    }
  }, [img]);

  return (
    <div className="profile_container">
      <div className="second_container">
        <div className="img_container">
          <img src={User.avatar || Img} alt="profile image" />
          <div className="overlay">
            <div>
              <label htmlFor="photo">
                <Camera />
              </label>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="photo"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        <div className="text_container">
          <h3>{User.name}</h3>
          <p>{User.email}</p>
          <hr />
          <small>Joind on: </small>
        </div>
      </div>
    </div>
  );
};

export default Profile;
