import React, { useState } from "react";
import "./Signup.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeadingComp from "./HeadingComp";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from "react-redux";
import { authActions } from "../store";

const Signin = () => {

  const dispatch = useDispatch();
  const [Input, setInput] = useState({ email: "", password: "" });
  const history = useNavigate(); 

  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...Input, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        `${window.location.origin}/api/v1/signin`,
        Input
      );
  
      if (response.status === 200) {
        alert(response.data.message);
        setInput({
          email: "",
          password: "",
        });
  
        // Update Redux state to indicate user is logged in
        dispatch(authActions.login());
  
        // Store user ID in session storage
        sessionStorage.setItem("id", response.data.user._id);
  
        // Navigate to the Todo page
        history("/todo");
      } else {
        alert("Failed to sign in. Please try again later.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        alert("Error signing in. Please try again later.");
      }
    }
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 d-lg-flex d-none column col-left justify-content-center align-items-center">
            <HeadingComp first="Sign" second="In" />
          </div>
          <div className="col-lg-8 d-flex column justify-content-center align-items-center">
            <div className="d-flex flex-column w-100 p-3">
              <input
                className="p-3 my-3 Input-signup"
                name="email"
                type="email"
                placeholder="Enter your Email"
                value={Input.email}
                onChange={change}
              />
              <input
                className="p-3 my-3 Input-signup"
                name="password"
                type="password"
                placeholder="Enter your Password"
                value={Input.password}
                onChange={change}
              />
              <button className="p-2 btn-signup" onClick={submit}>Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
