const nodemailer = require('../configs/nodemailer');

// this is another way to export a method
exports.newComment = (comment) => {
    // console.log('Inside the comment mailer');
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from: 'testmailer969.sd@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: htmlString
    }, (err, info) => { //callback function to handle error
        if(err) {
            console.log('Error Sending mail', err);
            return;
        }
        console.log('Message sent', info);
        return;
    });
}