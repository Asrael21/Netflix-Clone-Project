import { Bell, ChevronDown, Search, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/image/logo.png";
import styles from "./Header.module.css";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* ---- logo ---- */}
        <div className={styles.logo}>
          <Link to="/">
            <img src={logo} alt="Netflix Logo" />
          </Link>
        </div>

        {/* ---- nav-links ---- */}
        <nav className={styles.nav}>
          <NavLink
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
            to="/tv"
          >
            Tv Shows
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
            to="/movies"
          >
            Movies
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
            to="/news"
          >
            New & Popular
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
            to="/mylist"
          >
            My List
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
            to="/browse"
          >
            Browse by Languages
          </NavLink>
        </nav>

        {/* ---- search, notifications, profile ---- */}
        <div className={styles.actions}>
          {/* search */}
          <div className={styles.searchContainer}>
            <button
              className={styles.searchButton}
              onClick={() => setShowSearch((prev) => !prev)}
            >
              <Search size={20} />
            </button>
            {showSearch && (
              <input
                type="text"
                placeholder="Titles, people, genres"
                className={styles.searchInput}
                autoFocus
                onBlur={() => setShowSearch(false)}
              />
            )}
          </div>

          {/* notifications */}
          <button className={styles.notificationButton}>
            <Bell size={20} />
            <span className={styles.notificationCount}>4</span>
          </button>

          {/* profile */}
          <div className={styles.profileContainer}>
            <button
              className={styles.profileButton}
              onClick={() => setIsProfileOpen((prev) => !prev)}
            >
              <div className={styles.userIcon}>
                <User size={20} />
              </div>
              <ChevronDown size={20} />
            </button>
            {isProfileOpen && (
              <div className={styles.profileDropdown}>
                <Link to="#" className={styles.dropdownItem}>
                  Account
                </Link>
                <Link to="#" className={styles.dropdownItem}>
                  Help Center
                </Link>
                <hr className={styles.dropdownDivider} />
                <Link to="#" className={styles.dropdownItem}>
                  Sign Out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
