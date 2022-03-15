//require the library
const mongoose = require('mongoose');

//mongodb signifies your mongodb server and localhost tells it is running on the system and contact_list_db is the database name
mongoose.connect('mongodb://localhost/contacts_list_db');

//verifying wether it is connected or not->
//mongoose const has used connect function to connect db / this db will be used for accesing the database
const db = mongoose.connection;
//error statement

db.on('error',console.error.bind(console,'error connecting to db'));

//if the connnection is succesful and once it is open we will call the function
db.once('open',function(){
    console.log('Succesfully connected to the database!')
})