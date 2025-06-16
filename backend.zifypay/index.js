require("dotenv").config();
const { app } = require("./app");
require("./configs/database.config");

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown on process exit
const handleShutdown = (signal) => {
  console.log(`${signal} received. Shutting down...`);
  console.log("Server shut down gracefully");
  process.exit(0);
};

process.on("SIGINT", () => handleShutdown("SIGINT"));
process.on("SIGTERM", () => handleShutdown("SIGTERM"));
