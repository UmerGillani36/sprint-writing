import { Alert, Box, Button } from '@mui/material';
import { blue } from '@mui/material/colors';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import { app ,dbFireStore} from '../Firebase';
import { setDoc , doc ,Timestamp} from 'firebase/firestore';
import "./SignupForm.css"
import { async } from '@firebase/util';

const SignupForm = () => {
    const [error , setError] = useState({
        status:false,
        msg:"",
        type:""

    });

    function diffToast(params) {
      toast.error(params)
    }


    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            name:data.get('name'),
            email:data.get('email'),
            password:data.get('password'),
            confirm_password:data.get('confirm-password'),
        }
        const name = actualData.name;
        const email = actualData.email;
        if(actualData.name && actualData.email && actualData.password &&actualData.confirm_password){
            if(actualData.password === actualData.confirm_password){
                console.log(actualData);
            document.getElementById('registration-form').reset();
            setError({status:'true' , msg:'Successfuly registered' , type:'success'});
            // navigate('/');


              const auth = getAuth(app);
              createUserWithEmailAndPassword(auth,actualData.email, actualData.password)
                .then(async userCredential => {
                  // Signed in 
                  const user = userCredential.user;
                  toast.success("Account created.")

                  await setDoc(doc(dbFireStore,"users",userCredential.user.uid),{
                    uid : userCredential.user.uid,
                    name,
                    email,
                    createdAt:Timestamp.fromDate(new Date()),
                    isOnline:true,
                  });

                  setTimeout(() => {
                    navigate("/loginform")
                  },4000)

                  // ...
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  toast.error(error.message);
                  // ..
                 });



            }else
            {
                setError({status:'true' , msg:'Passwords does not match' , type:'error'});
                diffToast("Passwords does not match");
            }
        }else{
            setError({status:'true' , msg:'All fields are requird' , type:'error'});
            diffToast("All fields are requird");
        }
    }
    return (
        <Box className='main hero-image' component='form' noValidate id='registration-form' onSubmit={handleSubmit}>
        <div className='cover'>
        <h1>Signup</h1>
        <input type="text" name='name' placeholder='name'/>
        <input type="email" name='email' placeholder='email'/>
        <input type="password" name='password' placeholder='password' />
        <input type="password" name='confirm-password' placeholder='confirm password' />
        {/* <div className='signup-btn'>Signup</div> */}
        <div >
        <Button style={{'backgroundColor':'goldenrod'}} className='signup-btn' type='submit' variant='contained'>
                Register
        </Button>
        </div>
        <div className='already-an-account'>
        <p>Already have an account?</p>
        <Link to="/loginform">Click here to login</Link>
        </div>
        {/* {error.status ?         <Alert severity={error.type}>{error.msg}</Alert>
        : ''} */}
        </div>
        <ToastContainer/>
        </Box>
      )
    }

export default SignupForm