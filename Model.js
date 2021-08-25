'use strict'
const mongoose= require('mongoose')


mongoose.connect(process.env.MONGOOSE_LINK, {useNewUrlParser: true, useUnifiedTopology: true});

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