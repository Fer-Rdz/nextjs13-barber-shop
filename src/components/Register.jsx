"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";

const Register = ({ isOpen, onClose, children }) => {
  const [name, setName] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:4000/clients", {
        name: name,
        lastname: lastname,
        email: email,
        password: password,
      });
    } catch (error) {
      alert(error);
    }
  };
  if (!isOpen) return null;
  return (
    <>
      <section className="register">
        <form action="">
          <h1>registrate</h1>
          <p>cambia tu estilo con nosotros</p>
          <div className="container">
            <div className="user-name">
              <div className="name">
                <label>nombre</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  placeholder="nombre"
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="lastname">
                <label>apellido</label>
                <input
                  type="text"
                  name="lastname"
                  placeholder="apellido"
                  value={lastname}
                  onChange={(event) => setLastname(event.target.value)}
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
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="password">
              <label>contraseña</label>
              <input
                type="password"
                name="password"
                placeholder="contraseña"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>ingresar</button>
            <h6>
              ya tienes una cuenta?<Link href="/">inicia sesion</Link>
            </h6>
          </div>
        </form>
        <div className="image"></div>
        {children}
      </section>
    </>
  );
};

export default Register;
