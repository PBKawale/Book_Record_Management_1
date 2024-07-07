const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json"); //here we need "users" file bcz the "issued book id" is inside user info

const router = express.Router();

// Route: /books
// Method: GET
// Description: Get all books
//Access: Public
//Parameters: None

router.get("/", (req, res) => {
  // "/books" ==> "/"
  //dont need to write "/books" it is already apended inside "index.js"
  res.status(200).json({
    success: true,
    message: "Got all the books",
    data: books,
  });
});

// Route: /book/issued
// Method: GET
// Description: Get all the issued books
//Access: Public
//Parameters: none

// once again understand and revice all the following code
router.get("/issued", (req, res) => {
  const usersWithTheIssuedBook = users.filter((each) => {
    //"usersWithTheIssuedBook" ==> in this method issedBook are stored
    //This line filters the "users" array to find users who have an issued book
    //here we are not expecting one element as a output hence we are using filter instead of find
    if (each.issuedBook) return each; // if we find that issued book then return it
  });
  const issuedBooks = []; //An empty array issuedBooks is created to store information about the issued books.

  usersWithTheIssuedBook.forEach((each) => {
    // The forEach method iterates over each user with an issued book
    //"forEach" ==> here it is simply used for cross check
    const book = books.find((book) => book.id === each.issuedBook); //here we are checking if the issued book is same as the given id
    //For each user, it finds the corresponding book in the books array using the find method, matching the book's id with the issuedBook property of the user.

    book.issuedBy = each.name; //Assigns the name of the user who issued the book.
    book.issuedDate = each.issuedDate; //Assigns the issued date of the book.
    book.returnDate = each.returnDate; //Assigns the return date of the book.

    issuedBooks.push(book); //here we are pushing all the book info inside issuedBooks array
  });
  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Book Have Been Issued Yet..",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Users With The Issued Books...",
    data: issuedBooks,
  });
});

// Route: /books/:id
// Method: GET
// Description: Get single book by its id
//Access: Public
//Parameters: id

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);
  if (!book) {
    res.status(404).json({
      success: false,
      message: "Book Doesn't Exist !!!",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Book Found",
    data: book, // all the info will be stored in the book variable hence be displayed book instead of books
  });
});

// Route: /books
// Method: POST
// Description: Add a book
// Access: Public
// Parameters: none
// Data: id, name, author, genre, price, publisher;

router.post("/", (req, res) => {
  // const {id, name, author, genre, price, publisher} = req.body;
  const { data } = req.body; //the data is passed inside body of post req

  if (!data) {
    return res.status(400).json({
      sucess: false,
      message: "No Data To Add A Book",
    });
  }

  const book = books.find((each) => each.id === data.id);
  if (book) {
    return res.status(404).json({
      success: false,
      message: "ID already Exist !!! ",
    });
  }

  // me jai paan data madhe lehel tai sarva books madhe jaun lehun dycha
  //here we can also write "const allBooks = { data }" i.e the info written in "data" transfer to "allBooks" here" ...books" are used to show all the books
  const allBooks = { ...books, data }; //here we are storing all the books inside "allBooks" ==> here spread operator is used bcz don't want see multiple id
  //instead of writing the above statement you can else push all the data and use the cond if id already exist or not
  return res.status(201).json({
    success: true,
    message: "Added Book Successfully",
    data: allBooks,
  });
});

// Route: /books/:id
// Method: PUT
// Description: Update a book by its ID
// Access: Public
// Parameters: ID

router.put("/updateBook/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book Doesn't Exist !!",
    });
  }

  const updateBookData = books.map((each) => {
    if (each.id === id) {
      return {
        ...each, // "...each" => elaborate the data already existing inside books file
        ...data, // data that is elaborated
      };
    }
    return each;
  });

  return res.status(200).json({
    success: true,
    message: "Book Updated !!",
    data: updateBookData,
  });
});





























module.exports = router;
