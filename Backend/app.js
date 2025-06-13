const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router");
const errorHandler = require("./middlewares/errorHandler.middleware");

// Middlewares
app.use(
  cors({
    origin: "*",
  })
);
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const startTime = Date.now();

  res.on('finish', () => {
      const duration = Date.now() - startTime;
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });

    next();
});
// Router
app.use(router);
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API" });
});
// Making public folder accessible
app.use("/public", express.static("public"));

// Error Handling Middleware
app.use(errorHandler);

// 404 Error Handling
app.use((req, res, next) => {
  res.status(404).json({ message: "Route Not Found" });
});

// Business Routes
const businessRoutes = require("../Backend/routes/business.route");
app.use("/api/v1/business", businessRoutes);

// Employee Routes
const employeeRoutes = require("../Backend/routes/employee.route");
app.use("/api/v1/employee", employeeRoutes);



module.exports = { app };
