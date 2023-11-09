import express from 'express';
import userController from '../controller/userController';
// import multer from 'multer';
// import axios from 'axios';
// import path from 'path';

const router = express.Router();
// const upload = multer();

router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.post('/change-password', userController.changePassword);
router.post('/register', userController.register);
router.get('/verify/:email/:uniqueString', userController.verifyAccount);
export default router;
