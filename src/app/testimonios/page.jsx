"use client";
import styles from "@/css/testimonios.module.css";
import "@/css/globals.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Testimonios = () => {
  const [text, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const maxLength = 250;
  const [rating, setRating] = useState(0);
  const router = useRouter();

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    console.log(selectedRating);
  };
  useEffect(() => {
    setCharacterCount(text.length);
  }, [text]);

  const handleChange = (event) => {
    const newText = event.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
  };
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`${styles.star} ${i <= rating ? "filled" : ""}`}
          onMouseEnter={() => handleStarClick(i)}
        >
          {i <= rating ? "★" : "☆"}
        </span>
      );
    }
    return stars;
  };
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const getID = Cookies.get("auth-token");
    if (getID) {
      const userData = window.atob(getID.split(".")[1]);
      const parseData = JSON.parse(userData);
      setUserData(parseData);
    }
  }, []);

  const saveReview = async (message, stars) => {
    try {
      const id = userData.id;
      const response = await axios.get(`http://localhost:3512/review/${id}`);
      const existingReview = response.data;

      if (existingReview) {
        // Si ya existe una reseña, actualiza en lugar de crear una nueva
        await axios.put(`http://localhost:3512/reviews/${existingReview.id}`, {
          message: text,
          stars: rating,
          client_id: userData.id,
        });
        console.log("Reseña actualizada");
      } else {
        // Si no existe una reseña, crea una nueva
        await axios.post("http://localhost:3512/reviews", {
          message: text,
          stars: rating,
          client_id: userData.id,
        });
        console.log("Reseña guardada");
      }

      router.push("/");
      // Realiza las acciones necesarias después de guardar la reseña
    } catch (error) {
      console.error("Error al guardar la reseña:", error);
      // Maneja el error de manera apropiada
    }
  };

  return (
    <>
      <section className={styles.testimonios_container}>
        <h1>escribe una reseña</h1>
        <div className={styles.rating}>
          <p>Calificación:</p>
          {renderStars()}
        </div>
        <div className={styles.message}>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            value={text}
            onChange={handleChange}
            maxLength={maxLength}
          ></textarea>
          <h2>250/{characterCount}</h2>
        </div>
        <button onClick={saveReview}>enviar</button>
      </section>
    </>
  );
};

export default Testimonios;
