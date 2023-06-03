"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "@/css/services.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";
const Services = () => {
  const router = useRouter();
  const [services, setServices] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:5000/services")
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
      .post("http://localhost:5000/service", {
        name: name,
        price: price,
      })
      .then((response) => {
        alert("servicio añadido");
        window.location.reload();
        // Realizar cualquier acción adicional después de agregar el servicio
      })
      .catch((error) => {
        alert("Error adding service:", error);
        // Manejar errores de la solicitud de creación del servicio
      });
  };

  const handleDeleteService = (serviceId) => {
    axios
      .delete(`http://localhost:5000/services/${serviceId}`)
      .then((response) => {
        console.log("Service deleted:", response.data);
        window.location.reload();
        // Realizar cualquier acción adicional después de eliminar el servicio
      })
      .catch((error) => {
        console.error("Error deleting service:", error);
        // Manejar errores de la solicitud de eliminación
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/services")
      .then((response) => setServices(response.data));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/services").then((response) => {
      // Inicializar el estado 'services' con el precio actual de los servicios
      const initialServices = response.data.map((service) => ({
        ...service,
        editedPrice: service.price,
        edited: false,
      }));
      setServices(initialServices);
    });
  }, []);

  const [editedPrice, setEditedPrice] = useState("");
  const handleEditPrice = (serviceId, newPrice) => {
    const updatedServices = services.map((service) => {
      if (service.id === serviceId) {
        return {
          ...service,
          editedPrice: newPrice,
          edited: true,
        };
      }
      return service;
    });
    setServices(updatedServices);
  };

  const handleSaveChanges = () => {
    // Obtener los servicios con precios editados
    const servicesToUpdate = services.filter(
      (service) => service.price !== service.editedPrice
    );

    // Verificar si hay servicios para actualizar
    if (servicesToUpdate.length === 0) {
      alert("No hay cambios pendientes.");
      return;
    }

    // Enviar una solicitud PUT para actualizar los precios de los servicios
    servicesToUpdate.forEach((service) => {
      axios
        .put(`http://localhost:5000/service/${service.id}`, {
          price: service.editedPrice,
        })
        .then((response) => {
          console.log("Precio actualizado:", response.data);
          // Realizar cualquier acción adicional después de actualizar el precio
        })
        .catch((error) => {
          console.error("Error al actualizar el precio:", error);
          // Manejar errores de la solicitud de actualización
        });
    });

    // Actualizar el estado con los precios editados
    setServices((prevServices) =>
      prevServices.map((service) => ({
        ...service,
        price: service.editedPrice,
      }))
    );

    alert("Cambios guardados exitosamente.");
    window.location.reload();
  };

  return (
    <>
      <section className={styles.services_main}>
        <div className={styles.services_create}>
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
            <button onClick={handleSaveChanges} className={styles.save}>
              Guardar cambios
            </button>
          </div>
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

                    <td>
                      $
                      <input
                        className={
                          services.edited ? styles.editedPrice : styles.prices
                        }
                        type="number"
                        value={services.editedPrice || services.price}
                        onChange={(e) =>
                          handleEditPrice(services.id, e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <button onClick={() => handleDeleteService(services.id)}>
                        Eliminar
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
