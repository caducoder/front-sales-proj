import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../api/axios";
import LoaderComponent from "../components/loader";
import { boolean } from "yup";

const AuthContext = createContext({
  user: {},
  setUser: () => {},
  Login: () => {},
  Logout: () => {},
  isLoading: true,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

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

    setChecking(false);
  }, []);

  if (checking) {
    return <LoaderComponent />;
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, Login, Logout, isLoading: checking }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
