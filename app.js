const express = require("express");
const app = express();

const config = require('./config/config')
const port = config.SERVER_PORT;

const path = require('path')
const bodyParser= require('body-parser')
const session = require("express-session");


// ROUTES 
var filetransfer = require('./routes/filetransfer')
var home = require('./routes/home')
var video = require('./routes/video')
var user =require('./routes/user')
var viewvideo =require('./routes/viewvideo')
var download =require('./routes/download')

// Passport for authentication
const passport = require('./utils/passport')

// DB Initialisation
const mongoose = require('mongoose')
const db = mongoose.connection

const mongoOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  keepAlive: true
};

db.once('connected', _ => 
        console.log('Mongoose connection successful'))

db.on('error', e=>
      console.log(`Mongo Error : ${e.message}`))


mongoose.connect(config.MONGO_URL, mongoOptions)


// configuring the body parser
app.use(bodyParser.json({limit : '10mb'}))
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({
   limit:'10mb', extended: true
}));


//Express Session
app.use(session({
  secret: config.SECRET,
  saveUninitialized: true,
  resave: true,
  maxAge: 1000 * 60 * 60 * 24
})
);

// Passport init
app.use(passport.initialize());
app.use(passport.session());


// public directory initialise and declaring the views engine
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');

// routes middleware
app.use('/home', home)
app.use('/user', user)
app.use('/filetransfer', filetransfer);
app.use('/video', video);
app.use('/view',viewvideo);
app.use('/download', download);

// Starting the server
app.listen(port, () => 
          console.log(`Server running on ${port}!`));
