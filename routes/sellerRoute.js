const express = require("express");
const router = express.Router();
const con = require("../library/db_connection");

// Get all
router.get("/", (req, res) => {
  try {
    let sql = "SELECT * FROM sellers";
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Get one
router.get("/:id", (req, res) => {
  try {
    let sql = `SELECT * FROM sellers WHERE sid = ${req.params.sid}`; //Use backticks (`) whenever you want to use something that involves $(not money, the sign)
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Edit a seller
router.patch("/:id", (req, res) => {
  try {
    let sql = `UPDATE sellers SET ? WHERE sid = ${req.body.sid}`;
    const {
      contactName,
      contactEmail,
      contactNo,
      priceRange,
      bathrooms,
      bedrooms,
      propertySize,
      propertyType,
      propertyArea,
      propertyAddress,
      parkingBay,
      yardSize,
      petFriendly,
      note,
    } = req.body;

    let buyer = {
      contactName,
      contactEmail,
      contactNo,
      priceRange,
      bathrooms,
      bedrooms,
      propertySize,
      propertyType,
      propertyArea,
      propertyAddress,
      parkingBay,
      yardSize,
      petFriendly,
      note,
    };
    con.query(sql, buyer, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
