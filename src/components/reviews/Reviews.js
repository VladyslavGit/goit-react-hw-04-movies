import React, { Component } from "react";
import services from "../services";

class Reviews extends Component {
  state = { reviews: [] };

  componentDidMount() {
    const id = this.props.location.state.id;
    services.getMovieReviews(id).then(({ data }) => {
      this.setState({ reviews: data.results });
    });
  }

  render() {
    const { reviews } = this.state;
    return (
      <div>
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <p>Author: {review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Reviews;
