import React from 'react'
import "./login.css"
import { useState, useContext } from "react"
import { UserContext } from '../../context/UserContext'
import { decodeToken } from 'react-jwt'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { post } from '../../service/functionsHTTP'

function Login() {

    const { user, handleLogin } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigateTo = useNavigate();

    const urlLogin = "http://localhost:3000/api/auth/login"


    async function checkUser(identifier, password) {
        const body = { identifier: identifier, password: password }
        const res = await post(urlLogin, body)

        if (!res.ok) return false;

        const parsed = await res.json()
        return parsed;
        
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (email === "" || password === "") {
            setError("Enter all fields.");
            return

        } else {

            const res = await checkUser(email, password)

            if (!res) {
                setError("La Contraseña o Email son incorrectos.");
                return;
            }

            if (res.status == 404) {
                setError("Este Email no está registrado");
                return;
            }

            handleLogin({ ...decodeToken(res.access_token), jwt: res.access_token });
            setError("Inicio de sesión exitoso.");
            setPassword("")
            setEmail("")
            navigateTo("/");

        }
    }

    return (

        <div className="container-login">
            <div className='title-buttonPassword'>
                <h1>Ingresá tu e-mail o Usuario y contraseña</h1>
            </div>
            <div className='line'></div>
            <div className='container-form'>
                <h2 className="title-login">Iniciar sesión</h2>
                <p className="p-error">{error}</p>
                <form onSubmit={event => handleSubmit(event)} className="form-login">
                    <label htmlFor="email">Email o Usuario</label>
                    <input type="email" id='email' value={email} onChange={event => setEmail(event.target.value)} required />
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id='password' value={password} onChange={event => setPassword(event.target.value)} required />
                    <div className='container-button-login'>
                        <button className='btn-form-login' type="submit">Iniciar sesión</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Login;