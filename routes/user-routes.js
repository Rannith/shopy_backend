import { Router } from 'express';
import userController from '../controllers/user-controller';
import isAuthenticateUser from '../middleware/authentication';


const router = Router();
const user = new userController()

router.get('/', user.getAllUser);
router.post('/register', user.registerUser);
router.post('/login', user.loginUser);
router.get('/my-profile/:id',  user.viewProfile);
router.put('/:id',  user.updateProfile);
router.delete('/:id',isAuthenticateUser, user.deleteProfile);

export default router
