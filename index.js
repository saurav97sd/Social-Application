// intialing server
const express = require('express');
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db = require('./configs/mongoose');

// Firing the express server
const app = express();

// Telling the express server use cookie parser--------------------------------0
app.use(express.urlencoded());
app.use(cookieParser());

// Telling the server where it should look for static files ------------------ 1
app.use(express.static('./assets'));

// Telling server to use layouts --------------------------------------------- 2.1
app.use(expressLayout);
// Telling the server to put the static files of the sub ejs files in the right place of layout file ------------ 2.2
app.set('layout extractStyles', true);
app.set("layout extractScripts", true);

// importing or using the express router ------------------------------------- 3
app.use('/', require('./routes/routes'));

// telling server we want to use view engine --------------------------------- 4
// set up view engine
app.set('view engine', 'ejs');
// show the path to the views folder
app.set('views', './views');

// Listen to the server to check if its working
app.listen(port, function (err) {
    //if error encountered
    if(err){
        console.log('Error :', err);
    }
    console.log('Server is successfully running on port ' + port);
})