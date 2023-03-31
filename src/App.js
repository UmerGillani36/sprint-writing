import React from "react";
import { RecaptchaVerifier } from "firebase/auth";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChangePassword from "./components/pages/auth/ChangePassword";
import ForgotPassForm from "./components/pages/auth/ForgotPassForm/ForgotPassForm";
import LoginForm from "./components/pages/auth/Login/LoginForm";
import LoginReg from "./components/pages/auth/LoginReg";
import PhoneNumberLogin from "./components/pages/auth/PhoneNumberLogin/PhoneNumberLogin";
import ResetPasswordForm from "./components/pages/auth/ResetPasswordForm";
import SendPasswordResetEmail from "./components/pages/auth/SendPasswordResetEmail";
import SignupForm from "./components/pages/auth/SignupForm/SignupForm";
import Contact from "./components/pages/Contact";
import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/Home";
import Layout from "./components/pages/Layout";
import Novel from "./components/pages/Novel";
import Sprint from "./components/pages/Sprint";
import Progress from "./components/pages/Progress";
import Talk from "./components/pages/Talk";
import AuthProvider from "./components/pages/auth";
import PrivateRoute from "./components/pages/PrivateRoute";
import ProtectedRoute from "./components/pages/ProtectedRoute";
import Profile from "./components/pages/Profile";
import NovelPage from "./components/pages/NovelPage";
import Share from "./components/pages/Share";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<LoginForm />} />
            {/* <Route path="/" element={<Layout />}> */}
            {/* <Route index element={<LoginForm />} /> */}
            <Route path="login" element={<LoginReg />} />
            <Route
              path="sendpasswordresetemail"
              element={<SendPasswordResetEmail />}
            />
            <Route path="reset" element={<ResetPasswordForm />} />
            {/* </Route> */}
            <Route path="/changepassword" element={<ChangePassword />} />
            {/* <Route element={<PrivateRoute />}> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/novel" element={<Novel />} />
            <Route path="/sprint" element={<Sprint />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/chat" element={<Talk />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/share" element={<Share />} />
            {/* </Route> */}
            <Route path="/loginform" element={<LoginForm />} />
            <Route path="/signupform" element={<SignupForm />} />
            <Route path="/forgotpassform" element={<ForgotPassForm />} />
            <Route path="/phonenumberlogin" element={<PhoneNumberLogin />} />
            <Route path="/novel/:novelId" element={<NovelPage />} />
            <Route path="*" element={<h1>Error 404 Page not found</h1>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
