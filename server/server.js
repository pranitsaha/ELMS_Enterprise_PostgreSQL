require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes =
require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.listen(5000, () => {
  console.log(
    "Server running on port 5000"
  );
});

app.get("/", (req, res) => {
    res.send("ELMS Backend Running");
});

const authMiddleware =
require("./middleware/authMiddleware");


const dashboardRoutes =
require("./routes/dashboardRoutes");

app.use(
    "/api/dashboard",
    dashboardRoutes
);

const leaveRoutes =
require("./routes/leaveRoutes");

app.use(
  "/api/leaves",
  leaveRoutes
);

const adminRoutes =
require("./routes/adminRoutes");

app.use(
  "/api/admin",
  adminRoutes
);

const reportRoutes =
require("./routes/reportRoutes");

app.use(
  "/api/reports",
  reportRoutes
);
