import mongoose from "mongoose";

/**
 * Schema for project assignments that links employees to projects
 * Uses references to Employee and Project collections
 */
const projectAssignmentSchema = new mongoose.Schema({
  employee_id: { type: mongoose.Schema.Types.ObjectId , ref: "Employee", required: true },
  project_code: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  start_date: { type: Date, required: true }
});

const ProjectAssignment = mongoose.model("ProjectAssignment", projectAssignmentSchema);

export default ProjectAssignment;
