import morgan from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';

import router from './router';
import { databaseUrl } from './config/auth';

require('dotenv').config();
import configAuth from './config/auth';
const app = express();

// Connect to mongoose
mongoose.Promise = require('bluebird');
mongoose.connect(databaseUrl);

// Serve static files
const staticFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticFiles);

// Configure middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: configAuth.sessionSecret,
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Configure routes
router(app);
app.use('/*', staticFiles);

// Server setup
app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'), () =>
  console.log(`Listening on ${app.get('port')}`)
);
