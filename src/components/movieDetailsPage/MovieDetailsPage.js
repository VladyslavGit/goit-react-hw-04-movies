import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import services from "../services";
import Cast from "../cast/Cast";
import Reviews from "../reviews/Reviews";
import styles from "./MovieDetailsPage.module.css";

class MovieDetailsPage extends Component {
  state = {
    movie: {},
    pathname: "",
    search: ""
  };

  componentDidMount() {
    services.getMovieDetails(this.props.location.state.id).then(({ data }) => {
      this.setState({ movie: data });
    });
    this.setState({
      pathname: this.props.location.state.from,
      search: this.props.location.state.search
    });
  }

  handleGoback = () => {
    const { pathname, search } = this.state;
    const { history, location } = this.props;
    if (location.state.from !== undefined) {
      return history.push({
        pathname,
        search
      });
    }
    return history.push("/");
  };

  render() {
    const { movie, movie: { genres = [] } = [] } = this.state;
    return (
      <>
        <div className={styles.buttonWrapper}>
          <button
            className={styles.btn}
            type="button"
            onClick={this.handleGoback}
          >
            Go back
          </button>
        </div>

        <div className={styles.movieWrapper}>
          <div className={styles.posterWrapper}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt="movie poster"
            />
          </div>

          <div className={styles.movieInfoWrapper}>
            <h2 className={styles.movieTitle}>{movie.title}</h2>
            <p className={styles.movieScore}>
              User score: {movie.vote_average * 10}%
            </p>
            <p className={styles.movieOverview}>Overview:</p>
            <p className={styles.movieOverviewText}>{movie.overview}</p>
            <p className={styles.movieGenres}>Genres:</p>
            <p>
              {genres.map(genre => (
                <span className={styles.movieGenresList} key={genre.id}>
                  {genre.name}{" "}
                </span>
              ))}
            </p>
          </div>
        </div>
        <div>
          <p className={styles.additionalInfo}>Additional information:</p>
          <ul className={styles.additionalInfoList}>
            <li>
              <Link
                to={{
                  pathname: `/movies/${movie.id}/cast`,
                  state: { id: movie.id }
                }}
              >
                <button className={styles.additionalBtn}>Cast</button>
              </Link>
            </li>
            <li>
              <Link
                to={{
                  pathname: `/movies/${movie.id}/reviews`,
                  state: { id: movie.id }
                }}
              >
                <button className={styles.additionalBtn}>Reviews</button>
              </Link>
            </li>
          </ul>
          <Route path={`/movies/${movie.id}/cast`} component={Cast} />
          <Route path={`/movies/${movie.id}/reviews`} component={Reviews} />
        </div>
      </>
    );
  }
}

export default MovieDetailsPage;
