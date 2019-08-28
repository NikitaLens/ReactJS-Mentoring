import nodemailer from 'nodemailer';
import { Users } from '../models';

const userExcludeFields = { password: 0 };

const getUserById = (req, res, next) => {
  req.model = Users;
  req.exludingFields = userExcludeFields;
  next();
};

const saveNewUser = (req, res, next) => {
  req.model = new Users(req.body);
  next();
};

const getUserByNick = async (req, res) => {
  try {
    let find = {};
    const id = req.params.idOrNick;
    if (id && Number(id)) {
      find = { id };
    } else {
      find = { login: id };
    }

    const user = await Users.findOne(find, userExcludeFields);
    res.json(user);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

const getFollowers = async (req, res) => {
  try {
    const user = await Users.findOne({ id: req.params.id });
    const followers = await Users.find({ id: { $in: user.followers } });
    res.json(followers);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

const getFollowing = async (req, res) => {
  try {
    const user = await Users.findOne({ id: req.params.id });
    const following = await Users.find({ id: { $in: user.following } });
    res.json(following);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

const toggleFollow = async (req, res) => {
  try {
    const { id, followerId } = req.params;

    const user = await Users.findOne({ id });
    const follower = await Users.findOne({ id: followerId });
    if (!user || !follower) {
      res.status(404).end({
        message: 'Users with specified id not found'
      });
    }

    let ind = user.followers.indexOf(followerId);
    if (ind === -1) {
      user.followers.push(Number(followerId));
    } else {
      user.followers.splice(ind, 1);
    }

    ind = follower.following.indexOf(id);
    if (ind === -1) {
      follower.following.push(Number(id));
    } else {
      follower.following.splice(ind, 1);
    }

    await Promise.all([
      Users.update({ id }, user),
      Users.update({ id: followerId }, follower)
    ]).then(() => res.end());
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

const userSearch = (req, res) => {
  if (!req.query.q) {
    res.json([]);
    return;
  }
  const q = new RegExp(req.query.q, 'gi');
  const search = {
    $or: [
      { login: q },
      { firstName: q },
      { lastName: q }
    ]
  };

  Users
    .find(search, null, { limit: 10 })
    .then(data => res.json(data))
    .catch(e => res.status(500).send(e));
};

const sendEmail = async (usrId) => {
  const user = await Users.findOne({ id: usrId });

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    secure: false,
    auth: {
      user: 'manager-1@techstore-graduation.herokuapp.com',
      pass: 'xehhzdnq0h4c' // generated ethereal password
    }
  });

  const mailOptions = {
    from: '"Allahu Akbar 💥" <manager-1@techstore-graduation.herokuapp.com>',
    to: user.email,
    subject: 'Allahu Akbar 💥',
    text: '💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
};

export default {
  getUserById,
  saveNewUser,
  getFollowers,
  getFollowing,
  toggleFollow,
  userSearch,
  sendEmail,
  getUserByNick
};
