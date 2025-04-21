import express from "express";
import { createEmployee, getAllEmployees } from "../controllers/EmployeeController.js";

const router = express.Router();

router.post("/employees", createEmployee);
router.get("/employees", getAllEmployees);

export default router;