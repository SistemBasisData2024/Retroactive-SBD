const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRoute = require("./Routes/UserRoute");

const port = 1466;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/user", userRoute);

app.listen(port, () => {
  console.log("Server starting on port ", port);
});
