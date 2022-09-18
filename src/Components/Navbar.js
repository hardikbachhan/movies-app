import React, { Component } from "react";

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
        <h2>Movies App</h2>
        <h4 style={{marginLeft: "2rem"}}>Favourites</h4>
      </div>
    );
  }
}
