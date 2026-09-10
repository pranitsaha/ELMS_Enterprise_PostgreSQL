const pool = require("../config/db");

const getReport = async (req, res) => {

  try {

    const employeeCount =
      await pool.query(
        "SELECT COUNT(*) FROM employees"
      );

    const approvedLeaves =
      await pool.query(
        "SELECT COUNT(*) FROM leave_requests WHERE status='Approved'"
      );

    const pendingLeaves =
      await pool.query(
        "SELECT COUNT(*) FROM leave_requests WHERE status='Pending'"
      );

    const rejectedLeaves =
      await pool.query(
        "SELECT COUNT(*) FROM leave_requests WHERE status='Rejected'"
      );

    res.json({
      employees:
        Number(employeeCount.rows[0].count),

      approved:
        Number(approvedLeaves.rows[0].count),

      pending:
        Number(pendingLeaves.rows[0].count),

      rejected:
        Number(rejectedLeaves.rows[0].count)
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  getReport
};