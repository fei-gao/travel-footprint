const nodemailer = require('nodemailer');
const ejs = require('ejs');
// const juice = require('juice'); // to inline css, don't need in this project
const htmlToText = require('html-to-text');
const promisify = require('es6-promisify');
const fs = require('fs');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

const generateHTML = (filename, options = {}) => {
  const html = ejs.render(fs.readFileSync(__dirname + `/../views/email/${filename}.ejs`, 'utf8'), options);
  // const inlined = juice(html);
  return html;
}

exports.send = async (options) => {
  const html = generateHTML(options.filename, options);
  const text = htmlToText.fromString(html);
  const mailOptions = {
    from: `Fei Gao <groovyfei@gmail.com>`,
    to: options.user.email,
    subject: options.subject,
    html,
    text
  }
  // by default sendMail works as a callback, we want to promisify it
  const sendMail = promisify(transport.sendMail, transport);
  return sendMail(mailOptions);
}
