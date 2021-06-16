const functions = require("firebase-functions");
var nodemailer = require('nodemailer');
//Create and Deploy Your First Cloud Functions https://firebase.google.com/docs/functions/write-firebase-functions


exports.email = functions.https.onRequest((req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gojnimerbot@gmail.com',
            pass: 'programar@com.vc'
        }
    });
    var mailOptions = {
        from: 'gojnimerbot@gmail.com',
        to: req.body.emailTarget || 'gojnimerbot@gmail.com',
        subject: "Nova cotação",
        text: `
        Empresa: ${req.body.empresa || "Não informado"}
        Contato: ${req.body.contato || "Não informado"}
        Telefone: ${req.body.telefone || "Não informado"}
        Email: ${req.body.email || "Não informado"}
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.json({ error: error });
        } else {
            res.json({ message: 'Email sent: ' + info.response, ...req.body });
        }
    });
});
