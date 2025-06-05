const express = require("express");
const router = express.Router();
const employeeController = require("../../controlers/employeeController");

// Create a new employee
router.post("/", employeeController.createEmployee);

// Get all employees with pagination and filters
router.get("/", employeeController.getAllEmployees);

// Get employee by ID
router.get("/:id", employeeController.getEmployeeById);

// Update employee
router.put("/:id", employeeController.updateEmployee);

// Delete employee
router.delete("/:id", employeeController.deleteEmployee);

// Get employees by department
router.get(
  "/department/:department",
  employeeController.getEmployeesByDepartment
);

// Update employee status
router.patch("/:id/status", employeeController.updateEmployeeStatus);

module.exports = router;
