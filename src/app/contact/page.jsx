"use client";
import "@/css/contact.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../../css/leaflet.css";
const Contact = () => {
  const getRandomCoordinates = () => {
    const minLat = -90;
    const maxLat = 90;
    const minLng = -180;
    const maxLng = 180;
    const lat = 22.256781;
    const lng = -97.849812;
    return [lat, lng];
  };
  const coordinates = getRandomCoordinates();
  return (
    <>
      <section className="contact-hero">
        <h1>contactanos</h1>
        <article className="contact-info">
          <div className="phone">
            <h1>telefono</h1>
            <h2>833 123 456</h2>
          </div>
          <div className="email">
            <h1>correo electronico</h1>
            <h2 className="email-address">barbel@barbel.com</h2>
          </div>
        </article>
      </section>
      <section className="map-container">
        <MapContainer
          center={coordinates}
          zoom={90}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
          <Marker position={coordinates}>
            <Popup>barbel | barberia</Popup>
          </Marker>
        </MapContainer>
      </section>
    </>
  );
};

export default Contact;
