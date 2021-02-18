//Connecting to DB using mongoose
const mongoose = require('mongoose');

// connecting
mongoose.connect('mongodb://localhost/authentication', {useNewUrlParser: true});

//Checking connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to the db"));
db.once('open', function(){
    console.log("Connected to DB : MongoDB");
});


//exporting the connection
module.exports = db;