'use strict';

const express = require('express')
const cors = require('cors')
require('dotenv').config();
const axios = require('axios')
// const mongoose= require('mongoose')


const PORT=process.env.PORT;
const server = express();
server.use(cors());

// middleware to parse  the request body
server.use(express.json());

// mongoose.connect('mongodb://localhost:27017/books1', {useNewUrlParser: true, useUnifiedTopology: true});

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//  console.log('we are connected...')
// });
// //Schema 
// const BookSchema = new mongoose.Schema({
//   title: String,
//   description:String,
//   email:String
// });


//Model 
// const bookModel = mongoose.model('book', BookSchema);
const bookModel = require('./Model')

function seedDAtacollection(){
  const chicago =new bookModel({
    title:'chicago',
    description:'Murderesses Velma Kelly and Roxie Hart find themselves on death row together and fight for the fame that will keep them from the gallows in 1920s Chicago.',
    email:'yazeedaloufee@gmail.com'
  })
  const hunterKiller =new bookModel({
    title:'hunter Killer',
    description:' Captain Glass of the USS Arkansas discovers that a coup détat is taking place in Russia, so he and his crew join an elite group working on the ground to prevent a war',
    email:'yazeedaloufee@gmail.com'
  })
  const run =new bookModel({
    title:'Run',
    description:'overview:Chloe, a teenager who is confined to a wheelchair, is homeschooled by her mother, Diane. Chloe soon becomes suspicious of her mother and begins to suspect that she may be harboring a dark secret.',
    email:'yazeedaloufee@gmail.com'
  })

  const book4 =new bookModel({
    title:'book4',
    description:'by her mother, Diane. Chloe soon becomes suspicious of her mother and begins to suspect that she may be harboring a dark secret.',
    email:'noorofi@gmail.com'
  })


// chicago.save();
// hunterKiller.save();
// run.save();
book4.save();

}

//server sending data on /books route
server.get('/books',getBooksHandler);

function getBooksHandler(req,res){
  let email=req.query.email;
  bookModel.find({email:email},function(error,ownerData){
    if(error){ console.log('error in getting data from data base')}
    else{
      console.log(ownerData)
      res.send(ownerData);
    }
  })
}
//delete books from data
server.delete("/books/:_id",deleteBookHandler);
server.put('/updatebook/:_id',updateBookHandler)

function updateBookHandler(request,response){
  let _id=request.params._id;
  console.log('id',request.params._id)
  let {email,title,description}=request.body;
  console.log(email,title,description,_id);
  console.log('we are in update function');
  bookModel.findOne({_id:_id},(error,bookdata)=>{
    console.log('book data',bookdata);
    bookdata.email=email;
    bookdata.title=title;
    bookdata.description=description;
    console.log(bookdata);
    bookdata.save()
    .then(()=>{
      bookModel.find({email:email},function(error,ownerData){
        if(error){ console.log('error in getting data from data base')}
        else{
          console.log(ownerData)
          response.send(ownerData);
        }
      })

    })
  })



}

function deleteBookHandler(request,responce){
  let _id=request.params._id;
  let email=request.query.email;
  console.log(email)
  bookModel.remove({_id:_id},(error,bookData)=>{
    if(error){console.log("error in deleting data")}
    else{ 
      console.log("data deleted",bookData);
      bookModel.find({email:email},function(error,ownerData){
        if(error){ console.log('error in getting data from data base')}
        else{
          console.log(ownerData)
          responce.send(ownerData);
        }
      })

    }
  })
}

server.post('/addbooks',addBooksHandler);
function addBooksHandler(request,response){
// console.log('addbookshandler is working');
const receivedBook=request.body;


const newBook =new bookModel({
  title:receivedBook.bookName,
  description:receivedBook.description,
  email:receivedBook.email
})
console.log(newBook);
newBook.save();
bookModel.find({email:receivedBook.email},function(error,ownerData){
  if(error){ console.log('error in getting data from data base')}
  else{
    console.log(ownerData)
    response.send(ownerData);
  }
})

}



// seedDAtacollection();
//server testing
server.get('/test',testHandler);

function testHandler(req,res){
  res.send('server is working')
}

server.listen(PORT,()=>{
  console.log(`listening on port ${PORT}`)
})




























// const jwt = require('jsonwebtoken');
// const jwksClient = require('jwks-rsa');

// const app = express();
// app.use(cors());

// const PORT = process.env.PORT || 3001;

// app.get('/test', (request, response) => {

//   // TODO: 
//   // STEP 1: get the jwt from the headers
//   // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
//   // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
//   // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end

// })

// app.listen(PORT, () => console.log(`listening on ${PORT}`));
