"use client";
import styles from "../css/home.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaDollarSign } from "react-icons/fa";
import Title from "@/components/Title";

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

  const calculateTotalPriceByDay = () => {
    // Crear un objeto para almacenar las ganancias por día
    const totalPriceByDay = {};

    // Calcular las ganancias por día
    prices.forEach((price) => {
      const date = price.date;
      // Verificar si ya existe una entrada para la fecha en el objeto totalPriceByDay
      if (totalPriceByDay[date]) {
        totalPriceByDay[date] += price.totalPrice;
      } else {
        totalPriceByDay[date] = price.totalPrice;
      }
    });

    // Ordenar las ganancias por día en orden ascendente de fecha
    const sortedTotalPriceByDay = Object.entries(totalPriceByDay).sort(
      (a, b) => new Date(a[0]) - new Date(b[0])
    );

    return sortedTotalPriceByDay;

    /*return totalPriceByDay;*/
  };
  const [userCountByMonth, setUserCountByMonth] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3512/clients").then((response) => {
      const users = response.data;
      const countByMonth = calculateUserCountByMonth(users);
      setUserCountByMonth(countByMonth);
    });
  }, []);

  const calculateUserCountByMonth = (users) => {
    const countByMonth = {};

    users.forEach((user) => {
      const date = new Date(user.createdAt);
      const month = date.toLocaleString("es-ES", { month: "long" });
      const year = date.getFullYear();
      const monthYear = `${month} ${year}`;

      if (countByMonth[monthYear]) {
        countByMonth[monthYear]++;
      } else {
        countByMonth[monthYear] = 1;
      }
    });

    return countByMonth;
  };

  return (
    <>
      <main className={styles.main}>
        <section>
          <Title />
          <article
            className={styles.price}
            onMouseLeave={handleUserToolLeave}
            onMouseEnter={handleUserToolEnter}
          >
            <h1>ganancias totales aproximadas</h1>
            <h2>${addTotalPrices()}</h2>
            {/* {totalPrice && (
              <div className={styles.price_drop}>
                <h3>${addTotalPricesNormal()}</h3>
              </div>
            )} */}
            <h1>ganancias por dia</h1>
            {calculateTotalPriceByDay().map(([date, totalPrice]) => (
              <p key={date}>
                {new Date(date).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                : ${totalPrice}
              </p>
            ))}
          </article>
        </section>
        <div className={styles.users}>
          <h1>usurios registrados por mes</h1>
          {Object.entries(userCountByMonth).map(([monthYear, count]) => {
            const [month, year] = monthYear.split("-");
            return (
              <p key={monthYear}>
                {month} {year}: {count} usuarios registrados
              </p>
            );
          })}
        </div>
      </main>
    </>
  );
}
