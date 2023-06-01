import { Router } from "express";
import {
  getServices,
  createService,
  updateService,
  deleteService,
  createServices
} from "../controllers/services.controller.js";

const router = Router();

router
  .get("/services", getServices)
  .post("/service", createService)
  .post("/services/", createServices)
  .delete("/services/:id", deleteService)
  .put("/service/:id", updateService);

export default router;
