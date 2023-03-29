import React,{useEffect} from 'react'
import { useContext } from 'react';
import { Navigate, Outlet, Route, useNavigate } from 'react-router-dom';
import { AuthContext } from "./auth";

// const ProtectedRoute = ({children,...rest}) => {
//    const user = useContext(AuthContext);
//   return (
//     <div>
//         <Route {...rest} render={()=>user(children)}/>
//     </div>
//   )
// }

const ProtectedRoute=()=>{
    const user = useContext(AuthContext);
    return (
        user ? <Outlet/> : <Navigate to="/"/>
    );
}

export default ProtectedRoute