import React, { useState, useEffect } from "react";
import { Play, Plus } from "lucide-react";
import styles from "./banner.module.css";
import { movieInstance } from "../../Utility/MovieInstance";
import requests from "../../Utility/requestUrls";
import fallbackBanner from "../../assets/image/banner.jpeg";

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

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const bannerBackground = movie?.backdrop_path
    ? `url("${BANNER_IMAGE_BASE}${movie.backdrop_path}")`
    : `url("${fallbackBanner}")`;

  return (
    <header
      className={styles.banner}
      style={{
        backgroundImage: bannerBackground,
      }}
    >
      <div className={styles.contents}>
        {/* Title */}
        <h1 className={styles.title}>
          {movie?.title || movie?.name || movie?.original_name || "Featured Movie"}
        </h1>

        {/* Action Buttons */}
        <div className={styles.buttonContainer}>
          <button className={`${styles.button} ${styles.playButton}`}>
            <Play size={20} fill="currentColor" />
            <span>Play</span>
          </button>
          <button className={`${styles.button} ${styles.listButton}`}>
            <Plus size={20} />
            <span>My List</span>
          </button>
        </div>

        {/* Truncated Description */}
        <p className={styles.description}>
          {truncate(movie?.overview, 150) || "No description available for this title."}
        </p>
      </div>

      {/* Bottom Gradient Fade */}
      <div className={styles.fadeBottom} />
    </header>
  );
}

export default Banner;
