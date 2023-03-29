import { Alert, Box, Button } from '@mui/material'
import { getAuth, signInWithPhoneNumber ,RecaptchaVerifier} from 'firebase/auth'
import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Link, useNavigate } from 'react-router-dom'
import { app } from '../Firebase'
import "./PhoneNumberLogin.css"

const PhoneNumberLogin = () => {

    //const phoneNumber = getPhoneNumberFromUserInput();


    const [number,setNumber] = useState("");

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-verifier', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
          }, auth);
    }


    const myNumber = '923314457272'
    const auth = getAuth(app);
    const requestOTP = (e) => {
        e.preventDefault();
       generateRecaptcha();
       let appVerifier = window.recaptchaVerifier;
       signInWithPhoneNumber(auth,number,appVerifier)
       .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
        alert("got number")
        setError({status:'true' , msg:'Verification code sent' , type:'success'});
       }).catch((error) => {
        console.log(error);
       })
      }

    
      const goToLogin = () => {
        navigate('/loginform')
      }


    const getOtp = (e) => {
        e.preventDefault();
    }
    const [error , setError] = useState({
        status:false,
        msg:"",
        type:""
    });
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            phoneNumber:data.get('phoneNumber'),
        }

        

        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
             // onSignInSubmit();
            }
          }, auth);


          const appVerifier = window.recaptchaVerifier;
        if(number){
            console.log(actualData);
            document.getElementById('login-form').reset();


              // Admin SDK API to generate the password reset link.
             
             signInWithPhoneNumber(auth, number ,appVerifier)
             .then((confirmationResult) => {
               // SMS sent. Prompt user to type the code from the message, then sign the
               // user in with confirmationResult.confirm(code).
               setError({status:'true' , msg:'Verification code sent' , type:'success'});
               window.confirmationResult = confirmationResult;
               // ...
             }).catch((error) => {
               // Error; SMS not sent
               // ...
             });

        }else{
            setError({status:'true' , msg:'Enter a phone number' , type:'error'});
        }
    }




  return (
    <Box component="form"  noValidate id='login-form' className='main hero-image' onSubmit={requestOTP}>
    <div className='cover'>
    <h1>Send OTP</h1>
    {/* <div className='login-btn'>Login</div> */}
    <PhoneInput  className="number-display pl-5"
        defaultCountry={"PH"}
        value={number}
        onChange={setNumber}
        placeholder="Enter phone number"
    />
    <div style={{'display':'flex' , 'gap':'20px'}}>
    <Button onClick={goToLogin} style={{'backgroundColor':'gray'}} className='send-btn' variant='contained'>
                Cancel
    </Button>
    <Button style={{'backgroundColor':'goldenrod'}} className='send-btn' type='submit' variant='contained'>
                Send
    </Button>
    </div>
    <div className='create-an-account'>
    </div>
    {error.status ?         <Alert severity={error.type} sx={{mt:2}}>{error.msg}</Alert>
        : ''}
        <div id='recaptcha-verifier'></div>
      </div>
    </Box>
  )
}

export default PhoneNumberLogin