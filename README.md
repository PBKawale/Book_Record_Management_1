# Book_Record_Management_1

server >> Storing certain book data
       >> User register
       >> Subscriber

Define Some Urls
This is a book record management API Server / Backend for library system or management of records or manuals or books

Fine System:
User: 25/06/2024 - 25/09/2024
26/09/2024 => 50 (if the user miss by one day)
28/09/2024 => 50*3=150/-  (if he delayed of 3 days)

# Subscription Types
3 months (Basic)
6 months (Standard)
12 months (Premium)

If the subscription type is standard && if subscription date is 25/06/2024
=> the subscription valid till 25/12/2024

within subscription date >> if we miss the renewal >>50/- day
subscription date missed && also missed renewal >> 100 + 50/- day

>>book1
>>basic
>>06/03/2023 -> subscription date
>>07/03/2023 -> borrowed a book from library
>>book1 renewal date is 21/03/2023
>>23/03/2023 -> we need to pay a fine of 50*no of days we get late(2)

>>book2
>>basic
>>06/03/2023 -> subscription date
>>07/03/2023 -> borrowed a book from library
>>book2 renewal date is 21/03/2023
>>23/06/2023 -> we need to pay a fine of 100 + 50*no of days we get late(2)  {here we miss the subscription date && renewal date aswell}

missed by renawal date >> 50/-
missed by subscription date >> 100/-
missed by renawal and subscription date >> 150/- 








# Routes and Endpoints

## /users (here we will get all the users)
POST: Creating a new user
GET: Get all the users

## /users/{id}
GET: Get user by id 
PUT: Update a user by their ID  (every year you must update the id)
>> Concept used inside update method
...each  ==> find this fields
     ## "name": "Jane",
     ## "surname": "Doe",
      "email": "user@email.com",
      "issuedBook": "3",
      "issuedDate": "01/07/2021",
      "returnDate": "01/10/2021",
      "subscriptionType": "Basic",
      "subscriptionDate": "01/01/2022"

...data ==> 
{
  "data":{
   ## "name":"pranav",
   ## "surname":"kawale"
  }
}

# explaination
>> now here we will split the "each" and then the "data" section here the fields which are 
>> specidfied inside "data" sections will be overwritten inside "each" section 
>> i.e the name and surname will updated and else part will be same
>> this is how the spread oper works, it will get the latest/recent values
>> we can't write "data" first instead "each" bcz we want to update the recent value which is present inside "each" section 

DELETE: Delete a user by id (check if he/she still have issued book) && (check if he/she still have any fine pending) 
(after leaving the library you must delete the user id and also check the above conditions)

Note --> If u want to Update slite info you can go with put

>> Concept used inside update method

const index = users.indexOf(user);
users.splice(index, 1);



## /users/subscription-details/{id}
GET: Get user subscription details
       >> Date of Subscription
       >> Vaild till
       >> Is there any fine

## /books
*GET: Get all the books
*POST: Create/Add new books

## /books/{id}
*GET: Get a book by id
*PUT: Update a book by their ID
DELETE: 

## /books/issued  (books which are not present/available in the library)
*GET: Get all issued books

## /books/issued/withFine
GET: Get all issued books with their fine


## npm init
## npm i nodemon --save-dev (developers dependancy)
## npm i express
## npm run dev


