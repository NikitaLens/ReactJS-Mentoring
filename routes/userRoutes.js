import passport from 'passport';
import { checkIdMiddleware, insertModelMiddleware } from '../middlewares/model-middlewares';
import * as controllers from '../controllers';

module.exports = (allRoute, apiRoute) => {
  /**
   * @swagger
   * /login:
   *   post:
   *     tags:
   *       - User
   *     summary: Authenticate user
   *     description: Authenticate user
   *     parameters:
   *       - $ref: '#/parameters/LoginRequest'
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success response
   *         schema:
   *           $ref: '#/definitions/SuccessResponse'
   */
  allRoute.post('/login', passport.authenticate('local'), (req, res) => {
    // controllers.sendEmail(req.user.id);
    res.json({
      id: req.user.id,
      success: true
    });
  });

  /**
   * @swagger
   * /api/user/{idOrNick}:
   *   get:
   *     tags:
   *       - User
   *     summary: Get user by nick or id
   *     description: Get user by nick or id
   *     parameters:
   *       - $ref: '#/parameters/idOrNick'
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success response
   *         schema:
   *           $ref: '#/definitions/UserResponse'
   */
  apiRoute.get('/user/:idOrNick', controllers.getUserByNick);

  /**
   * @swagger
   * /api/user/{id}/followers:
   *   get:
   *     tags:
   *       - User
   *     summary: Get user followers
   *     description: Get user followers
   *     parameters:
   *       - $ref: '#/parameters/id'
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success response
   *         schema:
   *           $ref: '#/definitions/UserResponse'
   */
  apiRoute.get('/user/:id/followers', checkIdMiddleware, controllers.getFollowers);

  /**
   * @swagger
   * /api/user/{id}/following:
   *   get:
   *     tags:
   *       - User
   *     summary: Get users that use with {id} follow
   *     description: Get users that use with {id} follow
   *     parameters:
   *       - $ref: '#/parameters/id'
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success response
   *         schema:
   *           $ref: '#/definitions/UserResponse'
   */
  apiRoute.get('/user/:id/following', checkIdMiddleware, controllers.getFollowing);

  /**
   * @swagger
   * /api/user:
   *   post:
   *     tags:
   *       - User
   *     summary: Save new user
   *     description: Save new user
   *     parameters:
   *       - $ref: '#/parameters/UserNewRequest'
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success response
   *         schema:
   *           $ref: '#/definitions/SaveResponse'
   */
  apiRoute.post('/user', controllers.saveNewUser, insertModelMiddleware);

  /**
   * @swagger
   * /api/user/{followerId}/follow/{id}:
   *   put:
   *     tags:
   *       - User
   *     summary: Toggle follower status
   *     description: Toggle follower status
   *     parameters:
   *       - $ref: '#/parameters/followerId'
   *       - $ref: '#/parameters/id'
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success response
   *         schema:
   *           $ref: '#/definitions/SaveResponse'
   */
  apiRoute.put('/user/:followerId/follow/:id', checkIdMiddleware, controllers.toggleFollow);
};
