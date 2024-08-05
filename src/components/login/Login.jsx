import React from "react";
import "./login.css";
import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { post } from "../../service/functionsHTTP";

function Login() {
  const {handleLogin } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigateTo = useNavigate();

  const urlLogin = "http://localhost:3000/api/auth/login";

  async function checkUser(identifier, password) {
    const body = { identifier: identifier, password: password };
    const res = await post(urlLogin, body);

    if (!res.ok) return false;

    const parsed = await res.json();
    return parsed;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (email === "" || password === "") {
      setError("Enter all fields.");
      return;
    } else {
      const res = await checkUser(email, password);

      if (!res) {
        setError("La Contraseña o Email/Usuario son incorrectos.");
        return;
      }

      if (res.status == 404) {
        setError("Este Email/Usuario no está registrado");
        return;
      }

      handleLogin({ ...decodeToken(res.access_token), jwt: res.access_token });
      setError("Inicio de sesión exitoso.");
      setPassword("");
      setEmail("");
      navigateTo("/");
    }
  }

  return (
    <div className="container-login">
      <div className="login-box">
        <div className="login-header">
          <header>Iniciar sesión</header>
          <p className="p-error">{error}</p>
        </div>

        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="input-box">
            <input
              type="text"
              className="input-field"
              placeholder="Email/Usuario"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              className="input-field"
              placeholder="Contraseña"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <div className="input-submit">
            <button className="submit-btn" id="submit"></button>
            <label htmlFor="submit">Acceder</label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
