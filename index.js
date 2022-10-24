const express = require("express");
const router = express.Router();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();

const usersRoute = require("./routes/usersRoute");
const buyerRoute = require("./routes/buyerRoute");

app.set("port", process.env.PORT || 1517);
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-*", "*");
  next();
});

app.use(
  cors({
    mode: 'no-cors',
    origin: ["http://localhost:8080/", "http://127.0.0.1:8080"],
    credentials: true,
  })
);

app.use(
  router, usersRoute, buyerRoute,
  express.json(),
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

app.listen(app.get("port"), (req, res) => {
    console.log("Connection to server has been established");
    console.log(`Access port at localhost:${app.get("port")}`);
    console.log("Press Ctrl + C to cut connection to the server.");
  });

  app.get("/", function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
  });

