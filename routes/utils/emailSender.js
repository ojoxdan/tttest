const nodemailer = require("nodemailer");

const sendEmail = (
  sendTo = { to: null, subject: null, text: null },
  response = {}
) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "omonkabiz@gmail.com",
      pass: "omonka656@g",
    },
  });

  let mailOptions = {
    from: "omonkabiz@gmail.com",
    to: sendTo.to,
    subject: sendTo.subject,
    text: sendTo.text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      // use resoponse here
    } else {
      console.log("Email sent: " + info.response);
      // use resoponse here
    }
  });
};

module.exports = sendEmail;
