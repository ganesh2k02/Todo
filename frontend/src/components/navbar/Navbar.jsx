import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { GiWhiteBook } from "react-icons/gi";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store";

const CustomNavbar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const logout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout());
  };

  return (
    <Navbar expand="lg" className="navbar-expand-lg custom-navbar">
      <Container fluid>
        <Navbar.Brand className="navbar-brand" href="#">
          <b>
            <GiWhiteBook />
            todo
          </b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/todo">
              Todo
            </Nav.Link>
            {!isLoggedIn && (
              <div className="d-flex p-lg-0 p-2">
                <>
                  <Nav.Link as={Link} to="/signup" className="nav-btn">
                    SignUp
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signin" className="nav-btn">
                    SignIn
                  </Nav.Link>
                </>
              </div>
            )}
            {isLoggedIn && (
              <div className="d-flex p-lg-0 p-2">
                <Nav.Link
                  onClick={logout}
                  as={Link}
                  to="/logout"
                  className="nav-btn"
                >
                  Log Out
                </Nav.Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
