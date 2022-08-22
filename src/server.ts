import express from 'express';
import session from 'express-session';
import cors from 'cors';

import register from './routes/register';
import login from './routes/login';
import api from './routes/api';

const FileStore = require('session-file-store')(session);
// initialise express app
const app = express();
app.use(cors());
// Configure environment vars

// Set up sessions
const fileStoreOptions = {};

if (process.env.SESSION_SECRET === undefined) {
  console.log("Session secret couldn't be found. Exiting.");
  process.exit();
}

const oneDay = 1000 * 60 * 60 * 24; //1 ms, seconds, minutes, 24 hours.

// configure sessions for dev
let sessionOptions: session.SessionOptions = {
  secret: process.env.SESSION_SECRET,
  store: undefined,
  resave: true, // should we save the session if it hasn't been modified?
  saveUninitialized: true, // should we save a session that's uninitialized?
  cookie: {
    secure: false,
    maxAge: oneDay,
  },
};

// configure sessions for prod
if (process.env.NODE_ENV === 'production') {
  sessionOptions.store = new FileStore(fileStoreOptions);
  sessionOptions.resave = false;
  sessionOptions.saveUninitialized = false;
  sessionOptions.cookie = { maxAge: oneDay };
}

app.use(session(sessionOptions));

// Accept JSON files
app.use(express.json());

app.use('/register', register);
app.use('/login', login);
app.use('/api', api);
// authenticate
// start session
// TODO: log out a user
// end session

app.listen(process.env.PORT_NUMBER, () => {
  console.log(`Listening on ${process.env.PORT_NUMBER}`);
});
