import { useState, useEffect } from "react";
import "./Table.css";

/**
 * Table component that displays project assignments data
 * with sortable columns
 */
function Table() {
    // States for the loading of table content
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // States for sorting the table content
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    // Fetches project assignments from the server
    // and stores them in the assignments state
    // Sets up an interval to refresh the data every minute
    useEffect(() => {
        async function fetchAssignments() {
            console.log(`Fetching assignments at ${new Date().toLocaleTimeString()}`);
            
            try {
                const response = await fetch("http://localhost:5000/api/project-assignments");
                if (!response.ok) {
                    throw new Error("Failed to fetch assignments")
                }
                const data = await response.json();
                setAssignments(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError(error.message);
                setLoading(false);
            }
        }

        fetchAssignments();

        // Set up interval to refresh data every minute
        const intervalId = setInterval(() => {
            fetchAssignments();
        }, 60000);

        // clear the interval when component unmounts
        return () => clearInterval(intervalId);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error}</div>
    }

    /**
     * Handles sorting when column headers are clicked
     * Toggles between ascending and descending order
     */
    function handleSort(field) {
        if (field === sortField) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    }

    // Sort the assignments based on the selected field and order
    // -
    // Using state to store the sorted assignments allows for reactivity
    // and ensures that the component re-renders when the sort order changes
    const sortedAssignments = [...assignments].sort((a, b) => {
        if (!sortField) return 0;

        const aField = getField(a, sortField);
        const bField = getField(b, sortField);

        if (aField < bField) {
            return sortOrder === "asc" ? -1 : 1;
        }
        if (aField > bField) {
            return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
    });

    /**
     * Helper function that extracts values from nested objects
     * using dot notation (e.g., "project_code.project_name")
     */
    function getField(obj, path) {
        return path.split(".").reduce((acc, part) => acc && acc[part], obj)
    }

    return (
        <div className="table-container">
            <h2>Project Assignments</h2>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort("employee_id.employee_id")}>
                            Employee ID {sortField === "employee_id.employee_id" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
                        <th onClick={() => handleSort("employee_id.full_name")}>
                            Employee Name {sortField === "employee_id.full_name" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
                        <th onClick={() => handleSort("project_code.project_name")}>
                            Project Name {sortField === "project_code.project_name" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
                        <th onClick={() => handleSort("start_date")}>
                            Start Date {sortField === "start_date" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedAssignments.map((assignment) => (
                        <tr key={assignment._id}>
                            <td>{assignment.employee_id.employee_id}</td>
                            <td>{assignment.employee_id.full_name}</td>
                            <td>{assignment.project_code.project_name}</td>
                            <td className="start-date">{new Date(assignment.start_date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;