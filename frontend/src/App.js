import React, { useEffect } from "react";
import CustomNavbar from "./components/navbar/Navbar"; // Adjusted the path if necessary
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import Signup from "./components/Signup/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./components/Signup/Signin";
import Todo from "./components/Todo/Todo";
import { useDispatch } from "react-redux";
import { authActions } from "./components/store";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id) {
      dispatch(authActions.login());
    }
  }, [dispatch]);
  return (
    <div>
      <Router>
        <CustomNavbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/todo" element={<Todo />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/signin" element={<Signin />}></Route>
          <Route exact path="/logout" element={<Todo />}></Route>
        </Routes>
      </Router>

      <Footer />
    </div>
  );
};

export default App;
