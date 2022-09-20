import React, { Component } from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default class Banner extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
    };
    console.log("constructor method of banner component called");
  }

  async componentDidMount() {
    const url =
      "https://api.themoviedb.org/3/movie/popular?api_key=e3bb04c2aa022ca21c789d24f6400903&language=en-US&page=1";
    // let res = await fetch(url);
    // let data = await res.json();
    // console.log(data);
    let data = await axios.get(url);
    console.log(data.data);
    this.setState({
      movies: [...data.data.results],
    });
    console.log("componentDidMount method of list component called");
  }

  render() {
    // let movie = movies.results;
    return (
      <>
        {this.state.movies.length === 0 ? (
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <Carousel
            autoPlay={true}
            emulateTouch={true}
            infiniteLoop={true}
            showThumbs={false}
            dynamicHeight={false}
            stopOnHover={false}
          >
            {this.state.movies.slice(0, 8).map((movieObj) => {
              return (
                <div style={{height: "90vh"}}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                    alt="movie-img"
                  /> 
                  <p className="legend">{movieObj.original_title}<br/>{movieObj.overview}</p>
                </div>
              );
            })}
          </Carousel>
        )}
      </>
    );
  }
}
