import React, { Component } from "react";
import axios from "axios";

export default class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
    };
  }

  async componentDidMount() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=e3bb04c2aa022ca21c789d24f6400903&language=en-US&page=1`;
    // let res = await fetch(url);
    // let data = await res.json();
    // console.log(data);
    let data = await axios.get(url);
    // console.log(data.data.results);
    this.setState({
      movies: [...data.data.results],
    });
    console.log("componentDidMount method of favourites component called");
  }

  render() {
    let genreId = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };

    return (
      <React.Fragment>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Popularity</th>
              <th scope="col">Rating</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.length > 0 &&
              this.state.movies.map((movieObj) => {
                return (
                  <tr key={movieObj.id}>
                    <td scope="row">
                      <img
                        src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                        alt="movie_img"
                        style={{ width: "4rem", height: "3rem" }}
                      />
                      {movieObj.original_title}
                    </td>
                    <td>{genreId[movieObj.genre_ids[0]]}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{movieObj.vote_average}</td>
                    <td>
                      <button type="button" class="btn btn-outline-danger">
                        Danger
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
