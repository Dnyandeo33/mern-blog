import express from 'express';
import userController from '../controller/user.controller.js';
import verifyToken from '../middleware/verifyToken.js';
const { getUsers, getUser, updateUser, deleteUser, signOut } = userController;

const router = express.Router();

router.get('/get-users', verifyToken, getUsers);
router.put('/:userId', verifyToken, updateUser);
router.delete('/:userId', verifyToken, deleteUser);
router.post('/sign-out', signOut);
router.get('/:userId', getUser)

export default router;