// const db = require('../configs/mongoose');

module.exports.home = function(req, res){

    // console.log(req.cookies); //Accessing the cookie created in browser
    // res.cookie('user-id', 25); //Updating or chnaging the cokkies value

    return res.render('home', {
        title: "Home | Authentication"
    });
}