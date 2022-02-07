const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const errorHandler = require("./middlewares/errorHandler");
const notFoundHandler = require("./middlewares/notFoundHandler");

const dataBase = require("./models/dataBase");
const relations = require("./models/relations");

const routes = require("./routes/index");

const app = express();

app.use(express.json());
app.use("/uploads/images", express.static(path.join("uploads", "images")));
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
    relations();
    console.log("Successfully connected to the database!");
  })
  .catch((error) => console.log(error));

app.use(routes);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(process.env.PORT || 5000, console.log("Server started!"));
