import { Alert, Box, Button } from '@mui/material'
import { getAuth, signInWithEmailAndPassword ,GoogleAuthProvider ,signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import { Await, Link, useNavigate } from 'react-router-dom'
import { app  ,dbFireStore} from '../Firebase'
import "./LoginForm.css"
import { updateDoc , setDoc , doc , Timestamp} from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {



  const provider = new GoogleAuthProvider();

    const [error , setError] = useState({
        status:false,
        msg:"",
        type:""
    });

    const auth = getAuth(app);

    const SignInWithPopup = () => {
    signInWithPopup(auth, provider)
  .then(async (result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    await setDoc(doc(dbFireStore,"users",result.user.uid),{
      uid : result.user.uid,
      name : result.user.name,
      email : result.user.email,
      createdAt:Timestamp.fromDate(new Date()),
      isOnline:true,
    });
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

  const redirectToSigninWithPhone = () => {
    navigate('/phonenumberlogin')
  }

    function diffToast(params) {
      toast.error(params)
    }


    // const diffToast = (props) => {
    //   toast(props.message)
    // }

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            email:data.get('email'),
            password:data.get('password'),
        }
        if(actualData.email && actualData.password){
            console.log(actualData);
            document.getElementById('login-form').reset();
            setError({status:'true' , msg:'login success' , type:'success'});
            setTimeout(()=>{
                



                
                signInWithEmailAndPassword(auth, actualData.email, actualData.password)
                  .then(async (userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    alert("Success")
                    await updateDoc(doc(dbFireStore,"users",userCredential.user.uid),{
                      isOnline:true,
                    });
                    navigate('/dashboard')
                    // ...
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    //alert(error.message)
                    setError({status:'true' , msg:'User not registered.' , type:'error'});
                    diffToast("User not reqistered");
                  });




            },0)
        }else{

            setError({status:'true' , msg:'All fields are requird' , type:'error'});
            diffToast("All fields are required");
        }
    }




  return (
    <Box className='main hero-image' component='form' noValidate id='login-form' onSubmit={handleSubmit}>
    <div className='main-cover'>
    <div className='cover'>
    <h1>Login</h1>
    <input type="text" name='email' placeholder='email'/>
    <input type="password" name='password' placeholder='password' />
    {/* <div className='login-btn'>Login</div> */}
    <div>
    <Button style={{'backgroundColor':'goldenrod'}} className='login-btn' type='submit' variant='contained' >
                Login
    </Button>
    </div>
    <div>OR Signin with</div>
    <div style={{'gap':'20px'}}>
    
      <Button onClick={redirectToSigninWithPhone} type='submit' variant='contained'>Sign in with phone</Button>
      
      <Button onClick={SignInWithPopup} type='submit' variant='contained'>Google</Button>
    </div>
    <Link to="/forgotpassform">Forgot Password</Link>
    <div className='create-an-account'>
    <p>Create an account?</p>
    <Link to="/signupform">Click here</Link>
    </div>
      </div>
      {/* {error.status ?         <Alert severity={error.type} sx={{mt:2}}>{error.msg}</Alert>
        : ''} */}
      </div>
      <ToastContainer />
    </Box>
  )
}

export default LoginForm