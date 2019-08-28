import mongoose from 'mongoose';
import { Comments, Users, Photos } from '../models';

const getPhotoComments = async (req, res) => {
  const photo_id = req.params.photoId;
  const page = req.params.page;

  const query = { photo_id };
  const count = await Comments.count(query);
  const limit = 50;
  const skip = (page - 1) * limit;

  const config = {
    skip,
    limit,
    sort: {
      id: 1
    }
  };

  Comments
    .find(query, null, config)
    .populate('user_id', 'login')
    .then(comments => {
      res.json({
        comments,
        hasNext: count > config.skip + limit
      });
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const photoComment = async (req, res) => {
  const photo = await Photos.findOne({ id: req.params.id });
  if (!photo) {
    res.status(404).send({
      message: `Photo with id ${req.params.id} not found`
    });
  }

  const user = await Users.findOne({ id: req.body.user_id });
  if (!user) {
    res.status(404).send({
      message: `User with id ${req.body.user_id} not found`
    });
  }

  const comment = new Comments({
    user_id: user._id,
    photo_id: req.params.id,
    text: req.body.text
  });

  Comments.populate(comment, { path: 'user_id', select: 'login' });

  comment
    .save()
    .then(saved => res.json(saved))
    .catch(err => res.status(500).send(err));
};

export default {
  getPhotoComments,
  photoComment
};
