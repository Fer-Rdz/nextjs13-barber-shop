import { Employees } from "../models/employees.js";

export const getEmployees = async (req, res) => {
  const employees = await Employees.findAll();
  res.json(employees);
};

export const getEmployeesEmail = async (req, res) => {
  const { email } = req.params;
  const employees = await Employees.findOne({ where: { email } });
  res.json(employees);
};

export const createEmployee = async (req, res) => {
  const { id, name, lastname, email, password } = req.body;
  const newEmployee = await Employees.create({
    id,
    name,
    lastname,
    email,
    password,
  });
  res.json(newEmployee);
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  const employee = await Employees.findByPk(id);
  employee.email = email;
  employee.password = password;
  await employee.save();
  res.send("Employee updated");
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  await Employees.destroy({
    where: {
      id,
    },
  });
  res.send("Enployee Delete");
};
