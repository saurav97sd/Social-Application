const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// create transporter object
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'testmailer969.sd@gmail.com',
        pass: 'dasSubir@1'
    }
});

// function to render the html mail
let renderTemplate = (data, relativePath) => {
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template) {
            if (err){
                console.log("Error in rendering the template");
                return;
            }
            mailHtml = template;
        }
    )

    return mailHtml;
};


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}