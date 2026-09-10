const pool = require("../config/db");

const getDashboard = async (req, res) => {

  try {

    const userId = req.user.id;

    const employeeResult = await pool.query(
      `
      SELECT leave_balance
      FROM employees
      WHERE id = $1
      `,
      [userId]
    );

    const approvedResult = await pool.query(
      `
      SELECT COUNT(*)
      FROM leave_requests
      WHERE employee_id = $1
      AND status = 'Approved'
      `,
      [userId]
    );

    const pendingResult = await pool.query(
      `
      SELECT COUNT(*)
      FROM leave_requests
      WHERE employee_id = $1
      AND status = 'Pending'
      `,
      [userId]
    );

    const leaveBalance =
      employeeResult.rows[0]?.leave_balance || 20;

    const usedLeave =
      Number(
        approvedResult.rows[0].count
      );

    const pendingLeave =
      Number(
        pendingResult.rows[0].count
      );

    res.json({
      totalLeave: 20,
      usedLeave,
      availableLeave: leaveBalance,
      pendingLeave
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  getDashboard
};