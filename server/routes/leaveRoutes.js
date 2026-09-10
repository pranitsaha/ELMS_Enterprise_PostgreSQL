const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
  applyLeave
} = require("../controllers/leaveController");

router.post(
  "/apply",
  authMiddleware,
  applyLeave
);

module.exports = router;