import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home d-flex justify-content-center align-items-center">
      <div className="container text-center">
        <h1>Organize your work and life, finally</h1>
        <p>
          Become focused, organize, and calm with
          <br />
          our todo app. The world's #1 task management app
        </p>
        <button className="home-btn">Make Todo List</button>
      </div>
    </div>
  );
};

export default Home;
