"use client";
import styles from "@/css/testimonios.module.css";
import "@/css/globals.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Testimonios = () => {
  const [text, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const maxLength = 250;
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
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
          onClick={() => handleStarClick(i)}
        >
          {i <= rating ? "★" : "☆"}
        </span>
      );
    }
    return stars;
  };
  const saveReview = async (message, stars) => {
    try {
      const response = await axios.post("http://localhost:4000/reviews", {
        message,
        stars,
      });

      console.log("Reseña guardada:", response.data);
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
        <button>enviar</button>
      </section>
    </>
  );
};

export default Testimonios;
