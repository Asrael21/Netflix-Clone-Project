import { Link } from "react-router-dom";
import DisplayRow from "../../Components/DisplayRow/DisplayRow";
import styles from "./MyList.module.css";

const MyList = () => (
  <div className={styles.page}>
    <DisplayRow showTopRatedOnly />
    <Link to="/home" className={styles.homeLink}>
      Back to Home
    </Link>
  </div>
);

export default MyList;
