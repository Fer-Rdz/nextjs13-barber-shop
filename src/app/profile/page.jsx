"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import "@/css/profile.css";
import axios from "axios";
import { useRouter } from "next/navigation";
const Profile = () => {
  const [getBookings, SetGetBookings] = useState();
  const [login, setLogin] = useState(false);
  const getToken = Cookies.get("auth-token");
  const router = useRouter();
  useEffect(() => {
    const getID = Cookies.get("auth-token");
    if (getToken) {
      const login = window.atob(getID.split(".")[1]);
      const parseData = JSON.parse(login);
      setLogin(parseData);
    }
  }, [getToken]);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const getID = Cookies.get("auth-token");
    if (getID) {
      const userData = window.atob(getID.split(".")[1]);
      const parseData = JSON.parse(userData);
      setUserData(parseData);
    }
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:3512/date/${login.id}`)
      .then((response) => SetGetBookings(response.data));
  }, [login]);
  const handleDeleteBooking = (bookingID) => {
    axios.delete(`http://localhost:3512/dates/${bookingID}`);
    window.location.reload();
  };
  const [editedEmail, setEditedEmail] = useState("");
  const isValidEmail = (email) => {
    // Utiliza una expresión regular para verificar el formato del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSaveChanges = () => {
    // Realiza la solicitud de actualización al servidor utilizando axios o cualquier otra librería de tu elección
    if (!isValidEmail(editedEmail)) {
      // Si el correo no tiene el formato válido, muestra un alert
      alert("El formato de correo no es válido");
      return;
    }
    axios
      .put(`http://localhost:3512/client/${userData.id}`, {
        email: editedEmail,
      })
      .then((response) => {
        // Actualiza el estado del correo en la página
        setLogin({ ...login, email: editedEmail });
        // Restablece el campo de entrada de correo editado
        setEditedEmail("");
        alert("Correo actualizado");
      })
      .catch((error) => {
        // Maneja el error en caso de que ocurra
        console.log(error);
      });
  };
  return (
    <>
      <section className="profile-container">
        <section className="user-info">
          <h1>hola</h1>
          <h2>
            {" "}
            {login.name}&nbsp;
            {login.lastname}
          </h2>
          <h3>{login.email}</h3>
        </section>
        <div className="bookings-global">
          <div className="bookings-title">
            <input
              type="email"
              value={editedEmail}
              placeholder="Cambia tu correo"
              onChange={(e) => setEditedEmail(e.target.value)}
            />
            <button onClick={handleSaveChanges}>Guardar cambios</button>
            <h1>citas agendadas</h1>
          </div>
          <section className="user-bookings">
            {getBookings && getBookings.length > 0 ? (
              getBookings.map((dates) => (
                <div key={dates.id} className="bookings-info" id="container">
                  <div className="info">
                    <h1>fecha</h1>
                    <p>{dates.date}</p>
                    <h1>hora</h1>
                    <p>{dates.bookingTime}</p>
                  </div>
                  <div className="bookings-services">
                    <h1>servicios</h1>
                    {dates.services.map((services) => (
                      <div key={services.id}>
                        <p>{services.name}</p>
                        <p className="price">${services.price}</p>
                      </div>
                    ))}
                    <h1>precio total</h1>
                    <p className="total-price">${dates.totalPrice}</p>
                    <button onClick={() => handleDeleteBooking(dates.id)}>
                      borrar cita
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-bookings">
                <p>No hay citas agendadas.</p>
              </div>
            )}
          </section>
        </div>
      </section>
    </>
  );
};

export default Profile;
