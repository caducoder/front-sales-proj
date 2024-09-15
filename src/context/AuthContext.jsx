import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../api/axios";

const AuthContext = createContext({
  user: {},
  setUser: () => {},
  Login: () => {},
  Logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function Login({ email, password }) {
    try {
      const { data } = await api.post("/sessions", {
        email,
        password,
      });

      setUser(data.user);

      localStorage.setItem("@App:user", JSON.stringify(data.user));
      localStorage.setItem("@App:token", data.token);
    } catch (error) {
      toast.error(error?.response?.data.message);
    }
  }

  function Logout() {
    console.log("SAIU");
    setUser(null);

    localStorage.removeItem("@App:user");
    localStorage.removeItem("@App:token");
  }

  useEffect(() => {
    const storagedUser = localStorage.getItem("@App:user");
    const storagedToken = localStorage.getItem("@App:token");

    if (storagedToken && storagedUser) {
      const userParsed = JSON.parse(storagedUser);

      setUser(userParsed);
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
