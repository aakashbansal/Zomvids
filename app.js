const express = require("express");
const app = express();

const config = require('./config/config')

const fs = require('fs')
const path = require('path')

var cookieParser = require('cookie-parser');
const bodyParser= require('body-parser')
const session = require("express-session");
const port = config.SERVER_PORT;

// ROUTES 
var filetransfer = require('./routes/filetransfer')
var home = require('./routes/home')
var video = require('./routes/video')
var user =require('./routes/user')
var viewvideo =require('./routes/viewvideo')
var download =require('./routes/download')

const passport = require('./utils/passport')

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

//app.use(cookieParser());

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

app.listen(port, () => 
          console.log(`Server running on ${port}!`));
