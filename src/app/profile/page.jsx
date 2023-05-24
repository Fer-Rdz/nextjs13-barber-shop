"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import "@/css/profile.css";
import axios from "axios";
const Profile = () => {
  const [getBookings, SetGetBookings] = useState();
  const [login, setLogin] = useState(false);
  const getToken = Cookies.get("auth-token");
  useEffect(() => {
    const getID = Cookies.get("auth-token");
    if (getToken) {
      const login = window.atob(getID.split(".")[1]);
      const parseData = JSON.parse(login);
      setLogin(parseData);
    }
  }, [getToken]);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/date/${login.id}`)
      .then((response) => SetGetBookings(response.data));
  }, [login]);
  return (
    <>
      <section className="profile-container">
        <section className="user-info">
          <h1>hola {login.name}</h1>
        </section>
        <section className="user-bookings">
          {getBookings?.map((dates) => (
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
                <p className="price">${dates.totalPrice}</p>
              </div>
            </div>
          ))}
        </section>
      </section>
    </>
  );
};

export default Profile;
