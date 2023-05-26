"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "@/css/services.module.css";
const Services = () => {
  const [services, setServices] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:4000/services")
      .then((response) => setServices(response.data));
  }, []);
  return (
    <>
      <section className={styles.services_main}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>servicios</th>
            </tr>
            <tr>
              <th>nombre</th>
              <th>precio</th>
            </tr>
            {services?.map((services) => (
              <tr key={services.id}>
                <td>{services.name}</td>
                <td>${services.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Services;
