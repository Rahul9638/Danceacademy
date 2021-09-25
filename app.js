const express = require('express');

const port = 8000;
const app = express();
const path = require('path');

// Defining mongoose stuffs to load the data to the database

const mongoose = require('mongoose');
// var mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

// Defining mongoose schema

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    email: String,
    desc: String
  });


const Contact = mongoose.model('Contact', contactSchema);

// const Kitten = mongoose.model('Kitten', kittySchema);



// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {

    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res) => {

    const params = {}
    res.status(200).render('contact.pug', params);
})


app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send('This item has been saved to the database')
    }).catch(()=>{
    res.status(400).send('item was not saved to the databse')
})

    // res.status(200).render('contact.pug');
})


// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});