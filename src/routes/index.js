const { Router } = require('express');
const router = Router();

const nodemailer = require('nodemailer');



router.post('/send-email', async (req, res) => {
    console.log(req.body);
    const { name, email, phone, message, correo } = req.body;

    contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Username: ${name}</li>
            <li>User Email: ${email}</li>
            <li>PhoneNumber: ${phone}</li>
        </ul>
        <p>${message}</p>
    `;

    const transporter = nodemailer.createTransport({
        host: 'mail.lalemanllc.com',
        port: 465,
        secure: true,
        auth: {
            user: 'test@lalemanllc.com',
            pass: 'Testyader67'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const info = await transporter.sendMail({
        from: `"${name}" <test@lalemanllc.com>`, // sender address,
        to: `${correo}`,
        subject:`${email}`,
        // text: 'Hello World'
        html: contentHTML
    })

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // // Preview only available when sending through an Ethereal account
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
   res.json('/success.html');

});

module.exports = router;