"use client";
import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import "@/css/navbar.css";
import logo from "../../public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import Register from "./Register";
import Login from "./Login";

const Navbar = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const getToken = Cookies.get("auth-token");
  const router = useRouter();

  const handleClick = () => {
    if (getToken) {
      navigate("/");
      window.location.reload();
    } else {
      navigate("/login");
      window.location.reload();
    }
  };

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const getID = Cookies.get("auth-token");
    if (getToken) {
      const login = window.atob(getID.split(".")[1]);
      const parseData = JSON.parse(login);
      setLogin(parseData);
    }
  }, [getToken]);

  const openRegister = () => {
    setIsRegisterOpen(true);
  };
  const closeRegister = () => {
    setIsRegisterOpen(false);
  };
  const openLogin = () => {
    setIsLoginOpen(true);
  };
  const closeLogin = () => {
    setIsLoginOpen(false);
  };
  const handleLogout = () => {
    Cookies.remove("auth-token");
    router.push("/");
    window.location.reload();
  };
  const goToProfile = () => {
    router.push("/profile");
  };
  return (
    <>
      <section className="nav-container">
        <nav>
          <ul>
            <li>
              <Image className="logo" src={logo} alt="logo" />
              <Link className="nav-logo" href="/">
                barbel
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/">
                <span>servicios</span>
              </Link>
            </li>
            <li>
              <Link href="/">
                <span>contactanos</span>
              </Link>
            </li>
            <li>
              <Link href="/testimonios">
                <span>escribenos una reseña</span>
              </Link>
            </li>
            <li>
              <Link href="/bookings">
                <span>agendar cita</span>
              </Link>
            </li>
            {login ? (
              <li
                className="nav-user"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link className="user-name-nav" href="/">
                  <span>{login.name}</span>
                </Link>
                {isMenuOpen && (
                  <div
                    className="user-drop"
                    onMouseEnter={handleMouseEnter}
                    /* onMouseLeave={handleMouseLeave}*/
                  >
                    <div>
                      <span>
                        <BiUserCircle />
                      </span>
                      <section onClick={goToProfile}>
                        <h2>mi perfil</h2>
                        <p>
                          entra a tu perfil para ver tus citas pendientes
                        </p>{" "}
                      </section>
                    </div>
                    <div className="logout">
                      <span>
                        <FiLogOut />
                      </span>
                      <section onClick={handleLogout}>
                        <h2>cerrar sesion</h2>
                        <p>cierra la sesion para salir de la pagina</p>{" "}
                      </section>
                    </div>
                  </div>
                )}
              </li>
            ) : (
              <div className="login-buttons">
                <li>
                  <Link href="/" onClick={openLogin}>
                    <span className="nav-login">iniciar sesion</span>
                  </Link>
                </li>

                <li>
                  <Link href="/" onClick={openRegister}>
                    <span className="nav-register">registrate</span>
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </nav>
        <Register isOpen={isRegisterOpen} onClose={closeRegister}></Register>
        <Login isOpen={isLoginOpen} onClose={closeLogin}></Login>
      </section>
    </>
  );
};

export default Navbar;
