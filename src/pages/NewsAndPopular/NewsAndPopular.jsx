import { Link } from "react-router-dom";
import styles from "./NewsAndPopular.module.css";

// const NewsAndPopular = () => (
//   <div className={styles.page}>
//     <h1 className={styles.message}>This is News and Popular page!</h1>
//     <Link to="/home" className={styles.homeLink}>
//       Back to Home
//     </Link>
//   </div>
// );

// export default NewsAndPopular;

import DisplayRow from "../../Components/DisplayRow/DisplayRow";

const NewsAndPopular = () => (
  <div className={styles.page}>
    <DisplayRow showPopularOnly />
    <Link to="/home" className={styles.homeLink}>
      Back to Home
    </Link>
  </div>
);

export default NewsAndPopular;
