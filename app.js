//Module dependencies.
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('node-twitter-api');
const compression = require('compression')
const chalk = require('chalk');
const dotenv = require('dotenv');
//const multer = require('multer');

//Load environment variables from .env file, where API keys and passwords are configured.
dotenv.load({ path: '.env' });

//Controllers (route handlers).
const patientController = require('./controllers/patient');

const app = express();

//Connect to MongoDB.
mongoose.Promise = global.Promise;
//mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log('%s MongoDB connection established!', chalk.green('✓'));
});
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

//Express configuration.
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
    autoReconnect: true
  })
}));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

app.get('/',patientController.index)
app.post('/api/post',patientController.post)
app.get('/getDirectory',patientController.getDirectory)

//Start Express server.
app.listen(app.get('port'), () => {
  console.log('%s Express server listening on port %d in %s mode.', chalk.green('✓'), app.get('port'), app.get('env'));
});

module.exports = app;
