const nodemailer = require('nodemailer')
const fs = require('fs')

function sendEmail(template, subject, email, callback) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'wwww12137@gmail.com',
      pass: 'mhky lpss zfpb wezn',
    },
  })

  const contents = '' + fs.readFileSync('./email_templates/' + template)
  const mailOptions = {
    from: 'atemp6123@gmail.com',
    to: email,
    subject: subject,
    html: contents,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    console.log(error)
    console.log(info)

    callback(error, info)
  })
}

module.exports = {
  sendEmail: sendEmail,
}
