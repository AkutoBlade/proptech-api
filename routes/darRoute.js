const db = require("../config/dbconnection");
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');

router.get("/dar", (req, res) => {
    const getAll = `
    SELECT * FROM dar
      `;
  
    db.query(getAll, (err, results) => {
      if (err) throw err;
      res.json({
        status: 200,
        leads: results,
      });
    });
  });
  
  router.get('/dar/:id', (req, res) => {
    // Query
    const strQry =
        `
  SELECT clientName, date, reportNumber, damageType, facility, damageSeverity, inspectionCategory, leakDetectionMethod, damageLocationInternal, damageLocationExternal, damageStatusConcealed, damageStatusNotConcealed, repairActionRecommendation, executiveSummary, authBy
  FROM dar
  WHERE claimNumber = ?;
  `;
    db.query(strQry, [req.params.id], (err, results) => {
        if (err) throw err;
        res.json({
            status: 200,
            results: (results.length <= 0) ? "Sorry, no DAR with that Claim Number." : results
        })
    })
  });

router.post('/dar',bodyParser.json(),(req,res) => {
    const bd = req.body;
    let sql = `    INSERT INTO dar(claimNumber, date, reportNumber, damageType, facility, damageSeverity uID)
    VALUES(?, ?, ?, ?, ?, ?);`
    db.query(sql,email, async (err,results) => {
      if(err) throw err
      if(results.length === 0){
        res.json({
          msg: "Email does not exist"
        })
      }else{
        const isMatch = await bcrypt.compare(req.body.userPassword, results[0].userPassword);
        if(!isMatch){
          res.json({
            msg: "Incorrect Password"
          })
        }else{
          const payload = {
            user: {
                userName: results[0].userName,
                userEmail: results[0].userEmail,
                userNo: results[0].userNo,
                userPassword: results[0].userPassword,
                userAddress: results[0].userAddress,
                userStatus: results[0].userStatus,
                createdDate: results[0].createdDate,
                updateDate: results[0].updateDate
            },
        };
        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "365d"
        }, (err, token) => {
            if (err) throw err;
            res.json({
              msg: results,
              token: token
            })
            // res.status(200).send("Logged in");
        });
        }
      }
    })
  });
  module.exports = router;