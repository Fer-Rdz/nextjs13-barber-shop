"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import "@/css/calendar.css";
import { useRouter } from "next/navigation";
const Calendar = () => {
  const router = useRouter();
  const [services, setServices] = useState(null);
  const [getInitTime, setGetInitTime] = useState(null);
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [horasDisponibles] = useState([
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
  ]);
  const [horasOcupadas, setHorasOcupadas] = useState([]);
  useEffect(() => {
    const fetchHorasOcupadas = async () => {
      const horas = await getHorasOcupadas();
      setHorasOcupadas(horas);
    };
    fetchHorasOcupadas();
  }, []);
  const generateDays = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();
    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };
  const prevMonth = () => {
    if (month === today.getMonth() && year === today.getFullYear()) {
      return;
    }
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };
  const nextMonth = () => {
    if (month === today.getMonth() && year === today.getFullYear()) {
      const nextMonth = month + 1;
      if (nextMonth === 12) {
        setYear(year + 1);
        setMonth(0);
      } else {
        setMonth(nextMonth);
      }
    }
  };
  const isDayPast = (day) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    return (
      year === currentYear &&
      month === currentMonth &&
      day < currentDate.getDate()
    );
  };
  const days = generateDays(year, month);
  const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    new Date(year, month)
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDayClick = (day) => {
    const date = new Date(year, month, day);
    const selectedDate = date.toISOString().substring(0, 10);
    setSelectedDate(selectedDate);
    console.log(selectedDate);
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
  const getServiceName = (serviceId) => {
    const selectedService = services.find(
      (service) => service.id === serviceId
    );
    return selectedService ? selectedService.name : "";
  };
  const getServicePrice = (serviceId) => {
    const selectedService = services.find(
      (service) => service.id === serviceId
    );
    return selectedService ? selectedService.price : 0;
  };
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);
  const handleServiceClick = (serviceId) => {
    if (selectedServices.includes(serviceId)) {
      // El servicio ya está seleccionado, así que lo eliminamos
      setSelectedServices(selectedServices.filter((id) => id !== serviceId));
      const price = getServicePrice(serviceId);
      setTotalPrice(totalPrice - price);
    } else {
      // El servicio no está seleccionado, así que lo agregamos
      setSelectedServices([...selectedServices, serviceId]);
      const price = getServicePrice(serviceId);
      setTotalPrice(totalPrice + price);
    }
  };

  const submitBooking = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3512/dates", {
        date: selectedDate,
        bookingTime: getInitTime,
        isExpired: false,
        client_id: userData.id,
        services: selectedServices,
        totalPrice: totalPrice,
      });
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:3512/services/")
      .then((response) => setServices(response.data));
  }, []);

  const handleGetInitTime = (horas) => {
    setGetInitTime(horas);
    console.log(horas);
  };
  const getHorasOcupadas = async () => {
    try {
      const response = await axios.get("http://localhost:3512/dates/");
      const horasOcupadas = response.data
        .filter((date) => date.isExpired === false)
        .map((date) => ({
          date: date.date,
          bookingTime: date.bookingTime,
        }));
      return horasOcupadas;
    } catch (error) {
      console.error("Error al obtener las horas ocupadas:", error);
      return [];
    }
  };
  useEffect(() => {
    const fetchHorasOcupadas = async () => {
      const horas = await getHorasOcupadas();
      setHorasOcupadas(horas);
    };
    fetchHorasOcupadas();
  }, []);

  useEffect(() => {
    const tilt = document.getElementById("container");
    const maxTilt = 5;
    if (tilt) {
      tilt.addEventListener("mousemove", (e) => {
        const boundingRect = tilt.getBoundingClientRect();
        const mouseX = e.clientX - boundingRect.left;
        const mouseY = e.clientY - boundingRect.top;
        const centerX = boundingRect.width / 2;
        const centerY = boundingRect.height / 2;
        const tiltX = ((mouseX - centerX) / (boundingRect.width / 2)) * maxTilt;
        const tiltY =
          ((mouseY - centerY) / (boundingRect.height / 2)) * -maxTilt;
        tilt.style.transform = `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
      });

      tilt.addEventListener("mouseleave", () => {
        tilt.style.transform = "none";
        tilt.style.transition = "50ms";
      });
    }
  });
  return (
    <>
      <section className="main-booking-container">
        <div className="booking-container">
          <div className="book-title">
            <h1>selecciona tu fecha y los servicios</h1>
          </div>
          <div className="global-container">
            <section className="calendar-container">
              {/*<div className="title">
            <h1>selecciona el dia para tu cita</h1>
          </div>*/}
              <div className="calendar-box" id="container">
                <div className="month-changer">
                  <button onClick={prevMonth}>Prev</button>
                  <span>
                    {monthName} {year}
                  </span>
                  <button onClick={nextMonth}>Next</button>
                </div>
                <table className="calendar-body">
                  <thead className="days-container">
                    <tr className="days">
                      {["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"].map(
                        (day) => (
                          <th key={day}>{day}</th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody className="day-number">
                    {chunks(days, 7).map((week, i) => (
                      <tr key={i}>
                        {week.map((day, j) => (
                          <td key={j}>
                            {day && (
                              <p
                                onClick={() => handleDayClick(day)}
                                className={`day ${
                                  day === today.getDate() &&
                                  month === today.getMonth()
                                    ? "current"
                                    : ""
                                } ${day === selectedDate ? "selected" : ""} ${
                                  isDayPast(day) ? "past" : ""
                                }`}
                                disabled={isDayPast(day)}
                              >
                                {day}
                              </p>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
          <div className="schedule-title">
            <h1>selecciona una hora</h1>
          </div>
          <div className="schedule">
            {horasDisponibles.map((horas) => (
              <button
                key={horas}
                value={horas}
                // disabled={
                //   !selectedDate || horasOcupadas[selectedDate].includes(horas)
                // }
                disabled={
                  !selectedDate ||
                  horasOcupadas.some(
                    (item) =>
                      item.date === selectedDate && item.bookingTime === horas
                  )
                }
                onClick={(e) => handleGetInitTime(e.target.value)}
                className={horasOcupadas.includes(horas) ? "disabledlink" : ""}
              >
                {horas}
              </button>
            ))}
          </div>
          <div className="services">
            {services?.map((services) => (
              <button
                key={services.id}
                value={services.id}
                onClick={() => handleServiceClick(services.id)}
              >
                {services.name}
                {services.time}
                <span className="service-price"> ${services.price}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="book-info">
          <div className="price">
            <div className="book-date">
              <h1>fecha de la cita</h1>
              <h1 className="date-select">{selectedDate}</h1>
            </div>
            <div className="book-time">
              <h1>hora de la cita</h1>
              <h2>{getInitTime}</h2>
            </div>
            <div className="book-services">
              <h1>servicios de la cita</h1>
              <h2 className="services-select">
                {selectedServices
                  .map((serviceId) => getServiceName(serviceId))
                  .join(", ")}
              </h2>
            </div>
            <div className="services-price">
              <h1>precio total</h1>
              <h2 className="booking-price">${totalPrice}</h2>
            </div>
            <button
              onClick={submitBooking}
              disabled={
                !selectedDate || !getInitTime || selectedServices.length === 0
              }
            >
              agendar cita
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
const chunks = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export default Calendar;
