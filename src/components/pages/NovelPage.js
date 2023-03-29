import {
  CssBaseline,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "./Style.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import "./Style.css";
import { AuthContext } from "./auth";
import { doc, getDoc } from 'firebase/firestore';
import { dbFireStore } from '../pages/auth/Firebase';

const NovelPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { novelId } = useParams();
  const [novel, setNovel] = useState(null);
  const [chapters, setChapters] = useState([]);

  const handleLogout = () => {
    navigate("/login");
  };

  useEffect(() => {
    const fetchNovelData = async () => {
      try {
        const novelDoc = await getDoc(doc(dbFireStore, `users/${user.uid}/novels/${novelId}`));
        if (novelDoc.exists()) {
          setNovel(novelDoc.data());
          setChapters(novelDoc.data().chapters);
        } else {
          console.log('Novel not found!');
        }
      } catch (error) {
        console.error('Error fetching novel data: ', error);
      }
    };
    fetchNovelData();
  }, [novelId, user]);

  const handleCreateChapter = () => {
    // TODO: Implement create chapter functionality
    console.log("Create chapter button clicked");
  };

  return (
    <>
      {user ? (
        <div className="page">
          <Navbar>
            <Button variant="contained" onClick={handleCreateChapter} className="create-chapter-btn">
              Create Chapter
            </Button>
          </Navbar>
          <CssBaseline />
          <Grid container justifyContent="center" className="container">
            <Grid item xs={12} sm={8} md={6} lg={4}>
              {novel ? (
                <Card variant="outlined" className="card">
                  <CardContent>
                    <Typography variant="h4" gutterBottom>
                      {novel.novelName}
                    </Typography>
                    <Typography variant="body1" className="description">{novel.description}</Typography>
                    <Typography variant="subtitle1" gutterBottom className="author">
                      Author: {novel.author}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom className="genre">
                      Genre: {novel.genre}
                    </Typography>
                    {/* Add more novel details here */}
                  </CardContent>
                </Card>
              ) : (
                <Typography variant="h5" align="center">
                  Loading...
                </Typography>
              )}
            </Grid>
          </Grid>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default NovelPage;
