const express = require("express");
require("dotenv").config();

const app = express();

// config
const PORT = process.env.PORT || 5000;
const VERSION = process.env.VERSION || "v1";

// middleware
app.use(express.json());

// root route
app.get("/", (req, res) => {
  res.send("new deployment applied ");
});

app.get("/version", (req, res) => {
  res.json({
    version: process.env.VERSION,
    pid: process.pid
  });
});



// health check route (for deployment validation)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "application is running",
    version: VERSION,
    time: new Date().toISOString()
  });
});


// version route (helps during deployment demos)
app.get("/version", (req, res) => {
  res.json({
    version: VERSION,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});


// start server
app.listen(PORT, () => {
  console.log(`server started on port ${PORT} | version: ${VERSION}`);
});
