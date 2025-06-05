const employeeService = require("../services/employeeService");

class EmployeeController {
  async createEmployee(req, res) {
    try {
      const employee = await employeeService.createEmployee(req.body);
      res.status(201).json({
        success: true,
        data: employee,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getAllEmployees(req, res) {
    try {
      const employees = await employeeService.getAllEmployees(req.query);
      res.status(200).json({
        success: true,
        ...employees,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getEmployeeById(req, res) {
    try {
      const employee = await employeeService.getEmployeeById(req.params.id);
      res.status(200).json({
        success: true,
        data: employee,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  }

  async updateEmployee(req, res) {
    try {
      const employee = await employeeService.updateEmployee(
        req.params.id,
        req.body
      );
      res.status(200).json({
        success: true,
        data: employee,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  async deleteEmployee(req, res) {
    try {
      const result = await employeeService.deleteEmployee(req.params.id);
      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getEmployeesByDepartment(req, res) {
    try {
      const employees = await employeeService.getEmployeesByDepartment(
        req.params.department
      );
      res.status(200).json({
        success: true,
        data: employees,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  async updateEmployeeStatus(req, res) {
    try {
      const { status } = req.body;
      const employee = await employeeService.updateEmployeeStatus(
        req.params.id,
        status
      );
      res.status(200).json({
        success: true,
        data: employee,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = new EmployeeController();
