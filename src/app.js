const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const errorHandler = require("./middlewares/errorHandler");
const notFoundHandler = require("./middlewares/notFoundHandler");

const dataBase = require("./models/dataBase");

const routes = require("./routes/index");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
app.use(helmet());

dataBase
  .authenticate()
  .then(() => {
    dataBase.sync();
    console.log("Successfully connected to the database!");
  })
  .catch((error) => console.log(error));

app.use(routes);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(process.env.port || 5000, console.log("Server started!"));
