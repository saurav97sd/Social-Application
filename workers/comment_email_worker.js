const queue = require('../configs/kue');

const commentsMailer = require('../mailers/comments_mailer');

queue.process('emails', function(job, done) {
    console.log('email worker processing a job', job.data);
    commentsMailer.newComment(job.data);
    done();
});