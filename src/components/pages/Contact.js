import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./auth";

const Contact = () => {
  const {user} = useContext(AuthContext);
  return (
    <>{user ? 
    <div>
      <h1>Share Page</h1>
      <hr />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas alias
        saepe quibusdam deserunt odit reprehenderit accusamus ullam
        voluptatibus! Unde hic id modi vel officiis atque asperiores dicta
        itaque ratione deleniti. Commodi magni aspernatur saepe rem recusandae
        ullam dolorum maxime? Sunt sapiente, laudantium perspiciatis consequatur
        voluptas fugit a? Esse recusandae ab ducimus nulla possimus dicta, sint
        ea ipsam natus facilis quo dolorem aliquam nam rerum rem ipsa? Totam est
        soluta quos ullam dignissimos consequatur quia tempora asperiores
        doloremque, rerum tempore reiciendis officiis aut a, ipsam qui molestiae
        sequi suscipit? Culpa corporis sunt consequatur ipsam hic. Eaque
        incidunt nisi debitis libero aperiam?
      </p>
      </div>
    :
    <Navigate to="/" />
    }
    </>
  );
};

export default Contact;
