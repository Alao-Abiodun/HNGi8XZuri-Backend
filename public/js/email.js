const form = document.getElementById('contact-form');
const inputs = document.querySelector('#contact-form');
const emailResponse = document.querySelector('.message');
// console.log(emailResponse);
console.log(inputs[0]);
// console.log(form[0]);

const sendMail = (mail) => {
  fetch("https://hngi8xzuri-backend.herokuapp.com/mailing", {
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

  inputs[0].value = '';  
  inputs[1].value = '';
  inputs[2].value = '';
  emailResponse.style.display = 'block'
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