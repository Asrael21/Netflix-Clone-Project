import { ExternalLink, X } from "lucide-react";
import { useEffect } from "react";
import { usePlayer } from "../../context/usePlayer";
import styles from "./VideoModal.module.css";

const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export default function VideoModal() {
  const { isOpen, movie, videoKey, videoDetails, loading, error, closePlayer } =
    usePlayer();

  // Close on Escape key and lock body scroll while modal is active
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closePlayer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, closePlayer]);

  if (!isOpen || !movie) return null;

  const title =
    movie.title ||
    movie.name ||
    movie.original_title ||
    movie.original_name ||
    "Movie Trailer";

  const score = movie.vote_average
    ? `${Math.round(movie.vote_average * 10)}% Match`
    : null;

  const releaseYear = (movie.release_date || movie.first_air_date || "").slice(
    0,
    4,
  );

  const genres =
    movie.genres?.map((g) => g.name) ||
    movie.genre_ids?.map((id) => GENRE_MAP[id]).filter(Boolean) ||
    [];

  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${title} official trailer`,
  )}`;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : undefined;

  return (
    <div
      className={styles.overlay}
      onClick={closePlayer}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} Video Player`}
    >
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className={styles.closeButton}
          onClick={closePlayer}
          aria-label="Close trailer"
          type="button"
        >
          <X size={20} />
        </button>

        {/* Video Player / Loader / Fallback Area */}
        <div className={styles.playerWrapper}>
          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner} />
              <p className={styles.loadingText}>Fetching video for &ldquo;{title}&rdquo;...</p>
            </div>
          ) : videoKey ? (
            <iframe
              className={styles.iframe}
              src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&enablejsapi=1`}
              title={`${title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div
              className={styles.errorState}
              style={
                backdropUrl ? { backgroundImage: `url(${backdropUrl})` } : undefined
              }
            >
              <div className={styles.errorOverlay}>
                <h3 className={styles.errorTitle}>Trailer Unavailable</h3>
                <p className={styles.errorMessage}>
                  {error ||
                    "An official video trailer could not be found directly from TMDB for this title."}
                </p>
                <a
                  href={youtubeSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.youtubeLinkButton}
                >
                  <ExternalLink size={16} /> Search &amp; Watch on YouTube
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Movie Details Section */}
        <div className={styles.detailsSection}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>{title}</h2>
          </div>

          <div className={styles.metaRow}>
            {score && <span className={styles.matchScore}>{score}</span>}
            {releaseYear && <span className={styles.year}>{releaseYear}</span>}
            <span className={styles.badge}>U/A 16+</span>
            <span className={styles.badge}>HD</span>
            {videoDetails?.type && (
              <span className={`${styles.badge} ${styles.trailerBadge}`}>
                {videoDetails.type}
              </span>
            )}
          </div>

          {genres.length > 0 && (
            <div className={styles.genres}>
              {genres.map((genre) => (
                <span key={genre} className={styles.genreTag}>
                  {genre}
                </span>
              ))}
            </div>
          )}

          {movie.overview && (
            <p className={styles.overview}>{movie.overview}</p>
          )}

          <div className={styles.actionsRow}>
            <a
              href={youtubeSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionBtn}
            >
              <ExternalLink size={16} /> Open in YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
