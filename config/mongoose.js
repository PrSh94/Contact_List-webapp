// require the library
const mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://0.0.0.0:27017/contacts_lsit_db');

// acquire the coonection (to check if it is successful)
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console,'error connecting to db'));

// up and running then print message
db.once('open',function(){
    console.log('successfully connected to the database');
});
