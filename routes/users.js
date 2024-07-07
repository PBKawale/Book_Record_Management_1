const express = require("express");
const { users } = require("../data/users.json"); //import all the users

const router = express.Router();

// Route: /users ==> "/"
// Method: GET
// Description: Get all users
//Access: Public
//Parameters: None

const { Router } = require("express");

// https://localhost:8081/users/user ==> if you don't want to write in this way except of  'router.get("/user", (req, res) => {' writing in this way just write as given below
// you don't need to write the users again and again
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

// https://localhost:8081/users/4     ==> this is always an request
// Route: /users/:id ==> "/:id"
// Method: GET
// Description: Get single user by their id
//Access: Public
//Parameters: id

router.get("/:id", (req, res) => {
  const { id } = req.params; // params ==> parameters (here each is method of params)  // the params not only has id but many more features inorder to get only id we write id indide {} i.e {id}
  const user = users.find((each) => each.id === id); //here users is inside data folder, here if users each id === to the given id
  if (!user) {
    //if user does not exist  //"each" is a parameter of the callback function passed to the "find" method. It represents each individual element in the users array as the find method iterates over it.
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist !!!",
    });
  }
  return res.status(200).json({
    //u can't write return multiple times i.e one method can return only one return statements
    //if id get matched then display this msg
    success: true,
    message: "User Found",
    data: user,
  });
});

// Route: /users => "/"
// Method: POST
// Description: Create a new user
//Access: Public
//Parameters: none

router.post("/", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body; // req to be send is written in {} and where to send is inside body

  const user = users.find((each) => each.id === id); //check if the user is already present in user/js file
  if (user) {
    return res.status(404).json({
      success: false,
      message: "User with the ID Exist",
    });
  }

  //push the info inside the user file  //whatever i write inside body push it in the users.json
  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });
  return res.status(201).json({
    //201: updation
    success: true,
    message: "User Added Successfully",
    data: users, //to get the users information
  });
});

// Route: /users/:id ==> ":id"
// Method: PUT
// Description: Update a User by their ID
// Access: Public
// Parameters: ID

router.put("/:id", (req, res) => {
  const { id } = req.params; //take id from params  //jai paan parameters me url madhe pass karel tai ex http://127.0.0.1:8081/users/4 ==> here 4 is id
  const { data } = req.body; //what data must be updated  //take data from body

  const user = users.find((each) => each.id === id);
  if (!user) {
    //first check the existance of the user
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist !!",
    });
  }
  const updateUserData = users.map((each) => {
    //for mapping/ working on each and every element   ==> it will be returning a mew array as o/p
    if (each.id === id) {
      return {
        //check readme file
        ...each, //the updated info is present in each file   // Spreads the existing user data.
        ...data, //update the data i.e which field do you want to update   //Spreads the new data to overwrite the existing fields with updated values.
      };
    }
    return each; //the data which has not been updated will be written same
  });
  return res.status(200).json({
    success: true,
    message: "User Updated !!",
    data: updateUserData,
  });
});

// Route: /users/:id ==> ":id"
// Method: DELETE
// Description: Delete a User by their ID
// Access: Public
// Parameters: ID

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist !!",
    });
  }
  const index = users.indexOf(user); // indexOf ==> it is an array method
  users.splice(index, 1); //(index,1)  ==> i want to delete from index and i want to delete only one user i.e splice for one no. of time// splice is mainly used for delete operation

  return res.status(200).json({
    success: true,
    message: "The User has been Deleted Scuccessfully",
    data: users,
  });
});

// Route: /users/subscription-details/{id}
// Method: GET
// Description: get all user subscription details
// Access: Public
// Parameters: ID

router.get("/subscription-details/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((each) => each.id === id); //the ID really exist inside the user.json file   //here each parameter in the arrow function

  if (!user) {
    //if user does not exist
    return res.status(404).json({
      success: false,
      message: "User with the ID did not Exist",
    });
  }
  //155 min = 155/60
  const getDateInDay = (data = "") => {
    //"getDateInDay" => it is an function which is called below in the code
    //here "getDateInDay" here all the dates are converted into days and store inside this function
    let date; //date: variable
    if (data == "") {
      //if the perticular data is blank then we will consider as todays date
      date = new Date(); //here Date is predefined variable  //it will cal no. of days from jan 1 1970
    } else {
      date = new Date(data); //if we have date then we will consider the same date as the parameter
    }
    // 24 hrs * 60 min * 60 sec * 1000 millisec
    let days = Math.floor(date / (1000 * 60 * 60 * 24)); //the floor of 2.7 is 2   //cal the days of the perticular date
    //Math.floor(data / (1000 * 60 * 60 * 24)); => it will return the days from input date till todays date
    return days;
  };

  const subscriptionType = (date) => {
    if ((user.subscriptionType = "Basic")) {
      date = date + 90;
    } else if ((user.subscriptionType = "Standard")) {
      date = date + 180;
    } else if ((user.subscriptionType = "Premium")) {
      date = date + 365;
    }
    return date;
  };

  //Jan 1 1970 UTC
  let returnDate = getDateInDay(user.returnDate); //here we are getting the return date i.e if john returns the book before or on 05/01/2022 he will be having no fine
  //if the data is provided then use "returnDate" the data stored in users.json with specific ID will return
  let currentDate = getDateInDay(); //The currentDate variable is assigned the result of calling getDateInDay() with no arguments.
  let subscriptionDate = getDateInDay(user.subscriptionDate); //retrive subscription date from users.json file
  let subscriptionExpiration = subscriptionType(subscriptionDate); //The "subscriptionExpiration" variable is assigned the result of calling the "subscriptionType" function with "subscriptionDate" as the argument.
  //here first of all the " let subscriptionDate = getDateInDay(user.subscriptionDate);" => the "subscriptionDate" is converted
  //into days and stores inside variable "subscriptionDate" then next "  let subscriptionExpiration = subscriptionType(subscriptionDate);"
  //the days are added


  const data = {
    ...user, //get user data
    isSubscriptionExpired: subscriptionExpiration < currentDate, //return 0
    daysLeftForExpiration:
      subscriptionExpiration <= currentDate
        ? 0
        : subscriptionExpiration - currentDate,
    fine:
      returnDate < currentDate
        ? subscriptionExpiration <= currentDate
          ? 100
          : 50
        : 0, //we don't have to pay any kind of fine
    //this is an nested if else
  };
  return res.status(200).json({
    success: true,
    message: "Subscription detail for the user is: ",
    data,
  });
});

module.exports = router; // here we export the "users.js" file inside "index.js"
