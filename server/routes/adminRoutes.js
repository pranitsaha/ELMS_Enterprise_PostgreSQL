const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const adminMiddleware =
require("../middleware/adminMiddleware");

const {
  getAllLeaves,
  approveLeave,
  rejectLeave
} = require("../controllers/adminController");

router.get(
  "/leaves",
  authMiddleware,
  adminMiddleware,
  getAllLeaves
);

router.put(
  "/approve/:id",
  authMiddleware,
  adminMiddleware,
  approveLeave
);

router.put(
  "/reject/:id",
  authMiddleware,
  adminMiddleware,
  rejectLeave
);

module.exports = router;