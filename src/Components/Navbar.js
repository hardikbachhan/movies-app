import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div
        className="nav"
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          background: "lightblue",
          padding: "1rem",
          color: "white",
          backgroundColor: "#222",
        }}
      >
        <Link to="/" style={{textDecoration: "none", color: "white"}}>
          <h2>Movies App</h2>
        </Link>
        <Link to="/favourites" style={{textDecoration: "none", color: "white"}}>
          <h4 className="ms-3">Favourites</h4>
        </Link>
      </div>
    );
  }
}
