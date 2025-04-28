import ProjectAssignment from "../models/ProjectAssignment.js"
import Employee from "../models/Employee.js";
import Project from "../models/Project.js";

/**
 * Creates a new project assignment after validating employee and project existence
 */
export const createProjectAssignment = async (req, res, next) => {
    try {
        const { employee_id, project_code, start_date } = req.body;

        if (!employee_id || !project_code || !start_date) {
            return res.status(400).json({ message: "All fields are required" })
        }

        // Validate that referenced entities exist in the database
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

/**
 * Retrieves all project assignments with populated employee and project data
 */
export const getAllProjectAssignments = async (req, res, next) => {
    try {
        // Populate references to get full employee and project details
        // Excludes sensitive or unnecessary fields from the response
        const allAssignments = await ProjectAssignment
            .find()
            .sort({ start_date: -1})
            .limit(5)
            .populate("employee_id", "-hashed_password -__v")
            .populate("project_code", "-__v");


        res.status(200).json(allAssignments);
    } catch (error) {
        console.error("Error while fetching all projectAssignments:");
        next(error);
    }
}