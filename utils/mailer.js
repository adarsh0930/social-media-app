const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendVerificationEmail = (email, token) => {
    const verificationLink = `${process.env.BASE_URL}/auth/verify-email?token=${token}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify your email for ConnectaLive',
        html: `
            <p>Thank you for signing up with ConnectaLive, a fast-growing social media app. We are happy to get you onboard.</p>
            <p>Please verify your email by clicking the link below:</p>
            <a href="${verificationLink}">Verify Email</a>
        `
    };

    return transporter.sendMail(mailOptions);
};

const sendWelcomeEmail = (email) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to ConnectaLive!',
        html: `
            <p>Welcome to ConnectaLive!</p>
            <p>We are thrilled to have you as part of our community. Start connecting with your friends and enjoy the experience.</p>
        `
    };

    return transporter.sendMail(mailOptions);
};

const sendSummaryEmail = (email, activities) => {
    let activityHtml = '';

    if (activities.friendsActivity.length) {
        activityHtml += '<h3>Friend Requests</h3>';
        activities.friendsActivity.forEach(activity => {
            activityHtml += `<p>${activity.user_id} ${activity.status} your friend request at ${activity.status_change_time}</p>`;
        });
    }

    if (activities.friendsPosts.length) {
        activityHtml += '<h3>New Posts by Friends</h3>';
        activities.friendsPosts.forEach(post => {
            activityHtml += `<p>${post.user_id} posted: ${post.text} at ${post.created_at}</p>`;
        });
    }

    if (!activityHtml) {
        activityHtml = '<p>No activities today.</p>';
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Daily Summary from ConnectaLive',
        html: `
            <p>Here is your daily summary from ConnectaLive:</p>
            ${activityHtml}
        `
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail, sendWelcomeEmail, sendSummaryEmail };