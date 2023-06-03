"use client";
import axios from "axios";
import styles from "@/css/bookings.module.css";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import PDFReport from "../PdfReport";
import { saveAs } from "file-saver";

const Bookings = () => {
  const currentDate = new Date();
  const [bookings, setBookings] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/dates")
      .then((response) => setBookings(response.data));
  }, []);

  useEffect(() => {
    const filterAndSortBookings = () => {
      let filtered = bookings;
      if (filterDate) {
        filtered = bookings.filter((booking) => {
          const bookingDate = new Date(booking.date);
          const filterDateObj = new Date(filterDate);
          return (
            bookingDate.getFullYear() === filterDateObj.getFullYear() &&
            bookingDate.getMonth() === filterDateObj.getMonth() &&
            bookingDate.getDate() === filterDateObj.getDate()
          );
        });
      }
      // Filtrar por mes
      if (selectedMonth) {
        filtered = filtered.filter((booking) => {
          const bookingDate = new Date(booking.date);
          return bookingDate.getMonth() === selectedMonth;
        });
      }

      // Filtrar por día
      if (selectedDay) {
        filtered = filtered.filter((booking) => {
          const bookingDate = new Date(booking.date);
          return bookingDate.getDate() === selectedDay;
        });
      }

      // Ordenar las citas
      const sorted = filtered.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });
      setFilteredBookings(sorted);
    };

    filterAndSortBookings();
  }, [filterDate, bookings]);

  useEffect(() => {
    const filterAndSortBookings = () => {
      let filtered = bookings;
      if (searchTerm) {
        filtered = bookings.filter((booking) => {
          const clientName = booking.client.name.toLowerCase();
          const searchLower = searchTerm.toLowerCase();
          return clientName.includes(searchLower);
        });
      }
      if (showValidBookings) {
        filtered = filtered.filter((booking) =>
          isBookingValid(booking.date, booking.bookingTime)
        );
      }
      const sorted = filtered.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });
      setFilteredBookings(sorted);
    };

    filterAndSortBookings();
  }, [searchTerm, bookings]);

  const handleFilter = (event) => {
    setFilterDate(event.target.value);
  };

  const isBookingExpired = (bookingDate, bookingTime) => {
    const currentDateTime = new Date();
    const [bookingYear, bookingMonth, bookingDay] = bookingDate.split("-");
    const [bookingHours, bookingMinutes] = bookingTime.split(":");
    const bookingDateTime = new Date(
      bookingYear,
      bookingMonth - 1,
      bookingDay,
      bookingHours,
      bookingMinutes
    );

    return bookingDateTime < currentDateTime;
  };
  const isBookingValid = (bookingDate, bookingTime) => {
    const currentDateTime = new Date();
    const [bookingYear, bookingMonth, bookingDay] = bookingDate.split("-");
    const [bookingHours, bookingMinutes] = bookingTime.split(":");
    const bookingDateTime = new Date(
      bookingYear,
      bookingMonth - 1,
      bookingDay,
      bookingHours,
      bookingMinutes
    );

    return bookingDateTime >= currentDateTime;
  };
  const [showValidBookings, setShowValidBookings] = useState(true);

  return (
    <>
      <section className={styles.bookings_main}>
        <div className={styles.filter_container}>
          <h1>citas</h1>
          <label htmlFor="filterDate">Filtrar por fecha:</label>
          <input
            type="date"
            id="filterDate"
            value={filterDate}
            onChange={(event) => setFilterDate(event.target.value)}
          />
          <div className={styles.search}>
            <h3>
              <AiOutlineSearch />
            </h3>
            <input
              className={styles.search_bar}
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar cliente..."
            />
          </div>
        </div>
        <section className={styles.table_container}>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.name_row}>
                <th>fecha</th>
                <th>hora</th>
                <th>cliente</th>
                <th className={styles.services_row}>servicios</th>
                <th>precio total</th>
                <th>vigencia</th>
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
                  <td>
                    {isBookingExpired(dates.date, dates.bookingTime)
                      ? "Expirado"
                      : "Vigente"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    </>
  );
};

export default Bookings;
