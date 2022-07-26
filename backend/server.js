const path = require("path");
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

//serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Set production environment"));
}
app.use(errorHandler);

app.listen(port, () => console.log(`app is listening on port ${port}`));
