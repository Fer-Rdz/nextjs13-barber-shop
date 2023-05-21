"use client";
import { useState, useEffect } from "react";

const Schedule = () => {
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
    "20:00",
  ]);
  const [horasOcupadas, setHorasOcupadas] = useState([]);

  useEffect(() => {
    const fetchHorasOcupadas = async () => {
      const horas = await getHorasOcupadas();
      setHorasOcupadas(horas);
      console.log(horas);
    };
    fetchHorasOcupadas();
  }, []);
  return (
    <>
      <div>
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
            className={horasOcupadas.includes(horas) ? styles.disabledlink : ""}
          >
            {horas}
          </button>
        ))}
      </div>
    </>
  );
};

export default Schedule;
