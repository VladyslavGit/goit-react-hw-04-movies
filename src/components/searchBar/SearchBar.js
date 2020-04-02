import React, { Component } from "react";
import style from "./searchBar.module.css";

class SearchBar extends Component {
  state = {
    inputValue: ""
  };

  handleChange = ({ target }) => {
    this.setState({ inputValue: target.value });
    this.props.onChange(target.value);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSearch(this.state.inputValue);
    this.setState({
      inputValue: ""
    });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            className={style.searchForm}
            type="text"
            value={inputValue}
            placeholder="Find your movie"
            onChange={this.handleChange}
          />
          <button type="submit" className={style.btnForm}>
            Search
          </button>
        </form>
      </>
    );
  }
}

export default SearchBar;
