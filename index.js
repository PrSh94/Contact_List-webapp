// requiring our controller i.e express

const express = require('express');
const port = 8000;
const path = require('path');



// requiring our models i.e database

const db = require('./config/mongoose');
const Contact = require('./models/contact');


const app = express();
const bodyparser = require('body-parser');

app.use(express.static('assets'));

app.use(bodyparser.urlencoded({extended: false}));

// middleware1
// app.use(function(req,res,next){
//     console.log('middleware 1 called');
//     next();
// });


// // middleware2
// app.use(function(req,res,next){
//     console.log('middleware 2 called');
//     next();
// });




// requiring our view i.e Ejs 
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));


// var contactList = [
//     {
//         name: "Ashu",
//         phone: "123456789"
//     },
//     {
//         name: "sunny",
//         phone: "987654321"
//     },
//     {
//         name: "keshu",
//         phone:"986547123"
//     }
// ]





app.get('/',function(req,res){
    
    Contact.find({},function(err,contact){
        if(err){
            console.log('error in fetching data from db');
            return;
        }

        return res.render('home',{ 
            title: "Contact List",
            contact_list:contact
        });


    })

});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title: "Play with EJS!"
    })
});

// app.get('/Profile',function(req,res){
//     res.send('<h1>Profile Page</h1>');
// });
// app.get('/about',function(req,res){
//     res.send('<h1>About Page</h1>');
// });

app.post('/create-contact',function(req,res){
    // contactList.push({
    //     name : req.body.name,
    //     phone : req.body.phone
    // });

    // contactList.push(req.body);


    // return res.redirect('/');
    
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log('error! in creating a contact');
            return;
        }

        console.log('@@@@@@@@@', newContact);
        return res.redirect('back');
    });
    // return res.redirect('back');


});

// deleting a contact

app.get('/delete_contact',function(req,res){
    // get the id from query in the ul 

    let id = req.query.id;
    
    // find the contact in the db using id and delete it
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            return console.log('error! in deleting contact');
        }

         return res.redirect('back');

        
    });

})


// older function to delete contact 

// app.get('/delete_contact',function(req,res){
//     console.log(req.query);
//     let phone = req.query.phone;
//     let name = req.query.name;

//     let contactIndex = contactList.findIndex( contact => contact.phone == phone);
//     let nameIndex = contactList.findIndex( contact => contact.name == name);


//     if(contactIndex != -1){
//         contactList.splice(contactIndex, 1);
//     }
//     else{
//         if(nameIndex != -1){
//             contactList.splice(nameIndex , 1);
//         }
//     }

//     return res.redirect('back');
// })




app.listen(port,function(err){
    if(err){
        console.log('error! in server',err);
        return;
    }

    console.log('yup! my express server is running')

});