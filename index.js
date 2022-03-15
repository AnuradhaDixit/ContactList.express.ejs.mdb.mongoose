//we made index.js
//npm init
//npm install express

//we started server by requiring the express library
const express = require('express');
//collection will be populated using this contact
const Contact = require('./models/contact')
const path = require('path');
//our epress will be fired in this port
const port = 8000;
//including mongoose while firing up the server,(./) is used for a parallel folder
const db = require('./config/mongoose')
//our epress app will be fired using this command
const app = express();

//to send the data from my server to Html we chose ejs as it is similar to javascript and also html is similar
//now we installed ejs

//we need to use ejs as the view engine
app.set('view engine','ejs');
//to look out the views we need to specify the path also
app.set('views',path.join(__dirname,'views'));
//it reads the data and parses it in the form of keys and values in req.body
//it only reads the form data not the params
app.use(express.urlencoded());
//this is another middleware we used to read static file
app.use(express.static('assets'));

// //middleware1 is set up to read our request from the form
// app.use(function(req,res,next){
//     req.myName="Anuradha";
//     //console.log('middleware 1 called');
//     next();
// })

// //middleware1
// app.use(function(req,res,next){
//     console.log('My name from MW2',req.myName)
//     //console.log('middleware 2 called');
//     next();
// })


var contactList = [{
    name: "Anu",
    phone: "999999999"
},
{
    name: "Anuradha",
    phone: "8888888888" 
},
{
    name: "Anusha",
    phone: "77777777777"
}
]

// the'/' is route and the next given function is also called controller
app.get('/',function(req,res){
    //console.log('My name from get route',req.myName)
    //when it will render th response it will automatically go to the views folder and it will find home.ejs and pass on these keys

    Contact.find({},function(err, contacts){
        if (err){
            console.log('Error in fetching contacts from db');
            return;
        }
    return res.render('home',{
        title: "My Contact List",
        contact_list: contacts
         });
    });
});
//controller will take a callback function
app.get('/practice',function(req,res){
    //render finds the html or ejs and renders it whereas rediredct take you to specified route
    return res.render('practice',{
        title:"Let us play with ejs"
    });
});

  
app.post('/create-contact',function(req,res){
    //  contactList.push({
    //    name: req.body.name,
    //    phone: req.body.phone
    //  });

    Contact.create({
        name: req.body.name,
       phone: req.body.phone
    },function(err,newContact){
        if(err){
            console.log('error in creating a contact!');
            return;
        }
        console.log('*******',newContact);
        return res.redirect('back');
    });
});

//here /:phone is the variable parameter depending upon what is added after the route /delete-contact in  home.ejs
app.get('/delete-contact/',function(req,res){
    //get the id from query in the url
    let id= req.query.id;
    //Another way to do the same(apart from using params) is -
    //  console.log(req.query);
    //let phone = req.query.phone;

    //find the contact in the database using id and delete
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting a contact from database');
            return; 
        }
        return res.redirect('back');
    });
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // //if the index is not found it will be redirected to the same page else if contact matches it will be deleted
    // if (contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }
  
});


//we told the app to listen to port
app.listen(port,function(err){
    if(err){
        console.log('Error',err);
    }
    console.log('Yup! my express server is running on port:',port);

}); 