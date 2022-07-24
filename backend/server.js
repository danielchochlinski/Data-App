const express = require("express");
const dotenv = require("dotenv").config({ path: __dirname + "../../.env" });
const { errorHandler } = require("./middleware/errorMiddleware");

const port = process.env.PORT || 9000;

const app = express();

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", ["*"]);
  next();
});

app.use(express.json());

app.use("/api/data", require("./routes/databaseRouter"));

app.use(errorHandler);

app.listen(port, () => console.log(`app is listening on port ${port}`));
