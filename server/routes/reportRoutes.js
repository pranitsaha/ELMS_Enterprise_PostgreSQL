const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const adminMiddleware =
require("../middleware/adminMiddleware");

const {
  getReport
} = require("../controllers/reportController");

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getReport
);

module.exports = router;