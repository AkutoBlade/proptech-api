const db = require("../config/dbconnection");
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer")

// Get all dars
router.get("/dars", (req, res) => {
    const getAll = `
    SELECT * FROM dar
      `;
  
    db.query(getAll, (err, results) => {
      if (err) throw err;
      res.json({
        status: 200,
        dars: results,
      });
    });
  });
  
  // Get one dar
  router.get("/dars/:id", (req, res) => {
    // Query
    const strQry = `
  SELECT *
  FROM dar
  WHERE darid = ?;
  `;
    db.query(strQry, [req.params.id], (err, results) => {
      if (err) throw err;
      res.json({
        status: 200,
        results: results.length <= 0 ? "Sorry, no dar was found." : results,
      });
    });
  });

// DELETE DAR   
router.delete('/dars/:id', (req, res) => {
    // Query
    const strQry =
        `
  DELETE FROM  dar 
  WHERE darid = ${req.params.id};
  `;
    db.query(strQry, (err, data, fields) => {
        if (err) throw err;
        res.json({
            msg: `Deleted`
        });
    })
  });


  //INSERT INTO DAR
router.post('/dars', bodyParser.json(), (req, res) => {
    const add =
        `
    INSERT INTO dar(claimNumber, clientName, date, reportNumber, damageType, facility, damageSeverity, inspectionCategory, leakDetectionMethod, damageLocationInternal, damageLocationExternal, damageStatusConcealed, damageStatusNotConcealed, repairActionRecommendation, executiveSummary, authBy)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    db.query(add, [req.body.claimNumber, req.body.clientName, req.body.date, req.body.reportNumber, req.body.damageType, req.body.facility, req.body.damageSeverity, req.body.inspectionCategory, req.body.leakDetectionMethod, req.body.damageLocationInternal, req.body.damageLocationExternal, req.body.damageStatusConcealed, req.body.damageStatusNotConcealed, req.body.repairActionRecommendation, req.body.executiveSummary, req.body.authBy], (err, results) => {
        if (err) throw err
        res.json({
            status: 204,
            msg: "Damage Assessment Report Succesfully Filed"
        })
    })
})

router.patch('/dars/:id', (req, res) => {
    const bd = req.body;
    // Query
    const strQry =
        `UPDATE dar
  SET claimNumber = ?, clientName = ?, date = ?, reportNumber = ?, damageType = ?, facility = ?, damageSeverity = ?, inspectionCategory = ?, leakDetectionMethod = ?, damageLocationInternal = ?, damageLocationExternal = ?, damageStatusConcealed = ?, damageStatusNotConcealed = ?, repairActionRecommendation = ?, executiveSummary = ?, authBy = ?
  WHERE claimNumber = ${req.params.id}`;
    
    db.query(strQry, [bd.claimNumber, bd.clientName, bd.date, bd.reportNumber, bd.damageType, bd.facility, bd.damageSeverity, bd.inspectionCategory, bd.leakDetectionMethod, bd.damageLocationInternal, bd.damageLocationExternal, bd.damageStatusConcealed, bd.damageStatusNotConcealed, bd.repairActionRecommendation, bd.executiveSummary, bd.authBy], (err, data) => {
        if (err) throw err;
        res.json({
          msg:`Edited`
      });
    })
  });

     module.exports = router;