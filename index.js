const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();

const usersRoute = require("./routes/usersRoute");

app.set("port", process.env.PORT || 1517);
app.use(express.json());
app.use(cors());

app.use(express.static("public"));

app.listen(app.get("port"), (req, res) => {
    console.log("Connection to server has been established");
    console.log(`Access port at localhost:${app.get("port")}`);
    console.log("Press Ctrl + C to cut connection to the server.");
  });

  app.get("/", function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
  });

app.use("/users", usersRoute)

app.use(usersRoute)
