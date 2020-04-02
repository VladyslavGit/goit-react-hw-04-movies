import React, { Component } from "react";
import services from "../services";
import css from "./cast.module.css";

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
      <div className={css.castWrapper}>
        <ul className={css.castList}>
          {cast.map(cast => (
            <li className={css.castListItem} key={cast.cast_id}>
              <p>Character:</p>
              <p>{cast.character}</p>
              <img className={css.actorPhoto}
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
                    : "https://lh3.googleusercontent.com/proxy/dU7LkRtsQVaZ2PzcPnzMO63OYQ8wr9hoRQUBUyUHJVOxl_3judSWdChNR-Z3fycnyiqhU1ouixIlTl_VloK7viArt1IG6Yk"
                }
                alt={cast.name}
              />
              <p>Performed by:</p>
              <p>{cast.name}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Cast;
