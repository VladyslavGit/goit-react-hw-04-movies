import React, { Component } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import services from "../services";
import SearchBar from "../searchBar/SearchBar";
import styles from "./MoviesPage.module.css";

export default class MoviesPage extends Component {
  state = {
    movies: [],
    query: ""
  };

  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search).query;
    if (parsed) {
      if (parsed !== undefined) {
        services.getMoviesSearchBar(parsed).then(({ data }) => {
          this.setState({ movies: data.results });
        });
      }
    }
  }

  onChange = value => {
    this.setState({ query: value });
  };

  onSearch = query => {
    this.props.history.push({
      ...this.props.location,
      search: `query=${query}`
    });
    services.getMoviesSearchBar(query).then(({ data }) => {
      this.setState({ movies: data.results });
    });
  };

  render() {
    const { movies, query } = this.state;
    return (
      <div className={styles.moviesWrapper}>
        <SearchBar onSearch={this.onSearch} onChange={this.onChange} />
        <ul className={styles.resultList}>
          {movies.map(movie => (
            <li className={styles.resultListItem} key={movie.id}>
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: {
                    id: movie.id,
                    from: "/movies",
                    search: `query=${query}`
                  }
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
