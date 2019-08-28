import usersRoutes from './users';
import helpRoutes from './help';
import photosRoutes from './photos';
import comments from './comments';

module.exports = {
  ...usersRoutes,
  ...helpRoutes,
  ...photosRoutes,
  ...comments
};
