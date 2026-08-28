import { Link } from "react-router-dom";
import styles from "./BrowseByLanguage.module.css";

const BrowseByLanguage = () => (
  <div className={styles.page}>
<<<<<<< HEAD
    {/* <h1 className={styles.message}>This is Browse by Language page!</h1> */}
=======
    <h1 className={styles.message}>This is Browse by Language page!</h1>
    <Link to="/home" className={styles.homeLink}>
      Back to Home
    </Link>
>>>>>>> 3155ef4 (Update Netflix clone)
  </div>
);

export default BrowseByLanguage;
