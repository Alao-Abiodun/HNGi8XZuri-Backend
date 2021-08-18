const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const staticPath = path.join(__dirname, 'public')
console.log(staticPath);
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

const PORT = 5000;

app.get('/index', (req, res) => {
    res.render('index', {pageTitle: 'Resume'})
})

app.listen(PORT, () => {
    console.log('The app is running ' + PORT);
})