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

  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddService = () => {
    // Verificar si el servicio ya existe por su nombre
    const existingService = services.find((service) => service.name === name);

    if (!name || !price) {
      alert("Por favor, completa todos los campos");
      return;
    }
    if (existingService) {
      alert("El servicio ya existe");
      return;
    }
    // Si el servicio no existe, enviar la solicitud POST
    axios
      .post("http://localhost:3512/service", {
        name: name,
        price: price,
      })
      .then((response) => {
        alert("Service added:", response.data);
        // Realizar cualquier acción adicional después de agregar el servicio
      })
      .catch((error) => {
        alert("Error adding service:", error);
        // Manejar errores de la solicitud de creación del servicio
      });
  };

  const handleDeleteService = (serviceId) => {
    axios
      .delete(`http://localhost:3512/services/${serviceId}`)
      .then((response) => {
        console.log("Service deleted:", response.data);
        // Realizar cualquier acción adicional después de eliminar el servicio
      })
      .catch((error) => {
        console.error("Error deleting service:", error);
        // Manejar errores de la solicitud de eliminación
      });
  };

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
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              name=""
              id=""
              placeholder="buscar servicio..."
            />
          </div>
        </div>
        <div className={styles.create}>
          <div>
            <h1>crear servicio</h1>
          </div>
          <input
            type="text"
            placeholder="Nombre del servicio"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button onClick={handleAddService}>Añadir servicio</button>
        </div>
        <section className={styles.table_container}>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.name_row}>
                <th>nombre</th>
                <th>precio</th>
              </tr>
              {services
                ?.filter((services) =>
                  `${services.name} ${services.price}`
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((services) => (
                  <tr key={services.id}>
                    <td>{services.name}</td>

                    <td>${services.price}</td>
                    <td>
                      <button onClick={() => handleDeleteService(services.id)}>
                        Borrar servicio
                      </button>
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

export default Services;
