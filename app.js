import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import apiRoute from './routes';
import { localStrategy, serializeUser, deserializeUser } from './middlewares/auth';

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: true
}, localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(logger('short'));
app.use(cookieParser());
app.use(bodyParser());
app.use(express.json());
app.use(session({
  secret: 'ilovescotchscotchyscotchscotch',
  cookie: {
    maxAge: 8000000000000
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(apiRoute);

export default app;
