import express from "express";
import cors from "cors";
import employeeRoutes from "./routes/EmployeeRoute.js"
import projectsRoutes from "./routes/ProjectRoute.js"
import projectAssignmentRoutes from "./routes/ProjectAssignmentRoute.js"


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/employees", employeeRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/project-assignments", projectAssignmentRoutes);

app.get("/", (req, res) => {
    res.send("Hello from Express backend!");
});

app.use((req, res, next) => {
    res.status(404).json({ message: "Not Found" });
})

app.use((err, req, res, next) => {
    console.error("Internal Server Error:", err);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error"})
})

export default app;