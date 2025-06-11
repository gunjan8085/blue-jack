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

module.exports = { app };
