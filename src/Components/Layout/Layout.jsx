import { Outlet } from "react-router-dom";
import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <Banner />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
