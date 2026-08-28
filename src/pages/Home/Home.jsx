<<<<<<< HEAD
import styles from "./Home.module.css";

const Home = () => (
  <div className={styles.page}>
    {/* <h1 className={styles.message}>This is Home page!</h1> */}
  </div>
);

export default Home;
=======
import Banner from "../../Components/Banner/Banner";
import DisplayRow from "../../Components/DisplayRow/DisplayRow";
import styles from "./Home.module.css";

const Home = () => (
  <div className={styles.page}>
    <Banner />
    <DisplayRow />
  </div>
);

export default Home;
>>>>>>> 3155ef4 (Update Netflix clone)
