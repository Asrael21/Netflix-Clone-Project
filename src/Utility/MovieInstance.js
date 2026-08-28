import axios from "axios";

const movieInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export { movieInstance };

// https://api.themoviedb.org/3/discover/movie?api_key=b33da15fb726a97ac2874d63f7df0e4f&with_genres=99
