  import React, { useContext } from "react";
  import "./Style.css";
  import { Navigate, useNavigate } from "react-router-dom";
  import Navbar from "../Navbar";
  import { AuthContext } from "./auth";
  
  const Templatepage = () => {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    const handleLogout = () => {
      navigate("/login");
    };
    return (
      <>
      {user ? 
        <div className="page">
          {}
          <Navbar />
        </div>
      :
      <Navigate to="/"/>
      }
      </>
    );
  };
  
  export default Templatepage;
  