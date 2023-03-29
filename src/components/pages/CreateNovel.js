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
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import React, { useState, useContext } from "react";
import "./Style.css";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./auth";
import {app} from "../pages/auth/Firebase";


const CreateNovel = () => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = user?.uid;

    if (!userId) {
      console.error("No user is logged in.");
      return;
    }

    const data = new FormData(e.currentTarget);
    const actualData = {
      novelName: data.get("novel_name"),
    };

    if (actualData.novelName) {
      document.getElementById("input-form").reset();

      try {
        const novelSnapshot = await firebase
          .firestore()
          .collection(`users/${userId}/novels`)
          .where("novelName", "==", actualData.novelName)
          .get();

        if (novelSnapshot.empty) {
          await firebase
            .firestore()
            .collection(`users/${userId}/novels`)
            .add({
              novelName: actualData.novelName,
            });
          setError(null);
        } else {
          setError("A novel with the same name already exists. Please choose a different name.");
          setTimeout(() => {
            setError(null);
          }, 3000);
        }
      } catch (error) {
        console.error("Error creating novel:", error);
      }
    } else {
      // Handle the case when the novel name is not provided
    }
  };

  return (
    <>
      {user ? (
        <>
          <div style={{ marginTop: 40, marginBottom: 20 }}>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              Create New Novel
            </Typography>
          </div>
          {error && (
            <div style={{ color: "red", marginTop: 10, marginBottom: 10 }}>
              {error}
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            id="input-form"
            style={{
              background: "transparent",
              borderRadius: "10px",
            }}
          >
            <input
              type="text"
              id="novel_name"
              name="novel_name"
              placeholder="Novel Name"
              style={{
                width: "50%",
                height: "30px",
                borderRadius: "15px",
              }}
            />
            <button
              type="submit"
              style={{
                width: "10%",
                height: "60px",
                type: "submit",
                marginLeft: 40,
                borderRadius: "12px",
                background: "#896130",
              }}
            >
              Create Novel
            </button>
          </form>
          <Outlet />
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default CreateNovel;
