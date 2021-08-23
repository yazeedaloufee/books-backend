'use strict';

const express = require('express')
const cors = require('cors')
require('dotenv').config();
const axios = require('axios')
// const mongoose= require('mongoose')


const PORT=process.env.PORT;
const server = express();
server.use(cors());

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
chicago.save();
hunterKiller.save();
run.save();


}

//server sending data on /books route
server.get('/books',getBooksHandler);

function getBooksHandler(req,res){

  bookModel.find({},function(error,ownerData){
    if(error){ console.log('error in getting data from data base')}
    else{
      console.log(ownerData)
      res.send(ownerData);
    }
  })
}






seedDAtacollection();
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
