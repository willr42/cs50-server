import express from 'express';
import checkLogin from '../controllers/checkLoginController';
import login from '../controllers/loginController';
const router = express.Router();

router.post('/', login);
router.get('/', checkLogin);

export default router;
