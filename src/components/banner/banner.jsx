import React, { useState, useEffect } from "react";
import styles from "./banner.module.css";
import { movieInstance } from "../../Utility/MovieInstance";
import requests from "../../Utility/requestUrls";

const BANNER_IMAGE_BASE = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchBannerMovie() {
      try {
        setLoading(true);
        // Call the Netflix Originals endpoint via the Axios instance
        const response = await movieInstance.get(requests.fetchNetflixOriginals);
        const results = response.data?.results || [];

        if (results.length > 0 && isMounted) {
          // Randomly select one item from the returned results array
          const randomIndex = Math.floor(Math.random() * results.length);
          // Store the selected item in component state
          setMovie(results[randomIndex]);
        }
      } catch (err) {
        console.error("Error fetching Netflix Originals for banner:", err);
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchBannerMovie();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <header
      className={styles.banner}
      style={{
        backgroundImage: movie?.backdrop_path
          ? `url("${BANNER_IMAGE_BASE}${movie.backdrop_path}")`
          : undefined,
      }}
    >
      <div className={styles.contents}>
        <h1 className={styles.title}>
          {movie?.title || movie?.name || movie?.original_name || "Featured Movie"}
        </h1>
      </div>
    </header>
  );
}

export default Banner;
