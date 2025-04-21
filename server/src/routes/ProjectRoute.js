import express from "express";
import { createProject } from "../controllers/ProjectController.js";

const router = express.Router();

router.post("/", createProject);

export default router;