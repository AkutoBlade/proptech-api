const db = require("../config/dbconnection");
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer")//Allows us to run mySQL functions from javascript

// Get all workOrders
router.get("/wos", (req, res) => {
  const getAll = `
  SELECT * FROM workOrders
    `;

  db.query(getAll, (err, results) => {
    if (err) throw err;
    res.json({
      status: 200,
      workOrders: results,
    });
  });
});

router.get('/wos/:id', (req, res) => {
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
router.delete('/wos/:id', (req, res) => {
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

router.post('/wos', bodyParser.json(),
     (req, res) => {
         try {

             const bd = req.body;
             // Query
             const strQry =
                 `
        INSERT INTO workOrders(conID, workers, entryType, jobCat, mat, qteID, poID, jobDesc, uID, workStatus, workerNote, workerTimeKeeping)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
             //
             db.query(strQry,
                 [bd.conID, bd.workers, bd.entryType, bd.jobCat, bd.mat, bd.qteID, bd.poID, bd.jobDesc, bd.uID, bd.workStatus, bd.workerNote, bd.workerTimeKeeping],
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

router.patch('/wos/:id', bodyParser.json(), (req, res) => {
  const bd = req.body;
  // Query
  const strQry =
      `UPDATE workOrders
SET conID = ?, workers = ?, entryType = ?, jobCat = ?, mat = ?, qteID = ?, poID = ?, jobDesc = ?, uID = ?, workStatus = ?, workerNote = ?, workerTimeKeeping = ?
WHERE woid = ${req.params.id}`;

  db.query(strQry, [bd.conID, bd.workers, bd.entryType, bd.jobCat, bd.mat, bd.qteID, bd.poID, bd.jobDesc,bd.uID, bd.workStatus, bd.workerNote, bd.workerTimeKeeping], (err, data) => {
      if (err) throw err;
      res.json({
        msg:`it is updated`
      });
  })
});


module.exports = router;
// Delete a user
// Dependent on the database as it will be linked to a user.
