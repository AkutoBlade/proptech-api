const db = require("../config/dbconnection");
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer")//Allows us to run mySQL functions from javascript

// Get all inventory
router.get("/inventory", (req, res) => {
  const getAll = `
  SELECT * FROM inventory
    `;

  db.query(getAll, (err, results) => {
    if (err) throw err;
    res.json({
      status: 200,
      inventory: results,
    });
  });
});

router.get('/inventory/:id', (req, res) => {
  // Query
  const strQry =
      `
SELECT entryType, inventoryName, inventoryEmail, inventoryNumber, inventoryNote, uID
FROM inventory
WHERE lid = ?;
`;
  db.query(strQry, [req.params.id], (err, results) => {
      if (err) throw err;
      res.json({
          status: 200,
          results: (results.length <= 0) ? "Sorry, no inventory was found." : results
      })
  })
})
// Delete product
router.delete('/inventory/:id', (req, res) => {
  // Query
  const strQry =
      `
DELETE FROM  inventory 
WHERE lid = ${req.params.id};
`;
  db.query(strQry, (err, data, fields) => {
      if (err) throw err;
      res.json({
          msg: `Deleted`
      });
  })
});

router.post('/inventory', bodyParser.json(),
     (req, res) => {
         try {

             const bd = req.body;
             if(!bd.entryType || !bd.inventoryName || !bd.inventoryEmail || !bd.inventoryNumber || !bd.inventoryNote || !bd.uID){
                res.json({
                    msg:`empty fields`
                });
             }

             // Query
             const strQry =
                 `
        INSERT INTO inventory(entryType, inventoryName, inventoryEmail, inventoryNumber, inventoryNote, uID)
        VALUES(?, ?, ?, ?, ?, ?);
        `;
             //
             db.query(strQry,
                 [bd.entryType, bd.inventoryName, bd.inventoryEmail, bd.inventoryNumber, bd.inventoryNote, bd.uID],
                 (err, results) => {
                     if (err) throw err
                     res.json({
                        msg:`Added Item`
                    });
                 })
         } catch (e) {
             console.log(`Created new inventory`);
         }
     });

// Get single buyer
router.get("inventory/:id", (req, res) => {
  try {
    let sql = `SELECT * FROM inventory WHERE bid = ${req.params.bid}`; //Use backticks (`) whenever you want to use something that involves $(not money, the sign)
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.patch('/inventory/:id', (req, res) => {
  const bd = req.body;
  // Query
  const strQry =
      `UPDATE inventory
SET entryType = ?, inventoryName = ?, inventoryEmail = ?, inventoryNumber = ?, inventoryNote = ?, uID = ?
WHERE lid = ${req.params.id}`;

  db.query(strQry, [bd.entryType, bd.inventoryName, bd.inventoryEmail, bd.inventoryNumber, bd.inventoryNote, bd.uID], (err, data) => {
      if (err) throw err;
      res.send(`number of affected record/s: ${data.affectedRows}`);
  })
});


module.exports = router;
// Delete a user
// Dependent on the database as it will be linked to a user.
