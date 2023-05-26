"use client";
import axios from "axios";
import styles from "@/css/bookings.module.css";
import { useState, useEffect } from "react";
const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/dates")
      .then((response) => setBookings(response.data));
  }, []);
  return (
    <>
      <section className={styles.bookings_main}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>citas</th>
            </tr>
            <tr>
              <th>fecha</th>
              <th>hora</th>
              <th>cliente</th>
              <th>servicios</th>
              <th>precio total</th>
            </tr>
            {bookings?.map((dates) => (
              <tr key={dates.id}>
                <td>{dates.date}</td>
                <td>{dates.bookingTime}</td>
                <td>
                  {dates.client.name}&nbsp;
                  {dates.client.lastname}
                </td>
                <td>
                  <table>
                    <tbody>
                      <tr>
                        <th>servicios</th>
                        <th>precio</th>
                      </tr>
                      {dates.services.map((services) => (
                        <tr key={services.id}>
                          <td>{services.name}</td>
                          <td>${services.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td>${dates.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Bookings;
