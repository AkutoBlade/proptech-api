const db = require("../config/dbconnection");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer")//Allows us to run mySQL functions from javascript

// Get all materials
router.get("/materials", (req, res) => {
  const getAll = `
  SELECT * FROM materials
    `;

  db.query(getAll, (err, results) => {
    if (err) throw err;
    res.json({
      status: 200,
      leads: results,
    });
  });
});

// Get one material
router.get("/materials/:id", (req, res) => {
  // Query
  const strQry = `
SELECT *
FROM materials
WHERE mid = ?;
`;
  db.query(strQry, [req.params.id], (err, results) => {
    if (err) throw err;
    res.json({
      status: 200,
      results: results.length <= 0 ? "Sorry, no lead was found." : results,
    });
  });
});

// Delete material
router.delete("/materials/:id", (req, res) => {
  // Query
  const strQry = `
DELETE FROM  materials 
WHERE mid = ${req.params.id};
`;
  db.query(strQry, (err, data, fields) => {
    if (err) throw err;
    res.json({
      msg: `Deleted`,
    });
  });
});

router.post("/materials", bodyParser.json(), (req, res) => {
  try {
    const bd = req.body;
    // Query
    const strQry = `
        INSERT INTO materials(matName, matDesc, matSpecs, MatCat, cost, matUnit, sID)
        VALUES(?, ?, ?, ?, ?, ?, ?);
        `;
    //
    db.query(
      strQry,
      [
        bd.matName,
        bd.matDesc,
        bd.matSpecs,
        bd.MatCat,
        bd.cost,
        bd.matUnit,
        bd.sID,
      ],
      (err, results) => {
        if (err) throw err;
        res.json({
          msg: `Added Item`,
        });
      }
    );
  } catch (e) {
    console.log(`Created new lead`);
  }
});

// Get single buyer
// router.get("materials/:id", (req, res) => {
//   try {
//     let sql = `SELECT * FROM materials WHERE mid = ${req.params.bid}`; //Use backticks (`) whenever you want to use something that involves $(not money, the sign)
//     con.query(sql, (err, result) => {
//       if (err) throw err;
//       res.send(result);
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send(error);
//   }
// });

router.patch("/materials/:id", (req, res) => {
  const bd = req.body;
  // Query
  const strQry = `UPDATE materials
SET matName= ?, matDesc= ?, matSpecs= ?, MatCat= ?,cost = ?,matUnit = ?,  sID= ?
WHERE mid = ${req.params.id}`;

  db.query(
    strQry,
    [
      bd.matName,
      bd.matDesc,
      bd.matSpecs,
      bd.MatCat,
      bd.cost,
      bd.matUnit,
      bd.sID,
    ],
    (err, data) => {
      if (err) throw err;
      res.send(`number of affected record/s: ${data.affectedRows}`);
    }
  );
});

module.exports = router;
// Delete a user
// Dependent on the database as it will be linked to a user.
