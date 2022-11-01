const db = require("../config/dbconnection");
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer")//Allows us to run mySQL functions from javascript

// Get all buyers
router.get("/pos", (req, res) => {
  const getAll = `
  SELECT * FROM purchaseOrder
    `;

  db.query(getAll, (err, results) => {
    if (err) throw err;
    res.json({
      status: 200,
      purchaseOrders: results,
    });
  });
});

router.get('/pos/:id', (req, res) => {
  // Query
  const strQry =
      `
SELECT qteID, otp, sID, mat
FROM purchaseOrder
WHERE poid = ?;
`;
  db.query(strQry, [req.params.id], (err, results) => {
      if (err) throw err;
      res.json({
          status: 200,
          results: (results.length <= 0) ? "Sorry, no Purchase Order was found." : results
      })
  })
})
// Delete product
router.delete('/pos/:id', (req, res) => {
  // Query
  const strQry =
      `
DELETE FROM  purchaseOrder 
WHERE poid = ${req.params.id};
`;
  db.query(strQry, (err, data, fields) => {
      if (err) throw err;
      res.json({
          msg: `Deleted`
      });
  })
});

router.post('/pos', bodyParser.json(),
     (req, res) => {
         try {

             const bd = req.body;
             // Query
             const strQry =
                 `
        INSERT INTO purchaseOrder(qteID, otp, sID, mat)
        VALUES(?, ?, ?, ?);
        `;
             //
             db.query(strQry,
                 [bd.qteID, bd.otp, bd.sID, bd.mat],
                 (err, results) => {
                     if (err) throw err
                     res.json({
                        msg:`Added Item`
                    });
                 })
         } catch (e) {
             console.log(`Created new purchase order`);
         }
     });

// Get single buyer
// router.get("PO/:id", (req, res) => {
//   try {
//     let sql = `SELECT * FROM buyers WHERE bid = ${req.params.bid}`; //Use backticks (`) whenever you want to use something that involves $(not money, the sign)
//     con.query(sql, (err, result) => {
//       if (err) throw err;
//       res.send(result);
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send(error);
//   }
// });

router.patch('/pos/:id', (req, res) => {
  const bd = req.body;
  // Query
  const strQry =
      `UPDATE purchaseOrder
SET qteID = ?, otp = ?, sID = ?, mat = ?
WHERE poid = ${req.params.id}`;

  db.query(strQry, [bd.qteID, bd.otp, bd.sID, bd.mat], (err, data) => {
      if (err) throw err;
      res.send(`number of affected record/s: ${data.affectedRows}`);
  })
});


module.exports = router;
// Delete a user
// Dependent on the database as it will be linked to a user.
