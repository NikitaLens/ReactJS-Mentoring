import { Users } from '../models';
const sha256 = require('crypto-js/sha256');

const serializeUser = (user, done) => {
  done(null, user);
};

const deserializeUser = (user, done) => {
  done(null, user);
};

const localStrategy = (email, password, done) => {
  Users.findOne({
    $or: [
      { email },
      { login: email }
    ]
  })
    .then((user) => {
      if (!user || user.password !== sha256(`urGenT!!${password}SesuriTYYY!wArNiNG`).toString()) {
        done('Invalid password or email/login');
      } else {
        delete user.password;
        done(null, user);
      }
    })
    .catch(err => done(err));
};

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  res.status(403).end('Login failed');
};

module.exports = {
  localStrategy,
  isLoggedIn,
  serializeUser,
  deserializeUser
};
