import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState([]);

  // Sign up function
  const signup = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) ?? [];

    if (users.some((user) => user.email === email)) {
      return { success: false, message: "Email already exists" };
    }

    const newUser = {
      id: crypto.randomUUID(),
      email,
      password,
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);

    return { success: true };
  };

  // Login function
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) ?? [];
    const userVerify = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (!userVerify) {
      return { success: false, message: "Invalid credentials" };
    }

    localStorage.setItem("user", JSON.stringify(userVerify));
    setUser(userVerify);

    return { success: true };
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
