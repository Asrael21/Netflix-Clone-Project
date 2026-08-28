import { Info, Play } from "lucide-react";
import { useEffect, useState } from "react";
import bannerLogo from "../../assets/image/logo.png";
import { movieInstance } from "../../Utility/MovieInstance";
import requests from "../../Utility/requestUrls";
import styles from "./Banner.module.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

function truncate(str, length) {
  if (!str) return "";
  return str.length > length ? `${str.slice(0, length)}...` : str;
}

export default function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchBannerMovie = async () => {
      try {
        const { data } = await movieInstance.get(
          requests.fetchNetflixOriginals,
        );
        const randomMovie =
          data.results[Math.floor(Math.random() * data.results.length)];
        setMovie(randomMovie);
      } catch (error) {
        console.log("Error fetching banner movie:", error);
      }
    };

    fetchBannerMovie();
  }, []);

  return (
    <div
      className={styles.banner}
      style={
        movie?.backdrop_path
          ? {
              backgroundImage: `url(${IMAGE_BASE}${movie.backdrop_path})`,
            }
          : undefined
      }
    >
      <div className={styles.content}>
        {/* Netflix logo */}
        <img className={styles.logoImg} src={bannerLogo} alt="Netflix Logo" />

        {/* title */}
        <h1 className={styles.title}>
          {movie?.title || movie?.name || "Bridgerton"}
        </h1>

        {/* description */}
        <p className={styles.description}>
          {truncate(movie?.overview, 150) ||
            "This is a description for the Netflix banner."}
        </p>

        {/* button */}
        <div className={styles.buttonContainer}>
          <button className={styles.button}>
            <Play size={30} /> Play
          </button>
          <button className={styles.button}>
            <Info size={30} /> My List
          </button>
        </div>
      </div>

      {/* fading effect */}
      <div className={styles.fadingEffect}></div>
    </div>
  );
}
