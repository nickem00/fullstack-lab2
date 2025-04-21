import ProjectAssignment from "../models/ProjectAssignment.js"
import Employee from "../models/Employee.js";
import Project from "../models/Project.js";

export const createProjectAssignment = async (req, res, next) => {
    try {
        const { employee_id, project_code, start_date } = req.body;

        if (!employee_id || !project_code || !start_date) {
            return res.status(400).json({ message: "All fields are required" })
        }

    
        const employee = await Employee.findOne({ employee_id })
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" })
        }
        const project = await Project.findOne({ project_code })
        if (!project) {
            return res.status(404).json({ message: "Project not found" })
        }

        const newAssignment = new ProjectAssignment({
            employee_id: employee._id,
            project_code: project._id,
            start_date
        });

        await newAssignment.save();

        res.status(201).json({ message: "Project assignment created successfully"})

    } catch (error) {
        console.error("Error while creating Project Assignment:");
        next(error);
    }
}

export const getAllProjectAssignments = async (req, res, next) => {
    try {
        const allAssignments = await ProjectAssignment
            .find()
            .populate("employee_id", "-hashed_password -__v")
            .populate("project_code", "-__v");


        res.status(200).json(allAssignments);
    } catch (error) {
        console.error("Error while fetching all projectAssignments:");
        next(error);
    }
}