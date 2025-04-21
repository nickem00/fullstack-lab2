import express from "express";
import { createEmployee, getAllEmployees } from "../controllers/EmployeeController.js";

const router = express.Router();

router.post("/", createEmployee);
router.get("/", getAllEmployees);

export default router;