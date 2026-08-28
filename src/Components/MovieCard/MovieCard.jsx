import styles from "./MovieCard.module.css";
import { FaCirclePlay } from "react-icons/fa6";
import { BsPlusCircle } from "react-icons/bs";
import { GoCheckCircleFill } from "react-icons/go";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const FALLBACK_IMG = "https://placehold.co/227x128/141414/808080?text=No+Image";

const GENRE_MAP = {
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
  80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family",
  14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music",
  9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 10770: "TV Movie",
  53: "Thriller", 10752: "War", 37: "Western",
};

function MovieCard({ movie }) {
  const title = movie?.title || movie?.name || "Untitled";
  const genres = movie?.genre_ids?.slice(0, 3).map((id) => GENRE_MAP[id]).filter(Boolean) || [];
  const score = movie?.vote_average ? `${Math.round(movie.vote_average * 10)}% Match` : null;
  const posterSrc = movie?.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : FALLBACK_IMG;

  return (
    <div className={styles.cardWrapper}>
      <img
        className={styles.poster}
        src={posterSrc}
        alt={title}
        onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
      />

      <div className={styles.hoverCard}>
        <img
          className={styles.hoverImage}
          src={posterSrc}
          alt={title}
          onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
        />

        <div className={styles.badge}>Recently added</div>

        <div className={styles.buttonsRow}>
          <FaCirclePlay className={styles.circleButton} color="white" size={30} />
          <BsPlusCircle className={styles.circleButton} color="white" size={30} />
          <GoCheckCircleFill className={styles.circleButton} color="white" size={30} />
          <IoIosArrowDropdownCircle className={styles.circleButtonSmall} color="white" size={30} />
        </div>

        <div className={styles.metaRow}>
          {score && <span className={styles.matchScore}>{score}</span>}
          <span className={styles.tag}>U/A 16+</span>
          <span className={styles.tag}>HD</span>
        </div>

        <p className={styles.title}>{title}</p>

        {genres.length > 0 && (
          <div className={styles.genres}>
            {genres.map((g, i) => (
              <span key={g}>
                {g}
                {i < genres.length - 1 && <span className={styles.dot}>•</span>}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
