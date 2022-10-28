const db = require("../config/dbconnection");
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer")//Allows us to run mySQL functions from javascript

// Get all workOrders
router.get("/wo", (req, res) => {
  const getAll = `
  SELECT * FROM workorders
    `;

  db.query(getAll, (err, results) => {
    if (err) throw err;
    res.json({
      status: 200,
      workOrders: results,
    });
  });
});

router.get('/wo/:id', (req, res) => {
  // Query
  const strQry =
      `
SELECT  *
FROM workOrders
WHERE woid = ?;
`;
  db.query(strQry, [req.params.id], (err, results) => {
      if (err) throw err;
      res.json({
          status: 200,
          results: (results.length <= 0) ? "Sorry, no wo was found." : results
      })
  })
})
// Delete product
router.delete('/wo/:id', (req, res) => {
  // Query
  const strQry =
      `
DELETE FROM  workOrders 
WHERE woid = ${req.params.id};
`;
  db.query(strQry, (err, data, fields) => {
      if (err) throw err;
      res.json({
          msg: `Deleted`
      });
  })
});

router.post('/wo', bodyParser.json(),
     (req, res) => {
         try {

             const bd = req.body;
             // Query
             const strQry =
                 `
        INSERT INTO workOrders(conID, workers, entryType, jobCat, mat, qteID, poID, jobDesc, uID, workerStatus, workerNote, workerTimeKeeping)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
             //
             db.query(strQry,
                 [bd.conID, bd.workers, bd.entryType, bd.jobCat, bd.mat, bd.qteID, bd.poID, bd.jobDesc, bd.uID, bd.workerStatus, bd.workerNote, bd.workerTimeKeeping],
                 (err, results) => {
                     if (err) throw err
                     res.json({
                        msg:`Added Item`
                    });
                 })
         } catch (e) {
             console.log(`Created new wo`);
         }
     });

// Get single buyer
// router.get("/:id", (req, res) => {
//   try {
//     let sql = `SELECT * FROM workOrders WHERE woid = ${req.params.woid}`; //Use backticks (`) whenever you want to use something that involves $(not money, the sign)
//     con.query(sql, (err, result) => {
//       if (err) throw err;
//       res.send(result);
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send(error);
//   }
// });

router.patch('/wo/:id', (req, res) => {
  const bd = req.body;
  // Query
  const strQry =
      `UPDATE workOrders
SET entryType = ?, woName = ?, woEmail = ?, woNumber = ?, woNote = ?, uID = ?
WHERE woid = ${req.params.id}`;

  db.query(strQry, [bd.entryType, bd.woName, bd.woEmail, bd.woNumber, bd.woNote, bd.uID], (err, data) => {
      if (err) throw err;
      res.send(`number of affected record/s: ${data.affectedRows}`);
  })
});


module.exports = router;
// Delete a user
// Dependent on the database as it will be linked to a user.
