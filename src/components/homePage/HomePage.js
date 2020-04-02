import React, { Component } from "react";
import { Link } from "react-router-dom";
import services from "../services";
import css from "./HomePage.module.css";

class HomePage extends Component {
  state = {
    movies: []
  };

  componentDidMount() {
    services
      .getTrending()
      .then(data => this.setState({ movies: data.data.results }));
  }

  render() {
    return (
      <div className={css.homePageWrapper}>
        <h2 className={css.trendingHeader}>Trending today</h2>
        <ul className={css.trendingList}>
          {this.state.movies.map(movie => (
            <li className={css.trendingListItem} key={movie.id}>
              <Link
                to={{
                  pathname: `movies/${movie.id}`,
                  state: { id: movie.id }
                }}
              >
                {movie.title || movie.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default HomePage;
