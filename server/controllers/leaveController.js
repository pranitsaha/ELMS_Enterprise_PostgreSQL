const pool = require("../config/db");

const applyLeave = async (req, res) => {
  try {

    const userId = req.user.id;

    const {
      leaveType,
      startDate,
      endDate,
      reason
    } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const totalDays =
      Math.ceil(
        (end - start) /
        (1000 * 60 * 60 * 24)
      ) + 1;

    await pool.query(
      `
      INSERT INTO leave_requests
      (
        employee_id,
        leave_type,
        start_date,
        end_date,
        total_days,
        reason,
        status
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6,'Pending'
      )
      `,
      [
        userId,
        leaveType,
        startDate,
        endDate,
        totalDays,
        reason
      ]
    );

    res.status(201).json({
      message: "Leave Applied Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


const getLeaveHistory = async (req, res) => {

  try {

    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        id,
        leave_type,
        start_date,
        end_date,
        total_days,
        reason,
        status
      FROM leave_requests
      WHERE employee_id = $1
      ORDER BY id DESC
      `,
      [userId]
    );

    res.json(result.rows);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


module.exports = {
  applyLeave,
  getLeaveHistory
};