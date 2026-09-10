const pool = require("../config/db");

const getAllLeaves =
async (req, res) => {

  try {

    const result =
      await pool.query(`
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

    res.json(
      result.rows
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const approveLeave =
async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(
      `
      UPDATE leave_requests
      SET status='Approved'
      WHERE id=$1
      `,
      [id]
    );

    res.json({
      message:
      "Leave Approved"
    });

  } catch (error) {

    res.status(500).json({
      message:error.message
    });

  }

};

const rejectLeave =
async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(
      `
      UPDATE leave_requests
      SET status='Rejected'
      WHERE id=$1
      `,
      [id]
    );

    res.json({
      message:
      "Leave Rejected"
    });

  } catch (error) {

    res.status(500).json({
      message:error.message
    });

  }

};

module.exports = {
  getAllLeaves,
  approveLeave,
  rejectLeave
};