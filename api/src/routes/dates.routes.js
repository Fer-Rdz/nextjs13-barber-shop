import { Router } from "express";
import {
  deleteDateById,
  getDates,
  getTimeByDate,
  getTimeByUserId,
  saveDates,
} from "../controllers/dates.controller.js";

const router = Router();

router
  .get("/dates", getDates)
  .get("/dates/:date", getTimeByDate)
  .get("/date/:client_id", getTimeByUserId)
  .post("/dates", saveDates)
  .delete("/dates/:id", deleteDateById);

export default router;
