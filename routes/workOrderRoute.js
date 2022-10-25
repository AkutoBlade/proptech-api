const db = require("../config/dbconnection");
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer")//Allows us to run mySQL functions from javascript

// Get all buyers
router.get("/leads", (req, res) => {
  const getAll = `
  SELECT * FROM leads
    `;

  db.query(getAll, (err, results) => {
    if (err) throw err;
    res.json({
      status: 200,
      leads: results,
    });
  });
});

router.get('/leads/:id', (req, res) => {
  // Query
  const strQry =
      `
SELECT entryType, leadName, leadEmail, leadNumber, leadNote, uID
FROM leads
WHERE lid = ?;
`;
  db.query(strQry, [req.params.id], (err, results) => {
      if (err) throw err;
      res.json({
          status: 200,
          results: (results.length <= 0) ? "Sorry, no lead was found." : results
      })
  })
})
// Delete product
router.delete('/leads/:id', (req, res) => {
  // Query
  const strQry =
      `
DELETE FROM  leads 
WHERE lid = ${req.params.id};
`;
  db.query(strQry, (err, data, fields) => {
      if (err) throw err;
      res.json({
          msg: `Deleted`
      });
  })
});

router.post('/leads', bodyParser.json(),
     (req, res) => {
         try {

             const bd = req.body;
             // Query
             const strQry =
                 `
        INSERT INTO leads(entryType, leadName, leadEmail, leadNumber, leadNote, uID)
        VALUES(?, ?, ?, ?, ?, ?);
        `;
             //
             db.query(strQry,
                 [bd.entryType, bd.leadName, bd.leadEmail, bd.leadNumber, bd.leadNote, bd.uID],
                 (err, results) => {
                     if (err) throw err
                     res.json({
                        msg:`Added Item`
                    });
                 })
         } catch (e) {
             console.log(`Created new lead`);
         }
     });

// Get single buyer
router.get("/:id", (req, res) => {
  try {
    let sql = `SELECT * FROM buyers WHERE bid = ${req.params.bid}`; //Use backticks (`) whenever you want to use something that involves $(not money, the sign)
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.patch('/leads/:id', (req, res) => {
  const bd = req.body;
  // Query
  const strQry =
      `UPDATE leads
SET entryType = ?, leadName = ?, leadEmail = ?, leadNumber = ?, leadNote = ?, uID = ?
WHERE lid = ${req.params.id}`;

  db.query(strQry, [bd.entryType, bd.leadName, bd.leadEmail, bd.leadNumber, bd.leadNote, bd.uID], (err, data) => {
      if (err) throw err;
      res.send(`number of affected record/s: ${data.affectedRows}`);
  })
});


module.exports = router;
// Delete a user
// Dependent on the database as it will be linked to a user.
