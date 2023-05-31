"use client";
import styles from "@/css/home.module.css";
import "@/css/globals.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useState, useEffect, useRef, useContext } from "react";
import logo from "../../public/logo.svg";
import Image from "next/image";
import axios from "axios";
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
    phraseRef.current.classList.remove(styles.fade);
    void phraseRef.current.offsetWidth;
    phraseRef.current.classList.add(styles.fade);
  }, [currentPhraseIndex]);

  const [services, setServices] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3512/services")
      .then((response) => setServices(response.data));
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredServices = services?.filter((service) => {
    const serviceName = service.name?.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    return serviceName?.includes(searchLower);
  });
  const [testimonios, setTestimonios] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3512/reviews")
      .then((response) => setTestimonios(response.data));
  }, []);

  /* const [filteredTestimonios, setFilteredTestimonios] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3512/reviews")
      .then((response) => setTestimonios(response.data));
  }, []);

  useEffect(() => {
    if (testimonios && testimonios.length > 0) {
      // Filtrar testimonios por 5 estrellas
      const filtered = testimonios?.filter((reviews) => reviews.stars === 5);
      setFilteredTestimonios(filtered);
    }
  }, [testimonios]);

  // Filtrar testimonios por término de búsqueda
  useEffect(() => {
    if (testimonios && testimonios.length > 0) {
      const filtered = testimonios.filter((reviews) =>
        reviews.client.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTestimonios(filtered);
    }
  }, [searchTerm, testimonios]);*/

  return (
    <>
      <section>
        <article className={styles.hero}>
          <div className={styles.hero_text}>
            <div className={styles.hero_logo}>
              <h1>barbel</h1>
              <Image src={logo} alt={"logo"} />
            </div>
            <p ref={phraseRef} className={styles.phrases}>
              {heroPhrases[currentPhraseIndex]}
            </p>
          </div>
          <div className={styles.search}>
            <span>
              <AiOutlineSearch />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                type="search"
                name=""
                id=""
                placeholder="Buscar Servicio ..."
              />
            </span>
          </div>
        </article>
        <h1>servicios</h1>
        <article className={styles.services}>
          <div>
            <table>
              <tbody>
                {filteredServices?.map((services) => (
                  <tr key={services?.id}>
                    <ul>
                      <li>
                        <td>{services?.name}</td>
                      </li>
                    </ul>
                    <td className={styles.price}>${services?.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
        <article className={styles.testimonios}>
          <div className={styles.title}>
            <h1>testimonios</h1>
          </div>
          <div className={styles.container}>
            {testimonios?.map((reviews) => (
              <div key={reviews.id} className={styles.card}>
                <h1>
                  {reviews.client.name}&nbsp;
                  {reviews.client.lastname}
                </h1>
                <span>
                  {Array.from({ length: reviews.stars }).map((_, index) => (
                    <span key={index} className="star filled">
                      ★
                    </span>
                  ))}
                  {Array.from({ length: 5 - reviews.stars }).map((_, index) => (
                    <span key={index} className="star">
                      ☆
                    </span>
                  ))}
                </span>
                <h2>&quot;{reviews.message}&quot;</h2>
              </div>
            ))}
          </div>
        </article>
      </section>
    </>
  );
};

export default Home;
