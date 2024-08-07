import React, { useState } from "react";
import "./Signup.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeadingComp from "./HeadingComp";
import axios from "axios";
import {useNavigate} from 'react-router-dom';


const Signup = () => {

  const history = useNavigate();
  
  const [Input, setInput] = useState({ email: "", username: "", password: "" });
  
  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...Input, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${window.location.origin}/api/v1/register`,
        Input
      );

      if (response.status === 201) {
        alert(response.data.message);
        setInput({
          email: "",
          username: "",
          password: "",
        });
        history('/signin');
      } else {
        alert("Failed to register. Please try again later.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message); // Alert user that account already exists
      } else {
        console.error("Error signing up:", error);
        alert("Error signing up. Please try again later.");
      }
    }
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column d-flex column justify-content-center align-items-center">
            <div className="d-flex flex-column w-100 p-3">
              <input
                className="p-2 my-3 Input-signup"
                name="email"
                type="email"
                placeholder="Enter your Email"
                onChange={change}
                value={Input.email}
              />
              <input
                className="p-2 my-3 Input-signup"
                name="username"
                type="username"
                placeholder="Enter your Username"
                onChange={change}
                value={Input.username}
              />
              <input
                className="p-2 my-3 Input-signup"
                name="password"
                type="password"
                placeholder="Enter your Password"
                onChange={change}
                value={Input.password}
              />
              <button className="p-2 btn-signup" onClick={submit}>
                Signup
              </button>
            </div>
          </div>
          <div className="col-lg-4 d-lg-flex  column col-left justify-content-center align-items-center d-none ">
            <HeadingComp first="Sign" second="Up" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
