import React, { Component } from "react";
import { movies } from "./getMovies";

export default class Banner extends Component {
  render() {
    let movie = movies.results;
    return (
        <>
      { movie.length === 0
        ? 
        (<div class="spinner-border text-info" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>)
        :
        (<div className="card banner-card">
        <img
          src={`https://image.tmdb.org/t/p/original${movie[0].backdrop_path}`}
          className="card-img-top banner-img"
          alt="..."
        />
        <div className="">
          <h5 className="card-title banner-title">{movie[0].original_title}</h5>
          <p className="card-text banner-text">{movie[0].overview}</p>
        </div>
      </div>)}
      </>
    );
  }
}
