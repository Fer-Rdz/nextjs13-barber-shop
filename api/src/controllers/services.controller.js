import { Services } from "../models/services.js";

export const getServices = async (req, res) => {
  const services = await Services.findAll();
  res.json(services);
};

export const createService = async (req, res) => {
  const { id, name, price } = req.body;
  const newService = await Services.create({
    id,
    name,
    price,
  });
  res.json(newService);
};

export const updateService = async (req, res) => {
  const { id } = req.params;
  const { price, name } = req.body;
  const service = await Services.findByPk(id);
  service.price = price;
  service.name = name;
  await service.save();
  res.send("Service updated");
};

export const deleteService = async (req, res) => {
  const { id } = req.params;
  await Services.destroy({
    where: {
      id,
    },
  });
  res.send("Service Delete");
};
