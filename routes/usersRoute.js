const db = require("../config/dbconnection");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const auth = require("../middleware/auth")

// const app = express();
const router = express.Router();

// All USERS
router.get("/users", (req, res) => {
  const getAll = `
        SELECT * FROM users
    `;

  db.query(getAll, (err, results) => {
    if (err) throw err;
    res.json({
      status: 200,
      users: results,
    });
  });
});

 // SINGLE USER
 router.get('/users/:id', (req, res) => {
  // Query

  console.log(req.params.id)
  const strQry =
      `
  SELECT *
  FROM users
  WHERE uid = ${req.params.id};
  `;
  db.query(strQry, [], (err, results) => {
      if (err) throw err;
      res.json({
          status: 200,
          results: (results.length <= 0) ? "Sorry, no user was found." : results
      })
  })
});

// REGISTER
router.post('/register', bodyParser.json(),async (req, res) => {
    const emails = `SELECT * FROM users WHERE userEmail = ?`;
    const bd = req.body;
  
     const  email = bd.userEmail;
     console.log(email);
    

    db.query(emails, email , async (err, results) =>{
      if(results.length > 0){
     res.json({
      msg:"The email already exist"
    });
   
  }
      else{
      let mailTransporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "rared.isaacs@gmail.com",
                    pass: "jsnrsswvfhlbxcbs"
                }
            });
            
    bd.userPassword = await bcrypt.hash(bd.userPassword, 10)
    bd.createdDate = `${new Date().toISOString().slice(0, 10)}`;
    if (bd.userStatus === '' || bd.userSatus === null) {
      bd.userStatus= 'user'
    }
    let details = {
      from: "rared.isaacs@gmail.com",
      to: `${bd.userEmail}`,
      subject: "Sabindi Group Global",
      text: `Welcome To ${bd.userName}`
  }
  mailTransporter.sendMail(details,(err)=>{
    if(err)  throw  err
    else{
        console.log("Email have been sent");
    }
})
    let sql = `INSERT INTO users (userName, userEmail, userNo, userPassword, userStatus)VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [bd.userName, bd.userEmail, bd.userNo, bd.userPassword, bd.userStatus], (err, results) => {
      if (err){
          return {
            msg: "The email already exist"
          }
      }
      else {
        const qe = `SELECT * FROM users WHERE userEmail = ?`;
        db.query(qe, email, (err, results) =>{
          if (err){
            return {
              msg: "something went wrong 404"
            }
        } else{
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
        });

      }
    })};
    })

  });

// lOGIN
router.post('/login',bodyParser.json(),(req,res) => {
  let sql = `SELECT * FROM users WHERE userEmail = ?`
  let email =  req.body.userEmail
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

//UPDATE
  router.put('/users/:id',bodyParser.json(),(req, res) => {
    const bd = req.body;
   bd.userPassword =  bcrypt.hashSync(bd.userPassword, 10)
    // Query
    const strQry =
        `UPDATE users
     SET userName = ?, userEmail = ?, userPassword = ?,userNo = ?, userAddress = ?
     WHERE uid = ${req.params.id}`;
  
    db.query(strQry, [bd.userName, bd.userEmail, bd.userPassword, bd.userNo, bd.userAddress ], (err, data) => {
        if (err) throw err;
        res.json({
          msg:`Updated User`
        });
    })
  });

 //DELETE
 router.delete('/users/:id', (req, res) => {
  // Query
  const strQry =
      `
  DELETE FROM users
  WHERE uid = ?;
  `;
  db.query(strQry, [req.params.id], (err, data, fields) => {
      if (err) throw err;
      res.send(`${data.affectedRows} row was affected`);
  })
});

//DELETE ALL
router.delete('/users',(req, res) =>{
  const strQry =
      `
  DELETE FROM users;
  `;

  db.query(strQry, (err, data, fields) => {
    if (err) throw err;
    res.send(`${data.affectedRows} row was affected`);
})
})

module.exports = router;
