"use client";
import styles from "../css/home.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaDollarSign } from "react-icons/fa";

export default function Home() {
  const [prices, SetPrices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3512/dates")
      .then((response) => SetPrices(response.data));
  }, []);
  const addTotalPrices = () => {
    const totalPriceSum = prices.reduce(
      (total, price) => total + price.totalPrice,
      0
    );
    if (totalPriceSum >= 1000) {
      const formattedPrice =
        (totalPriceSum / 1000).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + "k";
      return formattedPrice;
    } else {
      return totalPriceSum;
    }
  };
  const addTotalPricesNormal = () => {
    return prices.reduce((total, price) => total + price.totalPrice, 0);
  };
  const handleUserToolEnter = () => {
    setTotalPrice(true);
  };
  const handleUserToolLeave = () => {
    setTotalPrice(false);
  };
  return (
    <>
      <main className={styles.main}>
        <section>
          <article
            className={styles.price}
            onMouseLeave={handleUserToolLeave}
            onMouseEnter={handleUserToolEnter}
          >
            <h1>ganancias</h1>
            <h2>${addTotalPrices()}</h2>
            {totalPrice && (
              <div className={styles.price_drop}>
                <h3>${addTotalPricesNormal()}</h3>
              </div>
            )}
          </article>
        </section>
      </main>
    </>
  );
}
