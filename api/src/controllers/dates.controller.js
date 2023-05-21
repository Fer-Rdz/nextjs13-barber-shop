import { Clients } from "../models/clients.js";
import { Date } from "../models/date.js";
import { Services } from "../models/services.js";

export const getDates = async (req, res) => {
  const datesBooking = await Date.findAll({
    include: [Clients, Services],
  });
  res.json(datesBooking);
};

export const getTimeByDate = async (req, res) => {
  const { date } = req.params;
  const times = await Date.findAll({ where: { date } });
  res.json(times);
};

export const saveDates = async (req, res) => {
  const { id, date, bookingTime, isExpired, client_id, services } = req.body;
  const datesBooking = await Date.create({
    id,
    date,
    bookingTime,
    isExpired,
    client_id,
  });
  await datesBooking.addServices(services);
  res.json(datesBooking);
};

export const deleteDateById = async (req, res) => {
  const { id } = req.params;
  await Date.destroy({
    where: {
      id,
    },
  });
  res.send("Date Delete");
};
