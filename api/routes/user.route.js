import express from 'express';
import userController from '../controller/user.controller.js';
import verifyToken from '../middleware/verifyToken.js';
const { getUser, updateUser, deleteUser, signOut } = userController;

const router = express.Router();

router.get('/', getUser);
router.put('/:userId', verifyToken, updateUser)
router.delete('/:userId', verifyToken, deleteUser)
router.post('/sign-out', signOut)

export default router;