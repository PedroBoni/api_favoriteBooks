const express = require("express");
const cors = require("cors");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", require("./routes"));

app.listen(3005);
