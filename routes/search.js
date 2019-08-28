import * as controllers from '../controllers';

module.exports = (allRoutes) => {
  /**
   * @swagger
   * /users?q={search}:
   *   get:
   *     tags:
   *       - User
   *     summary: Search user by query in login, firstName, lastName fields
   *     description: Search user by query in login, firstName, lastName fields
   *     parameters:
   *       - $ref: '#/parameters/search'
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success response
   *         schema:
   *           $ref: '#/definitions/SuccessResponse'
   */
  allRoutes.get('/users?:q', controllers.userSearch);
};
