import Employee from "../models/Employee.js"
import bcrypt from "bcryptjs";

export const createEmployee = async (req, res, next) => {
    try {
        const { employee_id, full_name, email, password } = req.body;

        if (!employee_id || !full_name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newEmployee = new Employee({
            employee_id,
            full_name,
            email,
            hashed_password: hashedPassword
        })

        await newEmployee.save();

        res.status(201).json({ message: "Employee created successfully" })

    } catch (error) {
        console.error("Error while creating Employee:");
        if (error.code === 11000) {
            return res.status(400).json({ message: "Employee ID already exists" })
        }
        next(err);
    }
}

export const getAllEmployees = async (req, res, next) => {
    try {
        const allEmployees = await Employee.find();

        res.status(200).json(allEmployees);

    } catch (error) {
        console.error("Error while fetching all employees:");
        next(error);
    }
}
