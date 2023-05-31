"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import "../css/login.css";
import Login from "./Login";
import { AiFillCloseCircle } from "react-icons/ai";

const Register = ({ isOpen, onClose, children }) => {
  const [name, setName] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [formError, setFormError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLogin = () => {
    setIsLoginOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Restablecer estados de error
    setNameError(false);
    setLastnameError(false);
    setEmailError(false);
    setPasswordError(false);
    setFormError(false);

    if (!name || !lastname || !email || !password) {
      setFormError(true);
      return; // Detener el envío del formulario
    }
    try {
      const response = await axios.get(
        `http://localhost:3512/clients/${email}`
      );
      if (response.data) {
        // El correo electrónico ya está registrado
        alert("El correo electrónico ya está registrado.", "BARBEL");
      } else {
        // El correo electrónico no está registrado, proceder con el registro
        await axios.post("http://localhost:3512/clients", {
          name: name,
          lastname: lastname,
          email: email,
          password: password,
        });
        alert("Registro exitoso.");
        onClose();
        openLogin();
      }
    } catch (error) {
      alert("Error al verificar el correo electrónico.");
      console.error(error);
    }
  };

  const handleInputChange = () => {
    setFormError(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <section className="login-container">
        <section className="container">
          <form action="" className="form-container">
            <h1>registrate</h1>
            <p>cambia tu estilo con nosotros</p>
            {formError && (
              <p className="error-message">
                Por favor, complete todos los campos.
              </p>
            )}
            <div className="user-name">
              <div className="name">
                <label>nombre</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  placeholder="nombre"
                  onChange={(event) => {
                    setName(event.target.value);
                    handleInputChange();
                  }}
                />
              </div>
              <div className="lastname">
                <label>apellido</label>
                <input
                  type="text"
                  name="lastname"
                  placeholder="apellido"
                  value={lastname}
                  onChange={(event) => {
                    setLastname(event.target.value);
                    handleInputChange();
                  }}
                />
              </div>
            </div>
            <div className="email">
              <label>correo</label>
              <input
                type="email"
                name="email"
                placeholder="user@email.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  handleInputChange();
                }}
              />
            </div>
            <div className="password">
              <label>contraseña</label>
              <input
                type="password"
                name="password"
                placeholder="contraseña"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  handleInputChange();
                }}
              />
            </div>
            <button onClick={handleSubmit} className="join">
              ingresar
            </button>

            <button className="close" onClick={onClose}>
              <AiFillCloseCircle />
            </button>
          </form>
        </section>
        <div className="image"></div>
        {children}
      </section>
    </>
  );
};

export default Register;
