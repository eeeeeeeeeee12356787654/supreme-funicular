const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST endpoint to send email
app.post('/send-email', (req, res) => {
    const { email, subject, message } = req.body;

    // Create transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.example.com', // Replace with your SMTP server address
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'your_email@example.com', // Replace with your email address
            pass: 'your_password' // Replace with your email password
        }
    });

    // Setup email data
    let mailOptions = {
        from: 'your_email@example.com',
        to: email,
        subject: subject,
        text: message
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
