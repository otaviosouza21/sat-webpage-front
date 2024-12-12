import { jwtDecode } from "jwt-decode";
import React, { useContext } from "react";
import { GET_AUTH_USER } from "../Api/api";
import useFetch from "./useFetch";
import { GlobalContext } from "./GlobalContext";
import { useNavigate } from "react-router-dom";

const useTokenValidate = () => {
  const { request } = useFetch();
  const { setUserAuth, logout, userAuth }: any = useContext(GlobalContext);
  const navigate = useNavigate();

  const token = window.localStorage.getItem("token");
  async function fetchValidaToken() {
    if (token) {
      const { id, rule }: any = jwtDecode(token);
      const { url, options } = GET_AUTH_USER("usuarios", token, id);
      try {
        const { response, json } = await request(url, options);
        if (response && response.ok) {
          setUserAuth({ token, usuario: json, status: true, rule });
        } else {
          throw new Error("Token inválido ou expirado");
        }
      } catch (error) {
        console.error("Erro ao validar token:", error);
        setUserAuth({});
        logout();
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }

  return {fetchValidaToken, userAuth} ;
};

export default useTokenValidate;
