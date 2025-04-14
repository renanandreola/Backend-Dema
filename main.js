const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://demautomotive.vercel.app/"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// app.use(
//   cors({
//     origin: "http://localhost:3001",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

const database_init = require("./src/database/mongodb");

database_init();

app.use("/dema", require("./src/server"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Listen on port: " + port);
});
