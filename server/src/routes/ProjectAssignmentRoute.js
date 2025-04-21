import express from "express";
import { createProjectAssignment, getAllProjectAssignments } from "../controllers/ProjectAssignmentController.js";

const router = express.Router();

router.post("/", createProjectAssignment);
router.get("/", getAllProjectAssignments)

export default router;