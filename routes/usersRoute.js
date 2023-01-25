const express = require('express');
const UsersController = require('../controllers/usersController');
const UsersMiddleware = require('../middlewares/usersMiddleware');
const router = express.Router();

router.get('/', UsersController.getUsers);

router.post(
  '/login',
  // GlobalMiddleware.validateBody(userLoginsSchema),
  UsersMiddleware.getData,
  UsersMiddleware.checkIfUserExists,
  UsersMiddleware.passwordCompare,
  UsersMiddleware.genrateToken,
  UsersController.login
);

router.post(
  '/signup',
  // GlobalMiddleware.validateBody(usersSchema),
  UsersMiddleware.isNewUser,
  UsersMiddleware.passwordsMatch,
  UsersMiddleware.hashPwd,
  UsersController.signup
);

router.put(
  '/:userId',
  // GlobalMiddleware.validateBody(usersSchema),
  UsersMiddleware.isValidId,
  UsersMiddleware.isNewUser
  // UsersController.editUser
);

module.exports = router;
