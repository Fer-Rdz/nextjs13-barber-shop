"use client";
import axios from "axios";
import styles from "@/css/users.module.css";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
const Users = () => {
  const [users, setUsers] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/clients")
      .then((response) => setUsers(response.data));
  }, []);
  const handleDeleteUser = (userID) => {
    axios.delete(`http://localhost:5000/clients/${userID}`).then((response) => {
      setUsers(users.filter((user) => user.id !== userID));
    });
  };

  const calculateAntiquity = (createdAt) => {
    const currentDate = new Date();
    const creationDate = new Date(createdAt); /**/
    const timeDifference = currentDate.getTime() - creationDate.getTime();

    // Calculating the number of days
    // Calculating the number of days, hours and minutes
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(timeDifference / (1000 * 60));

    if (days >= 1) {
      return days + " días";
    } else if (hours >= 1) {
      return hours + " horas";
    } else {
      return minutes + " minutos";
    }
  };

  return (
    <>
      <section className={styles.user_main}>
        <div className={styles.title_container}>
          <h1>usuarios</h1>
          <div className={styles.search}>
            <h3>
              {" "}
              <AiOutlineSearch />
            </h3>
            <input
              className={styles.search_bar}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              type="search"
              name=""
              id=""
              placeholder="buscar cliente..."
            />
          </div>
        </div>
        <section className={styles.table_container}>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.user_row}>
                <th>nombre</th>
                <th>apellido</th>
                <th>correo</th>
                <th>antiguedad</th>
              </tr>
              {users
                ?.filter((user) =>
                  `${user.name} ${user.lastname}`
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((users) => (
                  <tr key={users.id}>
                    <td>{users.name}</td>
                    <td>{users.lastname}</td>
                    <td className={styles.email}>{users.email}</td>
                    <td>{calculateAntiquity(users.createdAt)}</td>

                    {/*<td
                      className={styles.delete}
                      onClick={() => handleDeleteUser(users.id)}
                    >
                      <AiFillDelete />
                </td>*/}
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      </section>
    </>
  );
};

export default Users;
