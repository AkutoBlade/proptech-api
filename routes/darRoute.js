const db = require("../config/dbconnection");
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');

// All DARS
router.get('/dar', (req, res) => {
  const getAll = `
      SELECT * FROM dar
  `;

  db.query(getAll, (err, results) => {
      if (err) throw err
      res.json({
          status: 200,
          dar: results
      });
  });
});

// SINGLE DAR
router.get('/dar/:id', (req, res) => {
  const getSingle = `
      SELECT * FROM dar WHERE claimNumber = ${req.params.id}
  `

  db.query(getSingle, (err, results) => {
      if (err) throw err
      res.json({
          status: 200,
          dar: results
      })
  })
});


  
router.post('/dar', bodyParser.json(),
(req, res) => {
    try {

        const bd = req.body;
        // Query
        const strQry =
            `
   INSERT INTO dar(clientName, date, reportNumber, damageType, facility, damageSeverity, inspectionCategory, leakDetectionMethod, damageLocationInternal, damageLocationExternal, damageStatusConcealed, damageStatusNotConcealed, repairActionRecommendation, executiveSummary, authBy)
   VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
   `;
        //
        db.query(strQry,
            [bd.clientName, bd.date, bd.reportNumber, bd.damageType, bd.facility, bd.damageSeverity, bd.inspectionCategory, bd.leakDetectionMethod, bd.damageLocationInternal, bd.damageLocationExternal, bd.damageStatusConcealed, bd.damageStatusNotConcealed, bd.repairActionRecommendation, bd.executiveSummary, bd.authBy],
            (err, results) => {
                if (err) throw err
                res.json({
                   msg:`Added Item`
               });
            })
    } catch (e) {
        console.log(`Created New Damage Assessment Report`);
    }
});



router.patch('/dar/:id', (req, res) => {
    const bd = req.body;
    // Query
    const strQry =
        `UPDATE dar
  SET entryType = ?, leadName = ?, leadEmail = ?, leadNumber = ?, leadNote = ?, uID = ?, UpdatedBy = ?
  WHERE lid = ${req.params.id}`;
  
  bd.UpdatedBy= `${new Date().toISOString().slice(0, 10)}`;
  
    db.query(strQry, [bd.entryType, bd.leadName, bd.leadEmail, bd.leadNumber, bd.leadNote, bd.uID, bd.UpdatedBy], (err, data) => {
        if (err) throw err;
        res.json({
          msg:`Edited`
      });
    })
  });
  module.exports = router;