import { Clients } from "../models/clients.js";

export const getClients = async (req, res) => {
  const clients = await Clients.findAll();
  res.json(clients);
};

export const getClientsByEmail = async (req, res) => {
  const { email } = req.params;
  const clients = await Clients.findOne({ where: { email } });
  res.json(clients);
};

export const createClient = async (req, res) => {
  const { id, name, lastname, email, password } = req.body;
  const newClient = await Clients.create({
    id,
    name,
    lastname,
    email,
    password,
  });

  res.json(newClient);
};

export const updateClient = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  const client = await Clients.findByPk(id);
  client.email = email;
  client.password = password;
  await client.save();
  res.send("Client updated");
};

export const deleteClient = async (req, res) => {
  const { id } = req.params;
  await Clients.destroy({
    where: {
      id,
    },
  });
  res.send("Enployee Delete");
};
