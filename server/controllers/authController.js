const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../config/db");

const registerUser = async (req, res) => {
  try {
    const {
      employeeId,
      name,
      email,
      password,
      department
    } = req.body;

    const existingUser = await pool.query(
      "SELECT * FROM employees WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    await pool.query(
      `INSERT INTO employees
      (
        employee_id,
        name,
        email,
        password,
        department,
        role,
        leave_balance
      )
      VALUES
      ($1,$2,$3,$4,$5,'Employee',20)`,
      [
        employeeId,
        name,
        email,
        hashedPassword,
        department
      ]
    );

    res.status(201).json({
      message: "Employee Registered Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM employees WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid Email"
      });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      message: "Login Successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  registerUser,
  loginUser
};