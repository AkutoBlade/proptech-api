const express = require("express");
const router = express.Router();
const con = require("../library/db_connection"); //Allows us to run mySQL functions from javascript

// Get all buyers
router.get("/", (req, res) => {
  try {
    let sql = `SELECT * FROM buyers`; //This is making the function we want to send to mySQL a variable
    con.query(sql, (err, result) => {
      //Sends everything in the brackets to the database
      if (err) throw err; //If there is an error sending information, this will display it
      res.send(result); //If there isn't an error, it will send the result of the "message"
    });
  } catch (error) {
    //Retrieves information from the database
    console.log(error); //If there was an error with the database, it will send it to the console.log
    res.status(400).send(error); //The same as the above, but it will display the error in whatever app/extension we're using to test the connection to the database
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

// Update a user
// When editing, you can user PATCH or PUT
//  PATCH will only change information inputted, meaning if there are 4 rows and you only sent information for 3,
//  the row without new information will remain the same.
// PUT however will always change EVERYTHING, meaning if there are 4 rows and you put in information for 3, the
// row without new information will become empty
router.patch("/:id", (req, res) => {
  try {
    let sql = `UPDATE buyers SET ? WHERE bid = ${req.body.bid}`;
    const {
      contactName,
      contactEmail,
      contactNo,
      budget,
      bathrooms,
      bedrooms,
      propertySize,
      propertyType,
      propertyArea,
      parkingBay,
      yardSize,
      kitchenType,
      petFriendly,
      contactStatus,
      note,
    } = req.body;
    let buyer = {
      contactName,
      contactEmail,
      contactNo,
      budget,
      bathrooms,
      bedrooms,
      propertySize,
      propertyType,
      propertyArea,
      parkingBay,
      yardSize,
      kitchenType,
      petFriendly,
      contactStatus,
      note,
    };
    con.query(sql, buyer, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Delete a user
// Dependent on the database as it will be linked to a user.
