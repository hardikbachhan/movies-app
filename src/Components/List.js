import React, { Component } from "react";
import { movies } from "./getMovies";

export default class List extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
    };
  }

  handleEnter = (id) => {
    this.setState({
      hover: id,
    });
  };

  handleLeave = () => {
    this.setState({
      hover: "",
    });
  };

  render() {
    let allMovies = movies.results;
    // console.log("render method of list component called");
    return (
      <div>
        <h3 className="display-3 trending" style={{ marginTop: "1rem" }}>
          Trending
        </h3>
        <div className="movies-list">
          {allMovies.length === 0 ? (
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            allMovies.map((movieObj) => {
              return (
                <div
                  className="card movie-card"
                  onMouseEnter={() => this.handleEnter(movieObj.id)}
                  onMouseLeave={this.handleLeave}
                  key={movieObj.id}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                    className="card-img-top movie-img"
                    alt="..."
                  />
                  <div className="">
                    <h5 className="card-title movie-title">
                      {movieObj.original_title}
                    </h5>
                    {/* <p className="card-text banner-text">{movie.overview}</p> */}
                    {this.state.hover === movieObj.id && (
                      <div className="button-wrapper">
                        <a href="/" className="btn btn-info movie-button">
                          Add to Favourites
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="/">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="/">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="/">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="/">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="/">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
