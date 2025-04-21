import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  project_code: { type: String, unique: true, required: true },
  project_name: { type: String, required: true },
  project_description: { type: String, required: true }
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
