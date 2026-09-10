const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
  applyLeave,
  getLeaveHistory
} = require("../controllers/leaveController");

router.post(
  "/apply",
  authMiddleware,
  applyLeave
);

router.get(
  "/history",
  authMiddleware,
  getLeaveHistory
);

module.exports = router;