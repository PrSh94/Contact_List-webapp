const mongoose = require('mongoose');

// creating Schema for Collection 
const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    }
});

// Collection name (use Capital Letter in name)
const Contact = mongoose.model('Contact',contactSchema);

// export Collection to index.js
module.exports = Contact;
