import express from 'express';
import { addNewUser } from '../controllers/registerController';
const router = express.Router();

router.post('/', addNewUser);

export default router;
