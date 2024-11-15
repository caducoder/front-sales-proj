import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../api/axios";
import LoaderComponent from "../components/loader";
import { boolean } from "yup";
import { Navigate, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
    const checkUser = async () => {
      const storagedUser = localStorage.getItem("@App:user");
      const storagedToken = localStorage.getItem("@App:token");

      if (storagedToken && storagedUser) {
        try {
          api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
          const response = await api.get("/sessions/me");

          const newToken = response.data.token; // suposição de que o novo token vem na resposta
          localStorage.setItem("@App:token", newToken);
          api.defaults.headers.Authorization = `Bearer ${newToken}`;

          setUser(response.data.user); // ou os dados retornados do usuário
        } catch (error) {
          console.error(
            "Token inválido ou expirado, redirecionando para login"
          );
          localStorage.removeItem("@App:user");
          localStorage.removeItem("@App:token");
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
      setChecking(false);
    };

    checkUser();
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
