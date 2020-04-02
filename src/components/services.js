import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const API_KEY = "3a3e03f02658227a78e4ffaaf3fc166a";

const params = {
  api_key: API_KEY
};

export default {
  async getTrending() {
    try {
      const data = await axios.get("trending/all/day", { params });
      return data;
    } catch (error) {
      console.log("error", error);
      throw new Error(error);
    }
  },
  async getMovieDetails(id) {
    try {
      const data = await axios.get(`movie/${id}`, { params });
      return data;
    } catch (error) {
      console.log("error", error);
      throw new Error(error);
    }
  },
  async getMovieCast(movieId) {
    try {
      const data = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
      );
      return data;
    } catch (error) {
      console.log("error", error);
      throw new Error(error);
    }
  },
  async getMovieReviews(movieId) {
    try {
      const data = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`
      );
      return data;
    } catch (error) {
      console.log("error", error);
      throw new Error(error);
    }
  },
  async getMoviesSearchBar(query) {
    const data = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
    );
    return data;
  }
};
