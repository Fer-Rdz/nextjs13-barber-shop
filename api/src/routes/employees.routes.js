import { Router } from "express";
import {
  getEmployees,
  createEmployee,
  deleteEmployee,
  updateEmployee,
  getEmployeesEmail,
} from "../controllers/employees.controller.js";

const router = Router();

router.get("/employees", getEmployees);
router.get("/employees/:email", getEmployeesEmail);
router.post("/employees", createEmployee);
router.delete("/employees/:id", deleteEmployee);
router.put("/employees/:id", updateEmployee);

export default router;
