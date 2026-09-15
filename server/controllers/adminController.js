const pool = require("../config/db");

const getAllLeaves = async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT
        l.id,
        e.name,
        l.leave_type,
        l.start_date,
        l.end_date,
        l.total_days,
        l.reason,
        l.status
      FROM leave_requests l
      JOIN employees e
      ON e.id = l.employee_id
      ORDER BY l.id DESC
    `);

    res.json(result.rows);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const approveLeave = async (req, res) => {

  try {

    const { id } = req.params;

    // Fetch leave details
    const leaveResult = await pool.query(
      `
      SELECT
        employee_id,
        total_days,
        status
      FROM leave_requests
      WHERE id = $1
      `,
      [id]
    );

    if (leaveResult.rows.length === 0) {

      return res.status(404).json({
        message: "Leave Request Not Found"
      });

    }

    const leave = leaveResult.rows[0];

    // Prevent duplicate approval
    if (leave.status === "Approved") {

      return res.status(400).json({
        message: "Leave Already Approved"
      });

    }

    // Approve Leave
    await pool.query(
      `
      UPDATE leave_requests
      SET status = 'Approved'
      WHERE id = $1
      `,
      [id]
    );

    // Reduce leave balance
    await pool.query(
      `
      UPDATE employees
      SET leave_balance =
          leave_balance - $1
      WHERE id = $2
      `,
      [
        leave.total_days,
        leave.employee_id
      ]
    );

    res.json({
      message: "Leave Approved Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const rejectLeave = async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(
      `
      UPDATE leave_requests
      SET status = 'Rejected'
      WHERE id = $1
      `,
      [id]
    );

    res.json({
      message: "Leave Rejected Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  getAllLeaves,
  approveLeave,
  rejectLeave
};