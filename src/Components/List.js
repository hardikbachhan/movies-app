import axios from "axios";
import React, { Component } from "react";
import { movies } from "./getMovies";

export default class List extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
      movies: [],
      currPage: 1,
    };
    console.log("constructor method of list component called");
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

  

  componentDidUpdate = () => {
    console.log("componentDidUpdate method of list component called");
  };

  componentWillUnmount = () => {
    console.log("componentWillUnmount method of list component called");
  };

  async getUpdatedMovies() {
    console.log("getUpdatedMovies is called");
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=e3bb04c2aa022ca21c789d24f6400903&language=en-US&page=${this.state.currPage}`;
    // let res = await fetch(url);
    // let data = await res.json();
    // console.log(data);
    let data = await axios.get(url);
    // console.log(data.data);
    this.setState({
      movies: [...data.data.results],
    });
  }

  handlePrevPage = () => {
    if (this.state.currPage > 1) {
      this.setState({ currPage: this.state.currPage - 1 }, this.getUpdatedMovies);
    }
  };

  handleNextPage = () => {
    if (this.state.currPage < 21) {
      this.setState({ currPage: this.state.currPage + 1 }, this.getUpdatedMovies);
    }
  };

  render() {
    // let allMovies = movies.results;
    console.log("render method of list component called");
    return (
      <div>
        <h3 className="display-3 trending" style={{ marginTop: "1rem" }}>
          Trending
        </h3>
        <div className="movies-list">
          {this.state.movies.length === 0 ? (
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            this.state.movies.map((movieObj) => {
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
              <li className="page-item" onClick={this.handlePrevPage}>
                <a className="page-link">Previous</a>
              </li>
              <li className="page-item">
                <a className="page-link">{this.state.currPage}</a>
              </li>
              <li className="page-item" onClick={this.handleNextPage}>
                <a className="page-link">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
