const { Employee } = require("../db");
const { Op } = require("sequelize");

class EmployeeService {
  async createEmployee(employeeData) {
    try {
      const employee = await Employee.create(employeeData);
      return employee;
    } catch (error) {
      throw new Error(`Error creating employee: ${error.message}`);
    }
  }

  async getAllEmployees(query = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        search,
        department,
        status,
        sortBy = "createdAt",
        sortOrder = "DESC",
      } = query;

      const offset = (page - 1) * limit;
      const where = {};

      if (search) {
        where[Op.or] = [
          { firstName: { [Op.iLike]: `%${search}%` } },
          { lastName: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
        ];
      }

      if (department) {
        where.department = department;
      }

      if (status) {
        where.status = status;
      }

      const { count, rows } = await Employee.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [[sortBy, sortOrder]],
      });

      return {
        total: count,
        page: parseInt(page),
        totalPages: Math.ceil(count / limit),
        employees: rows,
      };
    } catch (error) {
      throw new Error(`Error fetching employees: ${error.message}`);
    }
  }

  async getEmployeeById(id) {
    try {
      const employee = await Employee.findByPk(id);
      if (!employee) {
        throw new Error("Employee not found");
      }
      return employee;
    } catch (error) {
      throw new Error(`Error fetching employee: ${error.message}`);
    }
  }

  async updateEmployee(id, updateData) {
    try {
      const employee = await Employee.findByPk(id);
      if (!employee) {
        throw new Error("Employee not found");
      }

      await employee.update(updateData);
      return employee;
    } catch (error) {
      throw new Error(`Error updating employee: ${error.message}`);
    }
  }

  async deleteEmployee(id) {
    try {
      const employee = await Employee.findByPk(id);
      if (!employee) {
        throw new Error("Employee not found");
      }

      await employee.destroy();
      return { message: "Employee deleted successfully" };
    } catch (error) {
      throw new Error(`Error deleting employee: ${error.message}`);
    }
  }

  async getEmployeesByDepartment(department) {
    try {
      const employees = await Employee.findAll({
        where: { department },
        order: [["lastName", "ASC"]],
      });
      return employees;
    } catch (error) {
      throw new Error(
        `Error fetching employees by department: ${error.message}`
      );
    }
  }

  async updateEmployeeStatus(id, status) {
    try {
      const employee = await Employee.findByPk(id);
      if (!employee) {
        throw new Error("Employee not found");
      }

      if (!["active", "inactive", "on_leave"].includes(status)) {
        throw new Error("Invalid status");
      }

      await employee.update({ status });
      return employee;
    } catch (error) {
      throw new Error(`Error updating employee status: ${error.message}`);
    }
  }
}

module.exports = new EmployeeService();
