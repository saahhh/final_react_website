import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel, Pagination } from "react-bootstrap";

const Movie = () => {
  const [movies, setMovies] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(5);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexFirstMovie, indexOfLastMovie);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    axios
      .get("https://yts.mx/api/v2/list_movies.json")
      .then((response) => {
        const movieData = response.data.data.movies.map((movie) => ({
          id: movie.id,
          title: movie.title,
          rating: movie.rating,
          poster: movie.medium_cover_image,
        }));
        setMovies(movieData);
      })
      .catch((error) => {
        console.log("데이터없음", error);
      });
  }, []);
  return (
    <div>
      {currentMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
      <Pagination>
        {[...Array(Math.ceil(movies.length / moviesPerPage)).keys()].map(
          (number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 == currentPage}
              onClick={() => handlePageChange(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>
    </div>
  );
};

const MovieCarousel = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("https://yts.mx/api/v2/list_movies.json")
      .then((response) => {
        const movieData = response.data.data.movies.map((movie) => ({
          id: movie.id,
          title: movie.title,
          rating: movie.rating,
          poster: movie.medium_cover_image,
        }));
        setMovies(movieData);
      })
      .catch((error) => {
        console.log(`데이터 없음`, error);
      });
  }, []);
  return (
    <div>
      <Carousel>
        {movies.map((movie) => (
          <Carousel.Item key={movie.id}>
            <MovieCard movie={movie} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

// export default Movie;

const MovieCard = ({ movie }) => (
  <div>
    {movie.poster && <img src={movie.poster} />}
    <h4>{movie.title}</h4>
    <p>평점 : {movie.rating}</p>
  </div>
);

export default MovieCarousel;
