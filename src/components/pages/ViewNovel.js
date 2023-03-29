import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { Link } from 'react-router-dom';
import NovelPage from './NovelPage';
import { getAuth } from 'firebase/auth';
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { auth, dbFireStore } from '../pages/auth/Firebase';
import { Delete as DeleteIcon } from '@mui/icons-material';
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';


// Check if Firebase app has been initialized


const ViewNovel = () => {
  const navigate = useNavigate();

  const [userId, setId] = useState();
  const [data, setData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedNovel, setSelectedNovel] = useState(null);
  const [confirmationInput, setConfirmationInput] = useState('');

  function getUserId() {
    const user = auth.currentUser;
    if (user) {
      setId(user.uid);
    }
  }

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      const unsubscribe = onSnapshot(
        collection(dbFireStore, `users/${userId}/novels`),
        (snapshot) => {
          const newData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(newData);
        }
      );

      return () => unsubscribe();
    }
  }, [userId]);

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setConfirmationInput('');
    setSelectedNovel(null);
  };

  const handleConfirmationInput = (event) => {
    setConfirmationInput(event.target.value);
  };

  const handleDeleteConfirmation = async () => {
    if (selectedNovel && confirmationInput.toLowerCase() === selectedNovel.novelName.toLowerCase()) {
      try {
        await deleteDoc(
          doc(dbFireStore, `users/${userId}/novels`, selectedNovel.id)
        );
        handleCloseDialog();
      } catch (error) {
        console.error('Error deleting document: ', error);
      }
    } else {
      alert('The name you entered does not match the name of the selected novel. Please try again.');
    }
  };

  function component(novel) {
    const handleDelete = () => {
      setSelectedNovel(novel);
      setDialogOpen(true);
    };
  
    const styles = {
      card: {
        borderRadius: 16,
        backgroundColor: '#E0C9A6',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
          cursor: 'pointer',
        },
      },
      content: {
        position: 'relative',
      },
      title: {
        fontWeight: 'bold',
        marginLeft: 32,
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
          textDecoration: 'none',
        },
      },
      deleteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
      },
    };
  
    return (
      <Grid item xs={4} key={novel.id}>
        <Link to={`/novel/${novel.id}`} style={styles.title}>
          <Card variant="outlined" style={styles.card}>
            <CardContent style={styles.content}>
              <Typography variant="h4">{novel.novelName}</Typography>
              <IconButton onClick={handleDelete} style={styles.deleteButton}>
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        </Link>
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete the novel "{selectedNovel ? selectedNovel.novelName : ''}"? This action cannot be undone. Please type the name of the novel to confirm.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="confirmation-input"
              label={`Type "${selectedNovel ? selectedNovel.novelName : ''}" to confirm`}
              fullWidth
              value={confirmationInput}
              onChange={handleConfirmationInput}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleDeleteConfirmation} variant="contained" color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }
  

return (
<>
<Grid container spacing={3}>
{data.map((novel) => component(novel))}
</Grid>
</>
);
};

export default ViewNovel;
