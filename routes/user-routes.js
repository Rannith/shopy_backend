// import { Router } from "express";
// import UserController from "../controllers/user-controller";

// const router = Router();

// const routes = (router) => {
//     router.get('/', userController.getAllUser);
//     router.post('/', userController.addUser);
//     router.get('/:id', userController.getUserById);
//     router.put('/:id', userController.updateUser);
//     router.delete('/:id', userController.deleteUser)
// }

// export default routes

import { Router } from 'express';
import userController from '../controllers/user-controller';
import isAuthenticateUser from '../middleware/authentication';


const router = Router();
const user = new userController()

router.get('/', user.getAllUser);
router.post('/register', user.registerUser);
router.post('/login', user.loginUser);
router.get('/my-profile/:id', isAuthenticateUser.isAuthenticateUser, user.viewProfile);
router.put('/:id', isAuthenticateUser.isAuthenticateUser, user.updateProfile);
router.delete('/:id', isAuthenticateUser.isAuthenticateUser, user.deleteProfile);

export default router
// // module.exports = router
// const _default = router;
// export { _default as default };