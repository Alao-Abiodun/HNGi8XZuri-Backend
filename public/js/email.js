const form = document.getElementById('contact-form');
console.log(form);

const sendMail = (mail) => {
  fetch("/mailing", {
    method: "post",
    body: mail,
  }).then((response) => {
    return response.json();
  });
}

const formEvent = form.addEventListener('submit', event => {
  event.preventDefault();

  let mail = new FormData(form);

  sendMail(mail);
})




// const nodemailer = require('nodemailer');

// exports.sendMail = async (config) => {
//     try {
//         let transporter = nodemailer.createTransport({
//             host: "smtp.ethereal.email",
//             port: 587,
//             secure: false, // true for 465, false for other ports
//             auth: {
//               user: testAccount.user, // generated ethereal user
//               pass: testAccount.pass, // generated ethereal password
//             },
//           });
//           // send mail with defined transport object
//             let info = await transporter.sendMail({
//                 from: '"Fred Foo 👻" <foo@example.com>', // sender address
//                 ...config,
//                 // to: "bar@example.com, baz@example.com", // list of receivers
//                 // subject: "Hello ✔", // Subject line
//                 // text: "Hello world?", // plain text body
//                 // html: "<b>Hello world?</b>", // html body
//             });
//             return `Preview URL: %s', ${nodemailer.getTestMessageUrl(info)}`;
//     } catch (error) {
//         console.log(error);
//         throw new Error(error);
//     }
// }