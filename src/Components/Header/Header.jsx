import {
  Bell,
  ChevronDown,
  LogIn,
  LogOut,
  Menu,
  Search,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/image/logo.png";
import { useAuth } from "../../context/useAuth";
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
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    logout();
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link to="/">
            <img src={logo} alt="Netflix Logo" />
          </Link>
        </div>

        <nav className={styles.nav} aria-label="Main Navigation">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
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
              aria-label="Search"
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

          <button
            className={`${styles.notificationButton} ${styles.desktopOnly}`}
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className={styles.notificationCount}>4</span>
          </button>

          {isLoggedIn ? (
            <div className={`${styles.profileContainer} ${styles.desktopOnly}`}>
              <button
                className={styles.profileButton}
                onClick={() => setIsProfileOpen((prev) => !prev)}
                aria-label="Account Menu"
              >
                <div className={styles.userIcon}>
                  {user?.name ? (
                    user.name.charAt(0).toUpperCase()
                  ) : (
                    <User size={20} />
                  )}
                </div>
                <ChevronDown size={20} />
              </button>
              {isProfileOpen && (
                <div className={styles.profileDropdown}>
                  <div className={styles.profileUserHeader}>
                    <span className={styles.userName}>
                      {user?.name || "Viewer"}
                    </span>
                    <span className={styles.userEmail}>{user?.email}</span>
                  </div>
                  <hr className={styles.dropdownDivider} />
                  <Link to="#" className={styles.dropdownItem}>
                    Account
                  </Link>
                  <Link to="#" className={styles.dropdownItem}>
                    Help Center
                  </Link>
                  <hr className={styles.dropdownDivider} />
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className={`${styles.dropdownItem} ${styles.signOutButton}`}
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className={`${styles.headerSignInBtn} ${styles.desktopOnly}`}
            >
              Sign In
            </Link>
          )}

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
          <div className={styles.mobileAuthRow}>
            {isLoggedIn ? (
              <button
                type="button"
                className={`${styles.mobileNavLink} ${styles.mobileSignOut}`}
                onClick={handleSignOut}
              >
                <LogOut size={18} />
                <span>Sign Out ({user?.name || "Viewer"})</span>
              </button>
            ) : (
              <Link
                to="/login"
                className={`${styles.mobileNavLink} ${styles.mobileSignIn}`}
              >
                <LogIn size={18} />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

