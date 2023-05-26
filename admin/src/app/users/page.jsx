"use client";
import axios from "axios";
import styles from "@/css/users.module.css";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
const Users = () => {
  const [users, setUsers] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:4000/clients")
      .then((response) => setUsers(response.data));
  }, []);
  return (
    <>
      <section className={styles.user_main}>
        <div className={styles.search}>
          <AiOutlineSearch />
          <input type="search" name="" id="" placeholder="buscar cliente..." />
        </div>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>usuarios</th>
            </tr>
            <tr>
              <th>nombre</th>
              <th>apellido</th>
              <th>correo</th>
              <th>antiguedad</th>
            </tr>
            {users?.map((users) => (
              <tr key={users.id}>
                <td>{users.name}</td>
                <td>{users.lastname}</td>
                <td className={styles.email}>{users.email}</td>
                <td>{users.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Users;
