import { useState } from "react";
import { AuthContext } from "./authContextInstance";

const STORAGE_KEY = "netflix_clone_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (email, _password, remember = true) => {
    const username = email.includes("@") ? email.split("@")[0] : email;
    const userData = {
      name: username.charAt(0).toUpperCase() + username.slice(1),
      email,
      loggedInAt: new Date().toISOString(),
    };
    setUser(userData);
    if (remember) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    }
    return userData;
  };

  const signup = (name, email, _password) => {
    const userData = {
      name: name.trim() || (email.includes("@") ? email.split("@")[0] : email),
      email,
      loggedInAt: new Date().toISOString(),
    };
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
