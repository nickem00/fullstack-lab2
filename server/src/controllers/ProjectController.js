import Project from "../models/Project.js"

export const createProject = async (req, res, next) => {
    try {
        const { project_code, project_name, project_description } = req.body;

        if (!project_code || !project_name || !project_description) {
            return res.status(400).json({ message: "All field are required" })
        }

        const newProject = new Project({
            project_code,
            project_name,
            project_description
        })

        await newProject.save();

        res.status(201).json({ message: "Project created successfully" })

    } catch (error) {
        console.error("Error while creating new project:");
        if (error.code === 11000) {
            return res.status(400).json({ message: "Project code already exists" })
        }
        next(error);
    }
}