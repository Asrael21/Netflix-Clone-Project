import {
  AlertCircle,
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  Globe,
  Lock,
  Mail,
  Sparkles,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginBg from "../../assets/image/login.jpg";
import logo from "../../assets/image/logo.png";
import { useAuth } from "../../context/useAuth";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, isLoggedIn, user, logout } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showRecaptchaInfo, setShowRecaptchaInfo] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (isSignUp && !formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter a valid email or phone number.";
    } else if (
      formData.email.includes("@") &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password =
        "Your password must contain between 6 and 60 characters.";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Your password must contain between 6 and 60 characters.";
    }

    if (isSignUp) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password.";
      } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusMessage("");

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    // Simulate realistic network authentication delay
    setTimeout(() => {
      try {
        if (isSignUp) {
          signup(formData.name, formData.email, formData.password);
          setStatusMessage("Account created successfully!");
        } else {
          login(formData.email, formData.password, formData.rememberMe);
          setStatusMessage("Signed in successfully!");
        }

        setIsLoading(false);
        const from = location.state?.from?.pathname || "/home";
        navigate(from, { replace: true });
      } catch {
        setIsLoading(false);
        setErrors({ general: "Authentication failed. Please try again." });
      }
    }, 700);
  };

  const handleQuickDemoFill = () => {
    setIsSignUp(false);
    setFormData({
      name: "Demo Fan",
      email: "netflix_viewer@example.com",
      password: "netflixpassword123",
      confirmPassword: "netflixpassword123",
      rememberMe: true,
    });
    setErrors({});
  };

  const toggleAuthMode = () => {
    setIsSignUp((prev) => !prev);
    setErrors({});
    setStatusMessage("");
  };

  return (
    <div
      className={styles.loginWrapper}
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className={styles.overlay} />

      {/* Top Navigation */}
      <header className={styles.loginHeader}>
        <Link to="/home" className={styles.logoLink} aria-label="Netflix Home">
          <img src={logo} alt="Netflix Logo" className={styles.logo} />
        </Link>

        <div className={styles.headerRight}>
          <Link to="/home" className={styles.browseButton}>
            <ArrowLeft size={16} />
            <span>Browse Catalog</span>
          </Link>
        </div>
      </header>

      {/* Center Login Card */}
      <main className={styles.mainContent}>
        <div className={styles.loginCard}>
          {isLoggedIn ? (
            <div className={styles.alreadyLoggedIn}>
              <h2>You're already signed in</h2>
              <p className={styles.loggedInUser}>
                Signed in as <strong>{user?.name || user?.email}</strong>
              </p>
              <div className={styles.alreadyLoggedInActions}>
                <Link to="/home" className={styles.submitBtn}>
                  Continue Watching
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className={styles.secondaryBtn}
                >
                  Sign Out of this Account
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.cardHeader}>
                <h1 className={styles.title}>
                  {isSignUp ? "Sign Up" : "Sign In"}
                </h1>
                <button
                  type="button"
                  onClick={handleQuickDemoFill}
                  className={styles.quickDemoBadge}
                  title="Auto-fill test credentials"
                >
                  <Sparkles size={14} />
                  <span>Quick Demo Fill</span>
                </button>
              </div>

              {errors.general && (
                <div className={styles.generalAlert}>
                  <AlertCircle size={18} />
                  <span>{errors.general}</span>
                </div>
              )}

              {statusMessage && (
                <div className={styles.successAlert}>
                  <Check size={18} />
                  <span>{statusMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                {/* Name field for Sign Up */}
                {isSignUp && (
                  <div className={styles.inputGroup}>
                    <div
                      className={`${styles.inputContainer} ${
                        errors.name ? styles.inputError : ""
                      }`}
                    >
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder=" "
                        autoComplete="name"
                        className={styles.inputField}
                      />
                      <label htmlFor="name" className={styles.floatingLabel}>
                        Full Name
                      </label>
                      <User size={18} className={styles.inputIcon} />
                    </div>
                    {errors.name && (
                      <p className={styles.errorMessage}>{errors.name}</p>
                    )}
                  </div>
                )}

                {/* Email / Phone */}
                <div className={styles.inputGroup}>
                  <div
                    className={`${styles.inputContainer} ${
                      errors.email ? styles.inputError : ""
                    }`}
                  >
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder=" "
                      autoComplete="username"
                      className={styles.inputField}
                    />
                    <label htmlFor="email" className={styles.floatingLabel}>
                      Email or mobile number
                    </label>
                    <Mail size={18} className={styles.inputIcon} />
                  </div>
                  {errors.email && (
                    <p className={styles.errorMessage}>{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className={styles.inputGroup}>
                  <div
                    className={`${styles.inputContainer} ${
                      errors.password ? styles.inputError : ""
                    }`}
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder=" "
                      autoComplete={
                        isSignUp ? "new-password" : "current-password"
                      }
                      className={styles.inputField}
                    />
                    <label htmlFor="password" className={styles.floatingLabel}>
                      Password
                    </label>
                    <div className={styles.rightIcons}>
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className={styles.togglePasswordBtn}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                      <Lock size={18} className={styles.inputIcon} />
                    </div>
                  </div>
                  {errors.password && (
                    <p className={styles.errorMessage}>{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password for Sign Up */}
                {isSignUp && (
                  <div className={styles.inputGroup}>
                    <div
                      className={`${styles.inputContainer} ${
                        errors.confirmPassword ? styles.inputError : ""
                      }`}
                    >
                      <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder=" "
                        autoComplete="new-password"
                        className={styles.inputField}
                      />
                      <label
                        htmlFor="confirmPassword"
                        className={styles.floatingLabel}
                      >
                        Confirm Password
                      </label>
                      <Lock size={18} className={styles.inputIcon} />
                    </div>
                    {errors.confirmPassword && (
                      <p className={styles.errorMessage}>
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`${styles.submitBtn} ${
                    isLoading ? styles.loading : ""
                  }`}
                >
                  {isLoading ? (
                    <span className={styles.spinner} />
                  ) : isSignUp ? (
                    "Sign Up"
                  ) : (
                    "Sign In"
                  )}
                </button>

                {/* Remember Me & Help */}
                <div className={styles.formOptions}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className={styles.checkbox}
                    />
                    <span>Remember me</span>
                  </label>
                  <a
                    href="#help"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(
                        "Demo notice: To reset credentials, use the Quick Demo Fill button at the top of the card.",
                      );
                    }}
                    className={styles.helpLink}
                  >
                    Need help?
                  </a>
                </div>
              </form>

              {/* Toggle Sign In / Sign Up */}
              <div className={styles.toggleModeSection}>
                <p className={styles.toggleText}>
                  {isSignUp
                    ? "Already have an account?"
                    : "New to Netflix?"}{" "}
                  <button
                    type="button"
                    onClick={toggleAuthMode}
                    className={styles.toggleBtn}
                  >
                    {isSignUp ? "Sign in now." : "Sign up now."}
                  </button>
                </p>
              </div>

              {/* Recaptcha Disclaimer */}
              <div className={styles.recaptchaNotice}>
                <p>
                  This page is protected by Google reCAPTCHA to ensure you're
                  not a bot.{" "}
                  {!showRecaptchaInfo && (
                    <button
                      type="button"
                      onClick={() => setShowRecaptchaInfo(true)}
                      className={styles.learnMoreBtn}
                    >
                      Learn more.
                    </button>
                  )}
                </p>
                {showRecaptchaInfo && (
                  <p className={styles.recaptchaDetails}>
                    The information collected by Google reCAPTCHA is subject to
                    the Google{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://policies.google.com/terms"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Terms of Service
                    </a>
                    , and is used for providing, maintaining, and improving the
                    reCAPTCHA service and for general security purposes.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Netflix Authentic Footer */}
      <footer className={styles.loginFooter}>
        <div className={styles.footerContainer}>
          <p className={styles.footerContact}>
            Questions? Call{" "}
            <a href="tel:1-844-505-2993" className={styles.footerLink}>
              1-844-505-2993
            </a>
          </p>

          <ul className={styles.footerLinksGrid}>
            <li>
              <a href="#faq" className={styles.footerLink}>
                FAQ
              </a>
            </li>
            <li>
              <a href="#help-center" className={styles.footerLink}>
                Help Center
              </a>
            </li>
            <li>
              <a href="#terms" className={styles.footerLink}>
                Terms of Use
              </a>
            </li>
            <li>
              <a href="#privacy" className={styles.footerLink}>
                Privacy
              </a>
            </li>
            <li>
              <a href="#cookies" className={styles.footerLink}>
                Cookie Preferences
              </a>
            </li>
            <li>
              <a href="#corporate" className={styles.footerLink}>
                Corporate Information
              </a>
            </li>
          </ul>

          <div className={styles.languageWrapper}>
            <Globe size={16} className={styles.langIcon} />
            <select
              aria-label="Select Language"
              className={styles.languageSelect}
              defaultValue="en"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
      </footer>
    </div>
  );
}
