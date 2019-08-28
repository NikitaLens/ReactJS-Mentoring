import { checkIdMiddleware, getByIdMiddleware } from '../middlewares/model-middlewares';
import * as controllers from '../controllers';

module.exports = (apiRoute) => {
  /**
   * @swagger
   * /api/photo/{id}:
   *   get:
   *     tags:
   *       - Photo
   *     summary: Get photo by id
   *     description: Get photo by id
   *     parameters:
   *       - $ref: '#/parameters/id'
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success response
   *         schema:
   *           $ref: '#/definitions/SuccessResponse'
   */
  apiRoute.get('/photo/:id', checkIdMiddleware, controllers.getPhotoById, getByIdMiddleware);

  /**
   * @swagger
   * /api/user/{id}/photos/{page}:
   *   get:
   *     tags:
   *       - Photo
   *     summary: Get 20 photos per page per user
   *     description: Get 20 photos per page per user
   *     parameters:
   *       - $ref: '#/parameters/id'
   *       - $ref: '#/parameters/page'
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
  apiRoute.get('/user/:id/photos/:page', checkIdMiddleware, controllers.getPhotosByUserId);

  /**
   * @swagger
   * /api/user/{id}/like/{photoId}:
   *   put:
   *     tags:
   *       - Photo
   *     summary: Toggle photo like
   *     description: Toggle photo like
   *     parameters:
   *       - $ref: '#/parameters/id'
   *       - $ref: '#/parameters/photoId'
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
  apiRoute.put('/user/:id/like/:photoId', checkIdMiddleware, controllers.toggleLike);

  /**
   * @swagger
   * /api/photos:
   *   get:
   *     tags:
   *       - Photo
   *     summary: Get 20 photos
   *     description: Get 20 photos
   *     parameters:
   *       - $ref: '#/parameters/usersQuery'
   *       - $ref: '#/parameters/pageQuery'
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
  apiRoute.get('/photos', controllers.getPhotosByIds);
};
