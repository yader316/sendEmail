const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');
const cors = require('cors');


var jsonParser = bodyParser.json()

app.use(cors({origin: '*'}));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/send-email', jsonParser, async (req, res) => {

    const { name, lastName, email, phone, address, services, phoneCheck, emailCheck, message, correo, logo } = req.body;

    contentHTML = `
        <div style="
            width: 70%;
            margin: 0 auto;
            background-color: rgb(233, 233, 233);
            border: 1px solid rgb(208, 208, 208);
            box-shadow: inset 0px 0px 0px 0px rgba(0, 0, 0, 0.2);
            padding: 30px;
        ">
            <div style="text-align: center;" >
                <img
                    src="${logo}"
                    alt="logo-empresa"
                    style="width: 30%;"
                >
            </div>
            <h1 style="text-align: center;">Website Formulario</h1>
            <ul style="list-style: none; padding: 10px;">
                <li style=" padding: 10px;border-bottom: 1px solid rgb(208, 208, 208);">Name: ${name} ${lastName}</li>
                <li style=" padding: 10px;border-bottom: 1px solid rgb(208, 208, 208);">Email: ${email}</li>
                <li style=" padding: 10px;border-bottom: 1px solid rgb(208, 208, 208);">Phone: ${phone}</li>
                <li style=" padding: 10px;border-bottom: 1px solid rgb(208, 208, 208);">Address: ${address}</li>
                <li style=" padding: 10px;border-bottom: 1px solid rgb(208, 208, 208);">Services: ${services}</li>
                <li style=" padding: 10px;border-bottom: 1px solid rgb(208, 208, 208);">Best Way To Contact You: <br>
                ${phoneCheck}, ${emailCheck}</li>
            </ul>
            <p style="padding: 20px;border: 1px solid rgb(208, 208, 208);">${message}</p>
        </div>
    `;

    const transporter = nodemailer.createTransport({
        host: 'mail.ultimatewebstudio.com',
        port: 465,
        secure: true,
        auth: {
            user: 'no-reply@ultimatewebstudio.com',
            pass: '5!]a}]7$91l?'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const info = await transporter.sendMail({
        from: `"${name}" <test@lalemanllc.com>`, // sender address,
        to: `${correo}`,
        subject:`${email}`,
        html: contentHTML
    })

    console.log('Message sent: %s', info.messageId);

    res.json({ message: 'Email has been sent', success: true });
})

const port = process.env.PORT || 5000;
console.log({ port });
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});