const express = require("express");
const router = express.Router();
const employee = require("../../controlers/employee");

// Create a new employee
router.post("/", employee.createEmployee);

// Get all employees with pagination and filters
router.get("/", employee.getAllEmployees);

// Get employee by ID
router.get("/:id", employee.getEmployeeById);

// Update employee
router.put("/:id", employee.updateEmployee);

// Delete employee
router.delete("/:id", employee.deleteEmployee);

// Get employees by department
router.get("/department/:department", employee.getEmployeesByDepartment);

// Update employee status
router.patch("/:id/status", employee.updateEmployeeStatus);

module.exports = router;
