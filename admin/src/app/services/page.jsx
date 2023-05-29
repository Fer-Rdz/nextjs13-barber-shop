"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "@/css/services.module.css";
import { AiOutlineSearch } from "react-icons/ai";
const Services = () => {
  const [services, setServices] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3512/services")
      .then((response) => setServices(response.data));
  }, []);
  return (
    <>
      <section className={styles.services_main}>
        <div className={styles.services_title}>
          <h1>servicios</h1>
          <div className={styles.search}>
            <h3>
              {" "}
              <AiOutlineSearch />
            </h3>
            <input
              className={styles.search_bar}
              type="search"
              name=""
              id=""
              placeholder="buscar cliente..."
            />
          </div>
        </div>
        <table className={styles.table_th}>
          <tbody>
            <tr>
              <th>nombre</th>
              <th>precio</th>
            </tr>
          </tbody>
        </table>
        <section className={styles.table_container}>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.name_row}>
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
      </section>
    </>
  );
};

export default Services;
