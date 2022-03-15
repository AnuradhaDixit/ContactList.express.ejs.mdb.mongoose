const mongoose=require('mongoose');
const { stringify } = require('querystring');

const contactSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
})

//since we have created the schema we need to tell what will be the name of the schema
//Contact will be the name in database and that contact will be defined by contactSchema
//model signifies the collection
const Contact = mongoose.model('Contact',contactSchema);

//exporting contact
module.exports = Contact;
