import React, { Component } from "react";
import axios from "axios";

export default class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genre: [],
      currGenre: "All Genre",
    };
  }

  async componentDidMount() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=e3bb04c2aa022ca21c789d24f6400903&language=en-US&page=1`;
    // let res = await fetch(url);
    // let data = await res.json();
    // console.log(data);
    let data = await axios.get(url);
    // console.log(data.data.results);

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

    let allGenre = [];
    data.data.results.map((movieObj) => {
      if (!allGenre.includes(genreId[movieObj.genre_ids[0]])) {
        allGenre.push(genreId[movieObj.genre_ids[0]]);
      }
      return undefined;
    });

    allGenre.unshift("All Genre");
    // console.log(allGenre);

    this.setState({
      movies: [...data.data.results],
      genre: [...allGenre],
    });

    console.log("componentDidMount method of favourites component called");
  }

  handleGenre = (e) => {
    let genre = e.target.innerText;
    this.setState({
        currGenre: genre,
    })
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
      <div className="row">
        <div className="col-3 p-5">
          <div className="list-group">
            {this.state.genre.map((genre) => {
              return (
                <button
                  className={`list-group-item list-group-item-action ${
                    genre === this.state.currGenre && "active"
                  }`}
                  aria-current="true"
                  onClick={this.handleGenre}
                >
                  {genre}
                </button>
              );
            })}
          </div>
        </div>
        <div className="col p-5">
          <div className="row mb-3">
            <input className="col-8 mx-2" type="text" placeholder="Search" />
            <input
              className="col-3"
              type="number"
              placeholder="Results per page"
            />
          </div>
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
                      <td>
                        <img
                          src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                          alt="movie_img"
                          style={{ width: "4rem", height: "3rem" }}
                          className="me-2"
                        />
                        {movieObj.original_title}
                      </td>
                      <td>{genreId[movieObj.genre_ids[0]]}</td>
                      <td>{movieObj.popularity}</td>
                      <td>{movieObj.vote_average}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
