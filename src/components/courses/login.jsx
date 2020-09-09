import React from "react";
import LoginForm from "./lofinForm";
import Logo from "../common/logo";

const LogIn = () => {
  return (
    <div
      className="container-fluid d-flex justify-content-center rounded-lg"
      id="root1"
      style={{
        backgroundImage: `url(${require("../pictures/49156603556_915b3ef4cf_k.jpg")})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="card my-auto" style={{ width: "18rem", border: 0 }}>
        <Logo />
        <div className="card-body">
          <h5 className="card-title" style={{ textAlign: "center" }}>
            MEMBER LOGIN
          </h5>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
