import { Router } from "express";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../controllers/services.controller.js";

const router = Router();

router
  .get("/services", getServices)
  .post("/services", createService)
  .delete("/services/:id", deleteService)
  .put("/services/:id", updateService);

export default router;
