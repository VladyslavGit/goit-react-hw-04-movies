import React, { Component } from "react";
import services from "../services";
import styles from "./cast.module.css";

class Cast extends Component {
  state = { cast: [] };

  componentDidMount() {
    const id = this.props.location.state.id;
    services.getMovieCast(id).then(({ data }) => {
      this.setState({ cast: data.cast });
    });
  }

  render() {
    const { cast } = this.state;
    return (
      <ul className={styles.castList}>
        {cast.map(cast => (
          <li className={styles.castListItem} key={cast.cast_id}>
            <p className={styles.parCast}>Character:</p>
            <p className={styles.parCastName}>{cast.character}</p>
            <img
              className={styles.actorPhoto}
              src={
                cast.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
                  : "https://www.trippywords.com/public/blog_img/no_img.jpg"
              }
              alt={cast.name}
            />
            <p className={styles.parCast}>Performed by:</p>
            <p className={styles.parCastName}>{cast.name}</p>
          </li>
        ))}
      </ul>
    );
  }
}

export default Cast;
