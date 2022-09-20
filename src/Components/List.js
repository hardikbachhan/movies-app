import axios from "axios";
import React, { Component } from "react";

export default class List extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
      movies: [],
      currPage: 1,
      favMovies: [],
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

  componentDidMount = () => {
    console.log("componentDidMount method of list component called");
    this.getUpdatedMovies();
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
      this.setState(
        { currPage: this.state.currPage - 1 },
        this.getUpdatedMovies
      );
    }
  };

  handleNextPage = () => {
    if (this.state.currPage < 21) {
      this.setState(
        { currPage: this.state.currPage + 1 },
        this.getUpdatedMovies
      );
    }
  };

  handleFavourites = (movieObj) => {
    console.log(movieObj);
    // if id already present -> then remove
    // if (this.state.favMovies.includes())
    // else -> add
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
                        <button
                          className="btn btn-info movie-button"
                          onClick={() => this.handleFavourites(movieObj)}
                        >
                          Add to Favourites
                        </button>
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
                <button className="page-link">Previous</button>
              </li>
              <li className="page-item">
                <button className="page-link">{this.state.currPage}</button>
              </li>
              <li className="page-item" onClick={this.handleNextPage}>
                <button className="page-link">Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
