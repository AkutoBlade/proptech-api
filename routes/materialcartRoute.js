const express = require("express");
const router = express.Router();
const db = require("../config/dbconnection");
const bodyParser = require("body-parser");



//Get specific user's cart
router.get('/users/:id/mat', (req, res) => {
  let sql = `SELECT mat FROM users WHERE uid = ${req.params.id}`
  db.query(sql, (err, results) => {
    if (err) throw err
    res.json({
      status: 200,
      results: JSON.parse(results[0].mat)
    })
  })
})

//Add items to the user's specific cart
router.post('/users/:id/mat', bodyParser.json(), (req, res) => {
  try {
    let bd = req.body
    let sql = `SELECT mat FROM users WHERE uid = ${req.params.id};`;
    db.query(sql, (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        let cart;
        if (results[0].mat === null) {
          mat = []
        } else {
          mat = JSON.parse(results[0].mat)
        }
        // console.log(results[0].cart);
        // res.send(results[0].cart);
        let material = {
          "mid": mat.length + 1,
          "matName": bd.matName,
          "matDesc": bd.matDesc,
          "matSpecs": bd.matSpecs,
          "matCat": bd.matCat,
          "cost": bd.cost,
          "matUnit": bd.manUnit,
          "sID": bd.sID
        }
        mat.push(material)

        let sql1 = `UPDATE users SET mat = ? WHERE uid = ${req.params.id}`
        db.query(sql1, [JSON.stringify(mat)], (err, results) => {
          if (err) throw err
          res.json({
            status: 200,
            results: results
          })
        })
      } else {
        throw err
      }
    })
  } catch (error) {
    res.send(error)
  }
});

//Delete items from the specific user's cart
router.delete('/users/:id/mat', bodyParser.json(), (req, res) => {
  let bd = req.body
  let sql = `UPDATE users SET mat = null WHERE uid = ${req.params.id}`
  db.query(sql, (err, results) => {
    if (err) throw err
    res.json({
      results: `${req.params.id}`
    })
  })
});

 //Delete specific item
// router.delete('/users/:user_id/cart/:product_id', (req, res) => {
//   const delSingleCartId = `
//         SELECT cart FROM users
//         WHERE user_id = ${req.params.user_id}
//     `
//   db.query(delSingleCartId, (err, results) => {
//     if (err) throw err;
//     if (results.length > 0) {
//       if (results[0].cart != null) {
//         const result = JSON.parse(results[0].cart).filter((cart) => {
//           return cart.product_id != req.params.product_id;
//         })
//         result.forEach((cart, i) => {
//           cart.product_id = i + 1
//         });
//         const query = `
//                     UPDATE users
//                     SET cart = ?
//                     WHERE user_id = ${req.params.user_id}
//                 `
//         db.query(query, [JSON.stringify(result)], (err, results) => {
//           if (err) throw err;
//           res.json({
//             status: 200,
//             result: "Successfully deleted item from cart"
//           });
//         })
//       } else {
//         res.json({
//           status: 400,
//           result: "This user has an empty cart"
//         })
//       }
//     } else {
//       res.json({
//         status: 400,
//         result: "There is no user with that id"
//       });
//     }
//   })
// })

module.exports = router;