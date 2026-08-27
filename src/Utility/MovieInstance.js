import axios from "axios";
const movieInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});
movieInstance.interceptors.request.use((config) => {
  config.params = { ...config.params, api_key: import.meta.env.VITE_API_KEY };
  return config;
});
export { movieInstance };
