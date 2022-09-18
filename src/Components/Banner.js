import React, { Component } from "react";
import { movies } from "./getMovies";
import axios from "axios";

export default class Banner extends Component {

    constructor() {
        super();
        this.state = {
          movies: [],
        };
        console.log("constructor method of banner component called");
      }

      async componentDidMount() {
        const url = "https://api.themoviedb.org/3/movie/popular?api_key=e3bb04c2aa022ca21c789d24f6400903&language=en-US&page=1"
        // let res = await fetch(url);
        // let data = await res.json();
        // console.log(data);
        let data = await axios.get(url);
        // console.log(data.data);
        this.setState({
            movies: [...data.data.results],
        })
        console.log("componentDidMount method of list component called");
      }

  render() {
    // let movie = movies.results;
    return (
        <>
      { this.state.movies.length === 0
        ? 
        (<div class="spinner-border text-info" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>)
        :
        (<div className="card banner-card">
        <img
          src={`https://image.tmdb.org/t/p/original${this.state.movies[0].backdrop_path}`}
          className="card-img-top banner-img"
          alt="..."
        />
        <div className="">
          <h5 className="card-title banner-title">{this.state.movies[0].original_title}</h5>
          <p className="card-text banner-text">{this.state.movies[0].overview}</p>
        </div>
      </div>)}
      </>
    );
  }
}
