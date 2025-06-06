const { Employee, Area } = require("../db");
const employee = require("../services/employee");

class EmployeeController {
  async createEmployee(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        hireDate,
        salary,
        areaId,
        position,
        address,
        emergencyContact,
        emergencyPhone,
        status,
        documents,
      } = req.body;

      const newEmployee = await Employee.create({
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        hireDate,
        salary,
        areaId,
        position,
        address,
        emergencyContact,
        emergencyPhone,
        status,
        documents,
      });

      const employeeWithArea = await Employee.findOne({
        where: { employeeId: newEmployee.employeeId },
        include: [
          {
            model: Area,
            as: "area",
            attributes: ["areaId", "name"],
          },
        ],
      });

      res.status(201).json(employeeWithArea);
    } catch (error) {
      console.error("Error creating employee:", error);
      res.status(500).json({ message: "Error creating employee" });
    }
  }

  async getAllEmployees(req, res) {
    try {
      const employees = await Employee.findAll({
        where: { deleted: false },
        include: [
          {
            model: Area,
            as: "area",
            attributes: ["areaId", "name"],
          },
        ],
        order: [["firstName", "ASC"]],
      });
      res.status(200).json(employees);
    } catch (error) {
      console.error("Error getting employees:", error);
      res.status(500).json({ message: "Error getting employees" });
    }
  }

  async getEmployeeById(req, res) {
    try {
      const { id } = req.params;
      const employee = await Employee.findOne({
        where: { employeeId: id, deleted: false },
        include: [
          {
            model: Area,
            as: "area",
            attributes: ["areaId", "name"],
          },
        ],
      });
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.status(200).json(employee);
    } catch (error) {
      console.error("Error getting employee:", error);
      res.status(500).json({ message: "Error getting employee" });
    }
  }

  async updateEmployee(req, res) {
    try {
      const { id } = req.params;
      const {
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        hireDate,
        salary,
        areaId,
        position,
        address,
        emergencyContact,
        emergencyPhone,
        status,
        documents,
      } = req.body;

      const employee = await Employee.findOne({
        where: { employeeId: id, deleted: false },
      });

      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      await employee.update({
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        hireDate,
        salary,
        areaId,
        position,
        address,
        emergencyContact,
        emergencyPhone,
        status,
        documents,
      });

      const updatedEmployee = await Employee.findOne({
        where: { employeeId: id },
        include: [
          {
            model: Area,
            as: "area",
            attributes: ["areaId", "name"],
          },
        ],
      });

      res.status(200).json(updatedEmployee);
    } catch (error) {
      console.error("Error updating employee:", error);
      res.status(500).json({ message: "Error updating employee" });
    }
  }

  async deleteEmployee(req, res) {
    try {
      const { id } = req.params;
      const employee = await Employee.findOne({
        where: { employeeId: id, deleted: false },
      });
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      await employee.update({ deleted: true });
      res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
      console.error("Error deleting employee:", error);
      res.status(500).json({ message: "Error deleting employee" });
    }
  }

  async getEmployeesByDepartment(req, res) {
    try {
      const employees = await employee.getEmployeesByDepartment(
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
      const employee = await employee.updateEmployeeStatus(
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
