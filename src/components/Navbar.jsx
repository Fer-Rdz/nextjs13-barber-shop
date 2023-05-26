"use client";
import "@/css/globals.css";
import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import styles from "@/css/navbar.module.css";
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

  const handleLogin = () => {
    if (getToken) {
      router.push("/bookings");
      window.location.reload();
    } else {
      router.push("/login");
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
    router.push("/");
    Cookies.remove("auth-token");
    setTimeout(() => {
      window.location.reload();
    }, 50);
  };
  const goToProfile = () => {
    router.push("/profile");
  };
  return (
    <>
      <section className={styles.nav_container}>
        <nav>
          <ul>
            <li>
              <Image className={styles.logo} src={logo} alt="logo" />
              <Link className={styles.nav_logo} href="/">
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
              <Link href="/contact">
                <span>contactanos</span>
              </Link>
            </li>
            {login ? (
              <ul>
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
                <li
                  className={styles.nav_user}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link className={styles.user_name_nav} href="#">
                    <span>{login.name}</span>
                  </Link>
                  {isMenuOpen && (
                    <div
                      className={styles.user_drop}
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
                      <div className={styles.logout}>
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
              </ul>
            ) : (
              <div className={styles.login_buttons}>
                <li>
                  <Link href="/" onClick={openLogin}>
                    <span className={styles.nav_login}>iniciar sesion</span>
                  </Link>
                </li>

                <li>
                  <Link href="/" onClick={openRegister}>
                    <span className={styles.nav_register}>registrate</span>
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
