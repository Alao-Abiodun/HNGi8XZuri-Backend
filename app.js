const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const multiparty = require('multiparty');
require('dotenv').config();
// const mongoose = require('mongoose');

// const formRoute = require('./routes/form.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const staticPath = path.join(__dirname, '../public')
console.log(staticPath);

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

const { PORT, USER, PASSWORD } = process.env

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: USER,
      pass: PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
});

transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
});


app.get('/index', (req, res) => {
    res.render('index', {pageTitle: 'Resume'})
})

// app.use('/', formRoute);

app.post('/mailing', (req, res) => {
    let form = new multiparty.Form();
    let data = {};
    form.parse(req, function (err, fields) {
        console.log(fields);
        Object.keys(fields).forEach(function (property) {
          data[property] = fields[property].toString();
        });
        const mail = {
          from: 'alao43844@gmail.com',
          to: data.email, // receiver email,
          subject: 'Thanks for Contacting Me',
          text: `${data.name} \n${data.message}`,
        };
        transporter.sendMail(mail, (err, data) => {
          if (err) {
            console.log(err);
            res.status(500).send("Something went wrong.");
          } else {
            res.status(200).send("Email successfully sent to recipient!");
          }
        });
      });
      
})

const printMyName = () => {
  console.log('Alao Abiodun AbdulRahman')
}

printMyName();

app.listen(PORT, () => {
    console.log('The app is running ' + PORT);
})

// connecting to MONGODB
// mongoose
//     .connect(process.env.MONGO_DB, {
//         useCreateIndex: true,
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(_ => {
//         console.log('Connected to MongoDB server');
//         //spin up the server
//         app.listen(process.env.PORT, _ => {
//             console.log(`Server running on PORT ${process.env.PORT}`);
//         });
//     })
//     .catch(err => {
//         console.log(`Error connecting to MongoDB: ${err}`);
//     });
