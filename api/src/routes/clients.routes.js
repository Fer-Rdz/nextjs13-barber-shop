import { Router } from "express";
import {
  getClients,
  getClientsByEmail,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/clients.controller.js";

const router = Router();

router
  .get("/clients", getClients)
  .get("/clients/:email", getClientsByEmail)
  .post("/clients", createClient)
  .delete("/clients/:id", deleteClient)
  .put("/clients/:id", updateClient);

export default router;
