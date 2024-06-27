const express = require("express"); //where we want to install/importing express
const {users} = require("./data/users.json") //to import the users
// {users} if we added more array it will be more complex 


const app = express();
const port = 8081;

app.use(express.json()); //here we are using the perticular application only in json formate


app.get("/", (req, res) => {
  // here "/" is for home page
  res.status(200).json({
    //i want to display a msg inside json formate
    message: "Server is running up and running :-)",
    data: "Hey",
  });

  //instead of writing in json form u can write in normal form
  //here we are using json instead of normal form bcz we can't write multiple data inside send
  //   res.status(200).send("Server is up");
});

// Route: /users
// Method: GET
// Description: Get all users
//Access: Public
//Parameters: None

app.get("/users", (req,res) => {
    res.status(200).json({
      success: true,
      data: users,
    })
})






//u always need to have the specific generic conditions at the bottom and specific at the top
app.get("*", (req, res) => {  //if we dont have a defined root (use *)
  res.status(404).json({
    message: "This root does not exists",
  });
});
app.listen(port, () => {
  console.log(`Server is Runnig at port ${port}`);
});
