import React from "react";
import "./Login.css";
import useFirebase from "./../../Hook/useFirebase";

const Login = () => {
  const { handleGoogleLogin } = useFirebase();
  // console.log(handleGoogleLogin());

  return (
    <div>
      <div className="logo">
        <img
          className="p-2 w-25 mb-5"
          src="https://tse2.mm.bing.net/th?id=OIP.9YA5oh83Z32MbbTSjwKGMQHaEK&pid=Api&P=0&h=180" 
          alt="logo"
          />
        
      </div>
      <div className="login-box w-25 m-auto">
        <div className="box border border d-flex justify-content-center align-items-center">
          <button onClick={handleGoogleLogin} className="btn w-75  btn-warning">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
