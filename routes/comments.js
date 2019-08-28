import * as controllers from '../controllers';

module.exports = (apiRoute) => {
  /**
   * @swagger
   * /api/photo/{photoId}/comments/{page}:
   *   get:
   *     tags:
   *       - Comments
   *     summary: Get 20 comments for user and photo
   *     description: Get 20 comments for user and photo
   *     parameters:
   *       - $ref: '#/parameters/photoId'
   *       - $ref: '#/parameters/page'
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success response
   *         schema:
   *           $ref: '#/definitions/SuccessResponse'
   */
  apiRoute.get('/photo/:photoId/comments/:page', controllers.getPhotoComments);

  /**
   * @swagger
   * /api/photo/{id}/comment:
   *   post:
   *     tags:
   *       - Comments
   *     summary: Add new comment
   *     description: Add new comment
   *     parameters:
   *       - $ref: '#/parameters/id'
   *       - $ref: '#/parameters/CommentRequest'
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success response
   *         schema:
   *           $ref: '#/definitions/SuccessResponse'
   */
  apiRoute.post('/photo/:id/comment', controllers.photoComment);
};
