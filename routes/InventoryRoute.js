const con = require("../config/dbconnection");
const express = require("express");
const router = express.Router();
// const bodyParser = require("body-parser");
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer")//Allows us to run mySQL functions from javascript

// Get all inventory
router.get("/inventory", (req, res) => {
  const getAll = `
  SELECT * FROM Inventory
    `;

  con.query(getAll, (err, results) => {
    if (err) throw err;
    res.json({
      status: 200,
      inventory: results,
    });
  });
});

// Get single
router.get("/inventory/:id", (req, res) => {
  try {
    let sql = `SELECT * FROM Inventory WHERE invenID = ${req.params.id}`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Insert a new item
router.post("/inventory", (req, res) => {
  try {
    let sql = "INSERT INTO Inventory SET ?";
    let { Equipment, Stock } = req.body;
    let Inventory = { Equipment, Stock };
    con.query(sql, Inventory, (err) => {
      if (err) throw err;
      res.json({ msg: "Item has been added" });
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Delete product
router.delete("/inventory/:id", (req, res) => {
  try {
    let sql = `DELETE FROM * Inventory WHERE invenID = ${req.params.id}`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length !== 0) {
        res.json("The item has been removed");
      } else {
        res.json({ msg: "The item you are looking for doesn't exist" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Edit stock
router.patch("/inventory/:id", (req, res) => {
  try {
    let sql = `UPDATE Inventory SET ? WHERE invenID = ${req.params.id}`;
    let { Equipment, Stock } = req.body;
    let Inventory = { Equipment, Stock };
    con.query(sql, Inventory, (err, result) => {
      if (err) throw err;
      res.json({ msg: "The item has been edited" });
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
// // Update time the stock was borrowed
// router.patch("/inventory/:id", (req, res) => {
//   try {
//     let sql = `UPDATE Inventory SET ? WHERE invenID = ${req.params.id}`;
//     const { TakenOut } = req.body;
//     let Inventory = { TakenOut };
//     con.query(sql, Inventory, (req, res) => {
//       if (err) throw err;
//       res.json("Stock has been taken out.");
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send(error);
//   }
// });

// //Update the time the stock was brought back
// router.patch("/inventory/:id", (req, res) => {
//   try {
//     let sql = `UPDATE Inventory SET ? WHERE invenID = ${req.params.id}`;
//     const { TimeIn } = req.body;
//     let Inventory = { TimeIn };
//     con.query(sql, Inventory, (req, res) => {
//       if (err) throw err;
//       res.json("Stock has been brought back in.");
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send(error);
//   }
// });

module.exports = router;
