// intialing server
const express = require('express');
const cookieParser = require('cookie-parser');
// Firing the express server
const app = express();

const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./configs/mongoose');
const session = require('express-session'); 
const passport = require('passport');
const passportLocal = require('./configs/passport_local_strategy');
const passportJWT = require('./configs/passport_jwt_strategy');
const passortGoogle = require('./configs/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./configs/middleware');


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}));


// Telling the express server use cookie parser--------------------------------0
app.use(express.urlencoded());
app.use(cookieParser());

// Telling the server where it should look for static files ------------------ 1
app.use(express.static('./assets'));

// setting the link of user avatar gor the browser
// making the upload path available for the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

// Telling server to use layouts --------------------------------------------- 2.1
app.use(expressLayout);
// Telling the server to put the static files of the sub ejs files in the right place of layout file ------------ 2.2
app.set('layout extractStyles', true);
app.set("layout extractScripts", true);


// telling server we want to use view engine --------------------------------- 4
// set up view engine
app.set('view engine', 'ejs');
// show the path to the views folder
app.set('views', './views');

// Add middleware which takes session cookie and encrypt it
app.use(session({
    name: 'codiel',
    secret: 'blahsomething', //key used to encrypt
    saveUninitialized: false,
    resave: false,
    cookie: {
        // setting duration of cookie
        maxAge: (1000 * 60 * 100)
    },
    // momgo store is used to store the encrypted session cookie in db
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'Connect-mongodb setup ok');
        }
    )

}));
// Telling the app to use passport
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// Telling the app to use connect-flash/setting flash
app.use(flash());
app.use(customMware.setFlash);

// importing or using the express router ------------------------------------- 3
app.use('/', require('./routes/routes'));

// Listen to the server to check if its working
app.listen(port, function (err) {
    //if error encountered
    if(err){
        console.log('Error :', err);
    }
    console.log('Server is successfully running on port ' + port);
})