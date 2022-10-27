const db = require("../config/dbconnection");
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer")//Allows us to run mySQL functions from javascript

// Get all buyers
router.get("/quotes", (req, res) => {
  const getAll = `
  SELECT * FROM quotes
    `;

  db.query(getAll, (err, results) => {
    if (err) throw err;
    res.json({
      status: 200,
      quotes: results,
    });
  });
});

router.get('/quotes/:id', (req, res) => {
  // Query
  const strQry =
      `
SELECT entryType, uid, cusName, cusNo, cusAddress, damageType, insCat, leakDetectMethod, dmgLocation, dmgStatus, RepRecom, qtDesc, summary, jobCat, qtMaterials, scope, total, addNote
FROM quotes
WHERE qteid = ?;
`;
  db.query(strQry, [req.params.id], (err, results) => {
      if (err) throw err;
      res.json({
          status: 200,
          results: (results.length <= 0) ? "Sorry, no quote was found." : results
      })
  })
})
// Delete product
router.delete('/quotes/:id', (req, res) => {
  // Query
  const strQry =
      `
DELETE FROM  quotes 
WHERE qteid = ${req.params.id};
`;
  db.query(strQry, (err, data, fields) => {
      if (err) throw err;
      res.json({
          msg: `Deleted`
      });
  })
});

router.post('/quotes', bodyParser.json(),
     (req, res) => {
         try {

             const bd = req.body;
             // Query
             const strQry =
                 `
        INSERT INTO quotes(entryType, uid, cusName, cusNo, cusAddress, damageType, insCat, leakDetectMethod, dmgLocation, dmgStatus, RepRecom, qtDesc, summary, jobCat, qtMaterials, scope, total, addNote)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
             //
             db.query(strQry,
                 [bd.entryType, bd.uid, bd.cusName, bd.cusNo, bd.cusAddress, bd.damageType, bd.insCat, bd.leakDetectMethod, bd.dmgLocation, bd.dmgStatus, bd.RepRecom, bd.qtDesc, bd.summary, bd.jobCat, bd.qtMaterials, bd.scope, bd.total, bd.addNote],
                 (err, results) => {
                     if (err) throw err
                     res.json({
                        msg:`Added Item`
                    });
                 })
         } catch (e) {
             console.log(`Created new quote`);
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

router.patch('/quotes/:id', (req, res) => {
  const bd = req.body;
  // Query
  const strQry =
      `UPDATE quotes
SET entryType = ?, uid = ?, cusName = ?, cusNo = ?, cusAddress = ?, damageType = ?, insCat = ?, leakDetectMethod = ?, dmgLocation = ?, dmgStatus = ?, RepRecom = ?, qtDesc = ?, summary = ?, jobCat = ?, qtMaterials = ?, scope = ?, total = ?, addNote = ?
WHERE qteid = ${req.params.id}`;

  db.query(strQry, [bd.entryType, bd.quoteName, bd.quoteEmail, bd.quoteNumber, bd.quoteNote, bd.uID], (err, data) => {
      if (err) throw err;
      res.send(`number of affected record/s: ${data.affectedRows}`);
  })
});


module.exports = router;
// Delete a user
// Dependent on the database as it will be linked to a user.
