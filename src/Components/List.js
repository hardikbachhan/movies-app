import React, { Component } from "react";
import { movies } from "./getMovies";

export default class List extends Component {
  render() {
    let allMovies = movies.results;
    return (
      <div>
        <h3 className="display-3 trending" style={{marginTop: "1rem"}}>Trending</h3>
        <div className="movies-list">
          {allMovies.map((movieObj) => {
            return (
              <div className="card movie-card">
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
                  <div className="button-wrapper">
                    <a href="/" class="btn btn-info movie-button">
                      Add to Favourites
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}