"use client";
import Navbar from "@/components/Navbar";
import "@/css/home.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useState, useEffect, useRef } from "react";
import logo from "../../public/logo.svg";
import Image from "next/image";
const Home = () => {
  const heroPhrases = [
    "Ven a descubrir nuestra atención al detalle y cambia tu estilo con nosotros",
    "Estilo y precisión para hombres con clase",
    "Transforma tu apariencia con nuestros cortes de vanguardia",
    "Experimenta el arte de la barbería en su máxima expresión",
    "Cortes de cabello que te hacen destacar",
    "Una experiencia de barbería única para hombres exigentes",
    "Descubre el poder de un buen corte de pelo",
    "Diseños de barba que te harán lucir impecable",
    "Bienvenido a la barbería donde tu estilo cobra vida",
    "Estamos aquí para hacer que te sientas y luzcas increíble",
    "Cortes clásicos y modernos para hombres con actitud",
    "Confía en nuestros barberos expertos para el look perfecto",
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const phraseRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) =>
        prevIndex === heroPhrases.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    phraseRef.current.classList.remove("fade");
    void phraseRef.current.offsetWidth;
    phraseRef.current.classList.add("fade");
  }, [currentPhraseIndex]);

  return (
    <>
      <section>
        <Navbar />
        <article className="hero">
          <Image className="logo" src={logo} alt="logo" />
          <h1>barbel</h1>
          <div className="hero-text">
            <p ref={phraseRef} className="phrases">
              {heroPhrases[currentPhraseIndex]}
            </p>
          </div>
          <div className="search">
            <span>
              <AiOutlineSearch />
              buscar servicios ...
            </span>
          </div>
        </article>
        <article />
      </section>
    </>
  );
};

export default Home;
