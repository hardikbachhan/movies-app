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
        }}
      >
        <h1>Movies App</h1>
        <h3 style={{marginLeft: "2rem"}}>Favourites</h3>
      </div>
    );
  }
}
