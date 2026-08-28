<<<<<<< HEAD
import { Bell, ChevronDown, Menu, Search, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/image/logo.png";
import styles from "./Header.module.css";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/tv", label: "TV Shows" },
  { to: "/movies", label: "Movies" },
  { to: "/news", label: "New & Popular" },
  { to: "/mylist", label: "My List" },
  { to: "/browse", label: "Browse by Languages" },
];

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link to="/">
            <img src={logo} alt="Netflix Logo" />
          </Link>
        </div>

        {/* Desktop / tablet nav */}
        <nav className={styles.nav}>
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
              to={to}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
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

          <button className={`${styles.notificationButton} ${styles.desktopOnly}`}>
            <Bell size={20} />
            <span className={styles.notificationCount}>4</span>
          </button>

          <div className={`${styles.profileContainer} ${styles.desktopOnly}`}>
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
                <Link to="#" className={styles.dropdownItem}>Account</Link>
                <Link to="#" className={styles.dropdownItem}>Help Center</Link>
                <hr className={styles.dropdownDivider} />
                <Link to="#" className={styles.dropdownItem}>Sign Out</Link>
              </div>
            )}
          </div>

          {/* Hamburger — mobile only */}
          <button
            className={styles.hamburger}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {isMobileMenuOpen && (
        <nav className={styles.mobileMenu}>
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              className={({ isActive }) =>
                `${styles.mobileNavLink} ${isActive ? styles.mobileActive : ""}`
              }
              to={to}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
=======
import { Bell, ChevronDown, Search, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/image/logo.png";
import styles from "./Header.module.css";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const profileRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
            to="/home"
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

        {/*  ----search, notifications, profile ---- */}
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
          <div className={styles.profileContainer} ref={profileRef}>
            <button
              className={styles.profileButton}
              onClick={() => setIsProfileOpen((prev) => !prev)}
            >
              {/* user icon */}
              <div className={styles.userIcon}>
                <User size={20} />
              </div>
              {/* dropdown */}
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
>>>>>>> 3155ef4 (Update Netflix clone)
