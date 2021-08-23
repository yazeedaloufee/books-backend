'use strict'
const mongoose= require('mongoose')


mongoose.connect('mongodb://localhost:27017/books1', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log('we are connected...')
});
const BookSchema = new mongoose.Schema({
    title: String,
    description:String,
    email:String
  });



// mongoose.model('book', BookSchema);
module.exports= mongoose.model('book', BookSchema);