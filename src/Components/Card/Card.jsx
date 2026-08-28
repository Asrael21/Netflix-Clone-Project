import { BsCheckLg, BsPlusCircle } from "react-icons/bs";
import { FaCirclePlay } from "react-icons/fa6";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import styles from "./Card.module.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function Card({ movie }) {
  let genres = ["Sci-Fi", "Thriller", "Action"];

  return (
    <div className={styles.card}>
      {/* poster image */}
      <div className={styles.posterWrap}>
        <img
          className={styles.cardImage}
          src={`${IMAGE_BASE}${movie?.poster_path}`}
          alt="Card Image"
        />
      </div>

      {/* hover effect */}
      <div className={styles.hoverEffect}>
        {/* image for hover effect */}
        <img
          className={styles.hoverImage}
          src={`${IMAGE_BASE}${movie?.poster_path}`}
          alt="Hover Image"
        />

        <div className={styles.hoverContent}>
          {/* badge for hover effect */}
          <div className={styles.hoverBadge}>Recently added</div>

          {/* buttons */}
          <div className={styles.buttonsRow}>
            <FaCirclePlay
              className={`${styles.hoverButton} ${styles.circleButton}`}
            />
            <BsPlusCircle
              className={`${styles.hoverButton} ${styles.addButton}`}
            />
            <BsCheckLg
              className={`${styles.hoverButton} ${styles.circleButton}`}
            />
            <IoIosArrowDropdownCircle
              className={`${styles.hoverButton} ${styles.dropdownButton}`}
            />
          </div>

          {/* metadata */}
          <div className={styles.hoverMetadata}>
            <span className={styles.tag}>U/A 16+ </span>
            <span className={styles.tag}>Movies</span>
            <span className={styles.tag}>HD</span>
          </div>
        </div>

        {/* movies genres */}
        <div className={styles.hoverGenres}>
          {genres.map((genre, index) => (
            <span key={index}>
              {genre}
              {index < genres.length - 1 && (
                <span className={styles.dot}>•</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
