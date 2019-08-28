import mongoose from 'mongoose';
import { Photos } from '../models';

const userExcludeFields = { password: 0 };
const LIMIT = 5;

const getPhotoById = (req, res, next) => {
  req.model = Photos;
  req.exludingFields = userExcludeFields;
  next();
};

const getPhotosByUserId = async (req, res) => {
  const page = req.params.page;
  if (!page || page < 0) {
    res.status(400).send('Invalid page');
    return;
  }
  const count = await Photos.count({ userId: req.params.id });
  const skip = (page - 1) * LIMIT;

  const config = {
    skip,
    limit: LIMIT,
    sort: {
      id: 1
    }
  };
  Photos
    .find({ userId: req.params.id }, null, config)
    .then(photos => {
      res.json({
        photos,
        hasNext: count > config.skip + LIMIT
      });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const toggleLike = async (req, res) => {
  try {
    const photo = await Photos.findOne({ id: req.params.photoId });
    const ind = photo.likes.indexOf(req.params.id);
    const likeStatus = { liked: false };
    if (ind === -1) {
      photo.likes.push(Number(req.params.id));
      likeStatus.liked = true;
    } else {
      photo.likes.splice(ind, 1);
    }

    await Photos.update({ id: req.params.photoId }, photo).then(() => res.json(likeStatus));
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

const getPhotosByIds = async (req, res) => {
  const users = req.query.users.split(',');
  const page = req.query.page;
  if (!page || page < 0) {
    res.status(400).send('Invalid page');
    return;
  }

  const photosQuery = {
    userId: { $in: users }
  };
  const count = await Photos.count(photosQuery);
  const skip = (page - 1) * LIMIT;

  const config = {
    skip,
    limit: LIMIT,
    sort: {
      id: 1
    }
  };

  try {
    const photos = await Photos.find(photosQuery, null, config).populate('user_id', 'avatar login');

    res.json({
      photos: photos,
      hasNext: count > config.skip + LIMIT
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

export default {
  getPhotoById,
  getPhotosByUserId,
  toggleLike,
  getPhotosByIds
};
