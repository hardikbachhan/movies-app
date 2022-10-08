import React, { Component } from "react";

export default class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genre: [],
      currGenre: "All Genre",
      currText: "",
      limit: 5,
      currPage: 1,
    };
  }

  async componentDidMount() {
    // const url = `https://api.themoviedb.org/3/movie/popular?api_key=e3bb04c2aa022ca21c789d24f6400903&language=en-US&page=1`;
    // let res = await fetch(url);
    // let data = await res.json();
    // console.log(data);
    // let data = await axios.get(url);
    let data = JSON.parse(localStorage.getItem("movies"));
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
    data.map((movieObj) => {
      if (!allGenre.includes(genreId[movieObj.genre_ids[0]])) {
        allGenre.push(genreId[movieObj.genre_ids[0]]);
      }
      return undefined;
    });

    allGenre.unshift("All Genre");
    // console.log(allGenre);

    this.setState({
      movies: [...data],
      genre: [...allGenre],
    });

    console.log("componentDidMount method of favourites component called");
  }

  handleGenre = (e) => {
    let genre = e.target.innerText;
    // function movies ko filter kar ke le aayega
    this.setState({
        currGenre: genre,
    })
  }

  handleText = (e) => {
    this.setState({
        currText: e.target.value,
    })
  }

  sortPopularityAsc = () => {
    let allMovies = this.state.movies;
    allMovies.sort((objA, objB) => {
        return objA.popularity - objB.popularity;
    })
    this.setState({
        movies: [...allMovies],
    })
  }

  sortPopularityDsc = () => {
    let allMovies = this.state.movies;
    allMovies.sort((objA, objB) => {
        return objB.popularity - objA.popularity;
    })
    this.setState({
        movies: [...allMovies],
    })
  }

  sortRatingAsc = () => {
    let allMovies = this.state.movies;
    allMovies.sort((objA, objB) => {
        return objA.vote_average - objB.vote_average;
    })
    this.setState({
        movies: [...allMovies],
    })
  }

  sortRatingDsc = () => {
    let allMovies = this.state.movies;
    allMovies.sort((objA, objB) => {
        return objB.vote_average - objA.vote_average;
    })
    this.setState({
        movies: [...allMovies],
    })
  }

  handleDelete = (id) => {
    let newMovies = this.state.movies.filter(movieObj => movieObj.id !== id);
    this.setState({
        movies: [...newMovies],
    });
    localStorage.setItem("movies", JSON.stringify(newMovies));
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

    let filteredMovies = this.state.movies;

    if (this.state.currText !== "") {
    //     filteredMovies = this.state.movies;
    // } else {
        filteredMovies = filteredMovies.filter(movieObj => {
            let movieName = movieObj.original_title.toLowerCase();
            return movieName.includes(this.state.currText.toLowerCase());
        })
    }

    if (this.state.currGenre !== "All Genre") {
        filteredMovies = filteredMovies.filter(movieObj => genreId[movieObj.genre_ids[0]] === this.state.currGenre);
    // } else {
        // filteredMovies = this.state.movies;
    }

    let numOfPages = Math.ceil(filteredMovies.length / this.state.limit);
    let pagesArr = [];
    for(let i = 1; i <= numOfPages; i++) {
        pagesArr.push(i);
    }
    let si = (this.state.currPage - 1) * this.state.limit;
    let ei = si + this.state.limit;
    filteredMovies = filteredMovies.slice(si, ei);

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
            <input className="col-8 mx-2" type="text" placeholder="Search" value={this.state.currText} onChange={this.handleText} />
            <input
              className="col-3"
              type="number"
              placeholder="Results per page"
              value={this.state.limit}
              onChange={(e) => Number(e.target.value) > 1 && this.setState({limit: Number(e.target.value)})}
            />
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">
                    <i class="fa-solid fa-sort-up" onClick={this.sortPopularityAsc}/>
                        Popularity
                    <i class="fa-solid fa-sort-down" onClick={this.sortPopularityDsc}/>
                </th>
                <th scope="col">
                    <i class="fa-solid fa-sort-up" onClick={this.sortRatingAsc}/>
                        Rating
                    <i class="fa-solid fa-sort-down" onClick={this.sortRatingDsc}/>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.length > 0 &&
                filteredMovies.map((movieObj) => {
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
                          onClick={() => this.handleDelete(movieObj.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pagesArr.map(pageNum => {
                    return (
                        <li className="page-item" onClick={() => this.setState({currPage: pageNum})}>
                            <button className="page-link">{pageNum}</button>
                        </li>
                    )
                })}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
